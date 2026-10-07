require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

// Initialize DB connection
connectDB();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://datagalactic.in',
  'https://www.datagalactic.in'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow dev origins
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

// Rate limiting (exempt SSE streams and admin endpoints from strict limits)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Generous limit for normal dashboard auto-refresh
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/api/admin/events') || req.path.startsWith('/api/feedback/events'),
  message: {
    success: false,
    message: 'Too many requests, please slow down.'
  }
});
app.use('/api/', generalLimiter);

// Public lead submission rate limiter (stricter against spam bots)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many quote requests from this IP. Please try again after 15 minutes.'
  }
});

// Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Base / Root route
app.get('/', (req, res) => {
  res.json({
    company: 'DataGalactic',
    tagline: 'Precision Beyond Limits',
    businessType: 'B2B Data & Business Support Services',
    location: 'Tamil Nadu, India',
    email: 'hello@datagalactic.in',
    phone: '+91 9363164608',
    status: 'Operational API Gateway',
    documentation: '/api/contact/health'
  });
});

// API Routes
app.use('/api/contact', contactLimiter, enquiryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found.'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.'
  });
});

// Start Server
const server = app.listen(PORT, HOST, () => {
  console.log(`[DataGalactic Server] Running on http://${HOST}:${PORT}`);
  console.log(`[DataGalactic Server] Endpoints: http://${HOST}:${PORT}/api/contact`);
});

module.exports = { app, server };
