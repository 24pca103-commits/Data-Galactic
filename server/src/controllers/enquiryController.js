const validator = require('validator');
const { Enquiry, memoryStore } = require('../models/Enquiry');
const { getStatus } = require('../config/db');

// @desc    Submit a new B2B project enquiry / quote request
// @route   POST /api/contact
// @access  Public
const submitEnquiry = async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      country,
      service,
      projectType,
      estimatedVolume,
      description,
      phone
    } = req.body;

    // 1. Basic validation
    const errors = [];
    if (!name || validator.isEmpty(name.trim())) {
      errors.push({ field: 'name', message: 'Full name is required.' });
    }
    if (!companyName || validator.isEmpty(companyName.trim())) {
      errors.push({ field: 'companyName', message: 'Company name is required.' });
    }
    if (!email || !validator.isEmail(email.trim())) {
      errors.push({ field: 'email', message: 'A valid business email address is required.' });
    }
    if (!country || validator.isEmpty(country.trim())) {
      errors.push({ field: 'country', message: 'Country is required.' });
    }
    if (!service || validator.isEmpty(service.trim())) {
      errors.push({ field: 'service', message: 'Please select a required service.' });
    }
    if (!description || validator.isEmpty(description.trim())) {
      errors.push({ field: 'description', message: 'Please provide project details or workflow requirements.' });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the required fields.',
        errors
      });
    }

    // 2. Prepare sanitized payload
    const enquiryData = {
      name: validator.escape(name.trim()),
      companyName: validator.escape(companyName.trim()),
      email: validator.normalizeEmail(email.trim()),
      country: validator.escape(country.trim()),
      service: validator.escape(service.trim()),
      projectType: projectType || 'One-time Project',
      estimatedVolume: estimatedVolume ? validator.escape(estimatedVolume.trim()) : 'Not specified',
      description: validator.escape(description.trim()),
      phone: phone ? validator.escape(phone.trim()) : ''
    };

    // File handling
    if (req.file) {
      enquiryData.file = {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
    }

    let savedRecord;

    // 3. Save to MongoDB or Fallback Memory Store
    if (getStatus()) {
      savedRecord = await Enquiry.create(enquiryData);
    } else {
      savedRecord = {
        _id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        ...enquiryData,
        createdAt: new Date(),
        status: 'New Lead'
      };
      memoryStore.push(savedRecord);
    }

    // Return clean success response
    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to DataGalactic! Your enquiry has been received. Our project team will review your specifications and contact you with a customized proposal within 12-24 hours.',
      data: {
        id: savedRecord._id,
        name: enquiryData.name,
        companyName: enquiryData.companyName,
        service: enquiryData.service,
        createdAt: savedRecord.createdAt
      }
    });
  } catch (error) {
    console.error('[EnquiryController Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred while processing your request. Please email us directly at hello@datagalactic.in'
    });
  }
};

// @desc    Get API Health & Stats
// @route   GET /api/contact/health
// @access  Public
const getHealth = async (req, res) => {
  const dbConnected = getStatus();
  let count = 0;
  try {
    if (dbConnected) {
      count = await Enquiry.countDocuments();
    } else {
      count = memoryStore.length;
    }
  } catch {
    count = memoryStore.length;
  }

  res.status(200).json({
    status: 'healthy',
    company: 'DataGalactic',
    tagline: 'Precision Beyond Limits',
    businessType: 'B2B Data & Business Support Services',
    database: dbConnected ? 'MongoDB Connected' : 'In-Memory Storage Mode',
    totalEnquiries: count,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  submitEnquiry,
  getHealth
};
