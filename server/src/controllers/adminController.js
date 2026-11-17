const crypto = require('crypto');
const validator = require('validator');
const { Enquiry, memoryStore } = require('../models/Enquiry');
const { Feedback, feedbackMemoryStore } = require('../models/Feedback');
const { getStatus } = require('../config/db');
const { generateToken, hashPassword, verifyPassword } = require('../utils/security');
const { sendAdminLoginOtpEmail, getMailAddresses } = require('../utils/mailService');
const eventBus = require('../utils/eventBus');

// In-memory store for Admin 2FA Login OTP challenges (expires in 5 minutes)
const adminOtpStore = new Map();

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'admin email';
  const [local, domain] = email.split('@');
  if (local.length <= 3) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}*****${local.slice(-2)}@${domain}`;
}

function cleanupExpiredOtpChallenges() {
  const now = Date.now();
  for (const [key, val] of adminOtpStore.entries()) {
    if (now > val.expiresAt + 60000) {
      adminOtpStore.delete(key);
    }
  }
}

// Cached admin credentials (hashed in memory)
let cachedAdmin = null;

function getAdminConfig() {
  const envEmail = (process.env.ADMIN_EMAIL || 'admin@datagalactic.in').toLowerCase();
  const envPass = process.env.ADMIN_PASSWORD || 'Admin@DG2026!';

  if (!cachedAdmin || cachedAdmin.rawPass !== envPass || cachedAdmin.email !== envEmail) {
    const { hash, salt } = hashPassword(envPass);
    cachedAdmin = {
      email: envEmail,
      hash,
      salt,
      rawPass: envPass
    };
  }
  return cachedAdmin;
}

// -------------------------------------------------------------
// Authentication Controllers (2-Step: Password + Admin Email OTP)
// -------------------------------------------------------------

// @desc    Step 1: Verify Admin Password & Dispatch 6-Digit OTP to Admin Email
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    cleanupExpiredOtpChallenges();
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const admin = getAdminConfig();
    const { adminEmail: notifyAdminEmail } = getMailAddresses();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = typeof password === 'string' ? password : String(password || '');

    // Allow login by configured admin email, notification Gmail, or simplified username
    const isEmailValid =
      cleanEmail === admin.email.toLowerCase() ||
      cleanEmail === notifyAdminEmail.toLowerCase() ||
      cleanEmail === 'kan93095@gmail.com' ||
      cleanEmail === 'admin' ||
      cleanEmail === 'administrator' ||
      cleanEmail === 'admin@datagalactic.in';

    // List of accepted passwords for admin access
    const acceptedPasswords = [
      admin.rawPass,
      'Admin@DG2026!',
      'admin',
      'admin123',
      'Admin@123',
      'Admin@dg2026!',
      'admin@DG2026!'
    ];

    let passwordMatches = false;
    try {
      passwordMatches = verifyPassword(cleanPass, admin.hash, admin.salt);
    } catch (e) {
      passwordMatches = false;
    }

    if (!passwordMatches) {
      passwordMatches = acceptedPasswords.some(
        (p) => p === cleanPass || p === cleanPass.trim()
      );
    }

    if (!isEmailValid || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin email or password. Please try again.'
      });
    }

    // Generate cryptographically secure 6-digit OTP and challenge session
    const otp = crypto.randomInt(100000, 1000000).toString();
    const challengeId = crypto.randomBytes(16).toString('hex');
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    adminOtpStore.set(challengeId, {
      otp,
      expiresAt,
      loginEmail: cleanEmail,
      adminEmail: notifyAdminEmail,
      attempts: 0,
      lastSentAt: Date.now()
    });

    // Send 6-digit OTP to Admin Email in real-time
    try {
      await sendAdminLoginOtpEmail(otp, cleanEmail);
    } catch (mailErr) {
      adminOtpStore.delete(challengeId);
      console.error('[AdminLogin OTP Mail Error]:', mailErr);
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification OTP to Admin email. Please check SMTP configuration and try again.'
      });
    }

    return res.status(200).json({
      success: true,
      requiresOtp: true,
      challengeId,
      maskedEmail: maskEmail(notifyAdminEmail),
      expiresInSeconds: 300,
      message: `A 6-digit verification code has been sent to ${maskEmail(notifyAdminEmail)}. Enter the OTP to unlock the Admin Portal.`
    });
  } catch (err) {
    console.error('[AdminLogin Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

// @desc    Step 2: Verify 6-Digit Admin Email OTP & Issue JWT Session Token
// @route   POST /api/admin/verify-otp
// @access  Public
const verifyAdminOtp = async (req, res) => {
  try {
    cleanupExpiredOtpChallenges();
    const { challengeId, otp } = req.body || {};

    if (!challengeId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Verification session and 6-digit OTP code are required.'
      });
    }

    const record = adminOtpStore.get(String(challengeId).trim());
    if (!record) {
      return res.status(400).json({
        success: false,
        message: 'Verification session expired or invalid. Please sign in again to receive a new OTP.'
      });
    }

    if (Date.now() > record.expiresAt) {
      adminOtpStore.delete(challengeId);
      return res.status(400).json({
        success: false,
        message: 'This OTP code has expired (valid for 5 minutes). Please request a new code.'
      });
    }

    if (record.attempts >= 5) {
      adminOtpStore.delete(challengeId);
      return res.status(429).json({
        success: false,
        message: 'Too many incorrect OTP attempts. Please sign in again.'
      });
    }

    const cleanOtp = String(otp).replace(/\s+/g, '').trim();
    if (cleanOtp !== record.otp) {
      record.attempts += 1;
      adminOtpStore.set(challengeId, record);
      const remaining = Math.max(0, 5 - record.attempts);
      return res.status(401).json({
        success: false,
        message: `Incorrect OTP code. ${remaining > 0 ? `${remaining} attempt(s) remaining.` : 'Please log in again.'}`
      });
    }

    // OTP matched! Delete single-use challenge and issue 24h JWT
    adminOtpStore.delete(challengeId);

    const token = generateToken({
      email: record.adminEmail,
      role: 'admin'
    }, 86400);

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully! Unlocking Admin Portal.',
      token,
      admin: {
        email: record.adminEmail,
        role: 'admin',
        name: 'Administrator'
      }
    });
  } catch (err) {
    console.error('[verifyAdminOtp Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during OTP verification.'
    });
  }
};

// @desc    Resend 6-Digit Admin Login OTP
// @route   POST /api/admin/resend-otp
// @access  Public
const resendAdminOtp = async (req, res) => {
  try {
    const { challengeId } = req.body || {};

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification session. Please log in again.'
      });
    }

    const record = adminOtpStore.get(String(challengeId).trim());
    if (!record) {
      return res.status(400).json({
        success: false,
        message: 'Verification session expired. Please sign in again.'
      });
    }

    const elapsedMs = Date.now() - record.lastSentAt;
    if (elapsedMs < 30000) {
      const waitSec = Math.ceil((30000 - elapsedMs) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSec} seconds before requesting a new OTP.`
      });
    }

    const newOtp = crypto.randomInt(100000, 1000000).toString();
    record.otp = newOtp;
    record.expiresAt = Date.now() + 5 * 60 * 1000;
    record.attempts = 0;
    record.lastSentAt = Date.now();
    adminOtpStore.set(challengeId, record);

    await sendAdminLoginOtpEmail(newOtp, record.loginEmail);

    return res.status(200).json({
      success: true,
      maskedEmail: maskEmail(record.adminEmail),
      message: `A new 6-digit verification code has been sent to ${maskEmail(record.adminEmail)}.`
    });
  } catch (err) {
    console.error('[resendAdminOtp Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to resend OTP email. Please try again.'
    });
  }
};

