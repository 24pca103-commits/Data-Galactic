const express = require('express');
const router = express.Router();
const { verifyAdminAuth } = require('../middleware/auth');
const {
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
} = require('../controllers/adminController');

// Public admin routes
router.post('/login', adminLogin);

// Protected routes (Admin token required)
router.use(verifyAdminAuth);

router.get('/verify', verifyAdminSession);
router.get('/stats', getDashboardStats);
router.get('/events', streamAdminEvents);

// Quotes / Bookings
router.get('/enquiries', getQuotes);
router.patch('/enquiries/:id/status', updateQuoteStatus);
router.delete('/enquiries/:id', deleteQuote);

// Feedback management
router.get('/feedbacks', getFeedbacks);
router.patch('/feedbacks/:id/publish', togglePublishFeedback);
router.delete('/feedbacks/:id', deleteFeedback);

// Secure Lead Attachment Download (Protected)
const path = require('path');
const fs = require('fs');
router.get('/download/:filename', (req, res) => {
  const safeFilename = path.basename(req.params.filename);
  const uploadDir = path.resolve(__dirname, '../../uploads');
  const filePath = path.join(uploadDir, safeFilename);

  if (!filePath.startsWith(uploadDir + path.sep)) {
    return res.status(403).json({ success: false, message: 'Invalid path access.' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'File not found.' });
  }

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.download(filePath, safeFilename);
});

module.exports = router;
