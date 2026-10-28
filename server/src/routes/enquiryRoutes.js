const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitEnquiry, getHealth, sendOtp, verifyOtp } = require('../controllers/enquiryController');

// Health check endpoint
router.get('/health', getHealth);

// Real-time OTP endpoints
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Lead submission endpoint (supporting optional single file attachment)
router.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error'
      });
    }
    next();
  });
}, submitEnquiry);

module.exports = router;
