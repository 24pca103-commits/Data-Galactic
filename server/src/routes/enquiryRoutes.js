const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitEnquiry, getHealth } = require('../controllers/enquiryController');

// Health check endpoint
router.get('/health', getHealth);

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