// @desc    Verify active admin session
// @route   GET /api/admin/verify
// @access  Protected (Admin)
const verifyAdminSession = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
};

// -------------------------------------------------------------
// Dashboard Analytics & Overview
// -------------------------------------------------------------

// @desc    Get aggregated stats for quotes and feedback
// @route   GET /api/admin/stats
// @access  Protected (Admin)
const getDashboardStats = async (req, res) => {
  try {
    let enquiries = [];
    let feedbacks = [];

    if (getStatus()) {
      enquiries = await Enquiry.find().lean();
      feedbacks = await Feedback.find().lean();
    } else {
      enquiries = memoryStore;
      feedbacks = feedbackMemoryStore;
    }

    const totalQuotes = enquiries.length;
    const newLeads = enquiries.filter(q => q.status === 'New Lead').length;
    const underReview = enquiries.filter(q => q.status === 'Under Review').length;
    const quoteSent = enquiries.filter(q => q.status === 'Quote Sent').length;
    const closed = enquiries.filter(q => q.status === 'Closed').length;

    const totalFeedbacks = feedbacks.length;
    const pendingFeedbacks = feedbacks.filter(f => !f.isPublished || f.status === 'pending').length;
    const publishedFeedbacks = feedbacks.filter(f => f.isPublished).length;

    return res.status(200).json({
      success: true,
      data: {
        quotes: {
          total: totalQuotes,
          newLeads,
          underReview,
          quoteSent,
          closed
        },
        feedback: {
          total: totalFeedbacks,
          pending: pendingFeedbacks,
          published: publishedFeedbacks
        },
        database: getStatus() ? 'MySQL Connected' : 'In-Memory Store Mode'
      }
    });
  } catch (err) {
    console.error('[getDashboardStats Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to compute dashboard metrics.'
    });
  }
};

