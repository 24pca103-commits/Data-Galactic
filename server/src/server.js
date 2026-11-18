const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();
const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB, closeDB, getStatus } = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Enable trust proxy for reverse proxies (Render, Vercel, Cloudflare)
app.set('trust proxy', 1);

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
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
  'https://datagalactic.in',
  'https://www.datagalactic.in',
  'https://admin.datagalactic.in',
  'https://data-galactic-user.vercel.app',
  'https://data-galactic.vercel.app',
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    // Check exact matches
    if (allowedOrigins.includes(origin)) return callback(null, true);
    
    // Allow any Vercel deployment preview or production domain
    if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Default allow to ensure public API & verified admin endpoints are not blocked
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Express 5 compatible global OPTIONS preflight handler (avoids path-to-regexp '*' error)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Rate limiting (exempt SSE streams and admin endpoints from strict limits)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Generous limit for normal dashboard auto-refresh
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
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
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many quote requests from this IP. Please try again after 15 minutes.'
  }
});

// Admin auth & OTP brute-force protection limiter
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many authentication attempts. Please wait 15 minutes before trying again.'
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
    businessType: 'Enterprise Data & Business Support Services',
    location: 'Tamil Nadu, India',
    email: 'hello@datagalactic.in',
    phone: '+91 9363164608',
    status: 'Operational API Gateway',
    health: '/api/health'
  });
});

// Production Health Check Endpoint (for Render & Uptime Monitors)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    database: getStatus() ? 'MySQL Connected' : 'In-Memory Fallback',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/contact', contactLimiter, enquiryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin/login', adminAuthLimiter);
app.use('/api/admin/verify-otp', adminAuthLimiter);
app.use('/api/admin/resend-otp', adminAuthLimiter);
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

// Start Server (only when run directly or locally, not as Vercel serverless function)
let server;
if (!process.env.VERCEL) {
  server = app.listen(PORT, HOST, () => {
    console.log(`[DataGalactic Server] Running on http://${HOST}:${PORT}`);
    console.log(`[DataGalactic Server] Health Check: http://${HOST}:${PORT}/api/health`);
  });

  // Graceful shutdown for Render / Docker / PM2 deployments
  const shutdown = async (signal) => {
    console.log(`[DataGalactic Server] ${signal} received. Shutting down gracefully...`);
    if (server) {
      server.close(async () => {
        await closeDB();
        process.exit(0);
      });
    } else {
      await closeDB();
      process.exit(0);
    }
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = app;
module.exports.app = app;
module.exports.server = server;
