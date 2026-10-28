const express = require('express');
const router = express.Router();
const { submitFeedback, getPublishedFeedbacks } = require('../controllers/feedbackController');
const eventBus = require('../utils/eventBus');

// Submit feedback (Public)
router.post('/', submitFeedback);

// Get published feedbacks for website display (Public)
router.get('/published', getPublishedFeedbacks);

// Optional public live events for website testimonial updates
router.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  if (res.flushHeaders) res.flushHeaders();

  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

  const onUpdate = (data) => {
    res.write(`data: ${JSON.stringify({ type: 'feedback_updated', data })}\n\n`);
  };

  eventBus.on('feedback_updated', onUpdate);

  const heartbeat = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'ping' })}\n\n`);
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    eventBus.off('feedback_updated', onUpdate);
    res.end();
  });
});

module.exports = router;