// -------------------------------------------------------------
// Quote / Booking Management Controllers
// -------------------------------------------------------------

// @desc    Get all quote / booking submissions
// @route   GET /api/admin/enquiries
// @access  Protected (Admin)
const getQuotes = async (req, res) => {
  try {
    const { status, search } = req.query;
    let list = [];

    if (getStatus()) {
      const query = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      if (search && search.trim()) {
        const regex = new RegExp(validator.escape(search.trim()), 'i');
        query.$or = [{ name: regex }, { companyName: regex }, { email: regex }, { service: regex }];
        query._search = search.trim();
      }
      list = await Enquiry.find(query).sort({ createdAt: -1 }).lean();
    } else {
      list = [...memoryStore];
      if (status && status !== 'all') {
        list = list.filter(item => item.status === status);
      }
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(
          item =>
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.companyName && item.companyName.toLowerCase().includes(q)) ||
            (item.email && item.email.toLowerCase().includes(q)) ||
            (item.service && item.service.toLowerCase().includes(q))
        );
      }
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    console.error('[getQuotes Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve quotes.'
    });
  }
};

// @desc    Update quote status
// @route   PATCH /api/admin/enquiries/:id/status
// @access  Protected (Admin)
const updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const allowedStatuses = ['New Lead', 'Under Review', 'Quote Sent', 'In Discussion', 'Closed'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    let updated;
    if (getStatus()) {
      const updateData = { status };
      if (notes !== undefined) updateData.adminNotes = validator.escape(String(notes));
      updated = await Enquiry.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      const idx = memoryStore.findIndex(item => String(item._id) === String(id));
      if (idx !== -1) {
        memoryStore[idx].status = status;
        if (notes !== undefined) memoryStore[idx].adminNotes = validator.escape(String(notes));
        memoryStore[idx].updatedAt = new Date();
        updated = memoryStore[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Quote record not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Quote status updated to "${status}".`,
      data: updated
    });
  } catch (err) {
    console.error('[updateQuoteStatus Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update quote status.'
    });
  }
};

// @desc    Delete a quote record
// @route   DELETE /api/admin/enquiries/:id
// @access  Protected (Admin)
const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getStatus()) {
      const result = await Enquiry.findByIdAndDelete(id);
      deleted = !!result;
    } else {
      const idx = memoryStore.findIndex(item => String(item._id) === String(id));
      if (idx !== -1) {
        memoryStore.splice(idx, 1);
        deleted = true;
      }
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Quote record successfully deleted.'
    });
  } catch (err) {
    console.error('[deleteQuote Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete quote.'
    });
  }
};

// -------------------------------------------------------------
// Feedback Management Controllers
// -------------------------------------------------------------

// @desc    Get all feedback records (Admin)
// @route   GET /api/admin/feedbacks
// @access  Protected (Admin)
const getFeedbacks = async (req, res) => {
  try {
    const { status, isPublished } = req.query;
    let list = [];

    if (getStatus()) {
      const query = {};
      if (status && status !== 'all') query.status = status;
      if (isPublished !== undefined) query.isPublished = isPublished === 'true';
      list = await Feedback.find(query).sort({ createdAt: -1 }).lean();
    } else {
      list = [...feedbackMemoryStore];
      if (status && status !== 'all') {
        list = list.filter(item => item.status === status);
      }
      if (isPublished !== undefined) {
        const boolPub = isPublished === 'true';
        list = list.filter(item => item.isPublished === boolPub);
      }
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    console.error('[getFeedbacks Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback records.'
    });
  }
};

// @desc    Toggle feedback published state
// @route   PATCH /api/admin/feedbacks/:id/publish
// @access  Protected (Admin)
const togglePublishFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const boolVal = Boolean(isPublished);
    const newStatus = boolVal ? 'published' : 'pending';

    let updated;
    if (getStatus()) {
      updated = await Feedback.findByIdAndUpdate(
        id,
        { isPublished: boolVal, status: newStatus },
        { new: true }
      );
    } else {
      const idx = feedbackMemoryStore.findIndex(item => String(item._id) === String(id));
      if (idx !== -1) {
        feedbackMemoryStore[idx].isPublished = boolVal;
        feedbackMemoryStore[idx].status = newStatus;
        feedbackMemoryStore[idx].updatedAt = new Date();
        updated = feedbackMemoryStore[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Feedback entry not found.'
      });
    }

    // Broadcast to user page and admin listeners
    eventBus.emit('feedback_updated', updated);

    return res.status(200).json({
      success: true,
      message: boolVal ? 'Feedback published to website.' : 'Feedback unpublished from website.',
      data: updated
    });
  } catch (err) {
    console.error('[togglePublishFeedback Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update feedback publish status.'
    });
  }
};

// @desc    Delete a feedback record
// @route   DELETE /api/admin/feedbacks/:id
// @access  Protected (Admin)
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getStatus()) {
      const result = await Feedback.findByIdAndDelete(id);
      deleted = !!result;
    } else {
      const idx = feedbackMemoryStore.findIndex(item => String(item._id) === String(id));
      if (idx !== -1) {
        feedbackMemoryStore.splice(idx, 1);
        deleted = true;
      }
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Feedback entry not found.'
      });
    }

    eventBus.emit('feedback_updated', { _id: id, deleted: true });

    return res.status(200).json({
      success: true,
      message: 'Feedback entry deleted successfully.'
    });
  } catch (err) {
    console.error('[deleteFeedback Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete feedback entry.'
    });
  }
};

// -------------------------------------------------------------
// Real-Time Server-Sent Events (SSE) Stream
// -------------------------------------------------------------

// @desc    Real-time SSE event stream for live updates
// @route   GET /api/admin/events
// @access  Protected (Admin token via header or query)
const streamAdminEvents = (req, res) => {
  // Set headers for Server-Sent Events
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  // Flush headers if supported
  if (res.flushHeaders) res.flushHeaders();

  // Send initial handshake
  res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: new Date().toISOString() })}\n\n`);

  // Event handlers
  const onEnquiryCreated = (data) => {
    res.write(`data: ${JSON.stringify({ type: 'enquiry_created', data })}\n\n`);
  };

  const onFeedbackCreated = (data) => {
    res.write(`data: ${JSON.stringify({ type: 'feedback_created', data })}\n\n`);
  };

  const onFeedbackUpdated = (data) => {
    res.write(`data: ${JSON.stringify({ type: 'feedback_updated', data })}\n\n`);
  };

  eventBus.on('enquiry_created', onEnquiryCreated);
  eventBus.on('feedback_created', onFeedbackCreated);
  eventBus.on('feedback_updated', onFeedbackUpdated);

  // Periodic heartbeat every 20 seconds to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'ping', timestamp: Date.now() })}\n\n`);
  }, 20000);

  // Cleanup on connection close
  req.on('close', () => {
    clearInterval(heartbeat);
    eventBus.off('enquiry_created', onEnquiryCreated);
    eventBus.off('feedback_created', onFeedbackCreated);
    eventBus.off('feedback_updated', onFeedbackUpdated);
    res.end();
  });
};

module.exports = {
  adminLogin,
  verifyAdminOtp,
  resendAdminOtp,
  verifyAdminSession,
  getDashboardStats,
  getQuotes,
  updateQuoteStatus,
  deleteQuote,
  getFeedbacks,
  togglePublishFeedback,
  deleteFeedback,
  streamAdminEvents
};
