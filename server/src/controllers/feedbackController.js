const validator = require('validator');
const { Feedback, feedbackMemoryStore } = require('../models/Feedback');
const { getStatus } = require('../config/db');
const eventBus = require('../utils/eventBus');

// @desc    Submit a new client feedback / review (Public)
// @route   POST /api/feedback
// @access  Public
const submitFeedback = async (req, res) => {
  try {
    const { name, clientType, region, serviceType, rating, quote, email, company } = req.body;

    const errors = [];
    if (!name || validator.isEmpty(name.trim())) {
      errors.push({ field: 'name', message: 'Name is required.' });
    }
    if (!quote || validator.isEmpty(quote.trim())) {
      errors.push({ field: 'quote', message: 'Feedback text is required.' });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      errors.push({ field: 'rating', message: 'Rating must be between 1 and 5 stars.' });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors
      });
    }

    const feedbackData = {
      name: validator.escape(name.trim()),
      clientType: clientType ? validator.escape(clientType.trim()) : 'Corporate Client',
      region: region ? validator.escape(region.trim()) : 'Global',
      serviceType: serviceType ? validator.escape(serviceType.trim()) : 'B2B Data Services',
      rating: numericRating,
      quote: validator.escape(quote.trim()),
      email: email && validator.isEmail(email.trim()) ? validator.normalizeEmail(email.trim()) : '',
      company: company ? validator.escape(company.trim()) : '',
      isPublished: false,
      status: 'pending'
    };

    let savedRecord;
    if (getStatus()) {
      savedRecord = await Feedback.create(feedbackData);
    } else {
      savedRecord = {
        _id: `fb-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        ...feedbackData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      feedbackMemoryStore.unshift(savedRecord);
    }

    // Broadcast event to admin SSE listeners in real time
    eventBus.emit('feedback_created', savedRecord);

    return res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your review has been submitted for verification and will appear on our website once reviewed.',
      data: {
        id: savedRecord._id,
        name: savedRecord.name,
        rating: savedRecord.rating,
        status: savedRecord.status
      }
    });
  } catch (err) {
    console.error('[FeedbackController Error]:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again later.'
    });
  }
};

// @desc    Get all published feedbacks for the website (Public)
// @route   GET /api/feedback/published
// @access  Public
const getPublishedFeedbacks = async (req, res) => {
  try {
    let list = [];
    if (getStatus()) {
      list = await Feedback.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    } else {
      list = feedbackMemoryStore
        .filter(item => item.isPublished)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    console.error('[getPublishedFeedbacks Error]:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve testimonials at this time.'
    });
  }
};

module.exports = {
  submitFeedback,
  getPublishedFeedbacks
};
