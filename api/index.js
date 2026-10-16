const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../server/.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB } = require('../server/src/config/db');
const enquiryRoutes = require('../server/src/routes/enquiryRoutes');
const adminRoutes = require('../server/src/routes/adminRoutes');
const feedbackRoutes = require('../server/src/routes/feedbackRoutes');

const app = express();

// Initialize DB connection (MySQL or fallback memory store)
connectDB();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// Enable CORS
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

// Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Health / root check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    gateway: 'DataGalactic Vercel Serverless Gateway',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    gateway: 'DataGalactic Vercel Serverless Gateway',
    timestamp: new Date().toISOString()
  });
});

// Support both /api/path and /path
app.use('/api/contact', enquiryRoutes);
app.use('/contact', enquiryRoutes);

app.use('/api/feedback', feedbackRoutes);
app.use('/feedback', feedbackRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

// Base route
app.get('/api', (req, res) => {
  res.json({
    company: 'DataGalactic',
    tagline: 'Precision Beyond Limits',
    status: 'Operational Serverless API'
  });
});

app.get('/', (req, res) => {
  res.json({
    company: 'DataGalactic',
    tagline: 'Precision Beyond Limits',
    status: 'Operational Serverless API'
  });
});

module.exports = app;
