const crypto = require('crypto');
const validator = require('validator');
const { Enquiry, memoryStore } = require('../models/Enquiry');
const { Feedback, feedbackMemoryStore } = require('../models/Feedback');
const { getStatus } = require('../config/db');
const { generateToken, hashPassword, verifyPassword } = require('../utils/security');
const eventBus = require('../utils/eventBus');

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
// Authentication Controllers
// -------------------------------------------------------------

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const admin = getAdminConfig();
    const cleanEmail = email.trim().toLowerCase();

    // Constant-time email match simulation
    const emailMatches = crypto.timingSafeEqual(
      Buffer.from(cleanEmail.padEnd(64, ' ')),
      Buffer.from(admin.email.padEnd(64, ' '))
    );

    const passwordMatches = verifyPassword(password, admin.hash, admin.salt);

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.'
      });
    }

    // Generate signed Bearer token (24 hours expiry)
    const token = generateToken({
      email: admin.email,
      role: 'admin'
    }, 86400);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      token,
      admin: {
        email: admin.email,
        role: 'admin',
        name: 'Administrator'
      }
    });
  } catch (err) {
    console.error('[AdminLogin Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
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
        database: getStatus() ? 'MongoDB Connected' : 'In-Memory Store Mode'
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
