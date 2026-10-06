# DataGalactic — B2B Data & Business Support Services

> **Tagline**: Precision Beyond Limits  
> **Business Type**: B2B Data & Business Support Services  
> **Founder & CEO**: Risona R  
> **Location**: Tamil Nadu, India  
> **Business Email**: hello@datagalactic.in | datagalactic2@gmail.com  
> **Phone**: +91 9363164608  
> **Domain**: datagalactic.in  

---

## Overview

DataGalactic is a complete, modern, premium B2B Data Entry & Business Support web application built with the **MERN** stack (MongoDB, Express.js, React.js + Vite, Node.js, Tailwind CSS, Lucide Icons, and Canvas 3D data visualizers).

The platform is designed to convert foreign enterprise clients (US, UK, European & global businesses) looking to outsource high-volume data entry, data cleansing, document conversion, web research, e-commerce catalog management, and back-office operations.

---

## Tech Stack

- **Frontend**: React 18+, Vite, Tailwind CSS v4, Lucide React, Canvas 3D Data Visualizer, Canvas Confetti
- **Backend**: Node.js, Express.js, Multer, Helmet, CORS, Express-Rate-Limit, Validator
- **Database**: MongoDB with Mongoose (with hybrid fallback)
- **Branding**: Monogram DG Logo converted to `.png` and `favicon.png`

---

## Project Structure

```
d:\DG
├── package.json              # Root script runner
├── README.md                 # Project documentation
├── client/                   # React + Vite Frontend
│   ├── public/
│   │   ├── logo.png          # High-resolution DG brand logo
│   │   ├── logo-white.png    # Inverted logo for dark contrast
│   │   ├── favicon.png       # 64x64 website favicon
│   │   └── favicon.ico       # Standard ICO favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Sticky glassmorphic header + mobile drawer
│   │   │   ├── Hero.jsx                 # Hero section with 3D canvas data network
│   │   │   ├── DataVisualizer3D.jsx     # Interactive 3D data node canvas
│   │   │   ├── TrustHighlights.jsx      # 4 horizontal trust & SLA metrics
│   │   │   ├── ProblemSolution.jsx      # In-house pain points vs DG engine
│   │   │   ├── ServicesSection.jsx      # 6 core B2B service capabilities
│   │   │   ├── QuoteCalculator.jsx      # Interactive cost & savings estimator
│   │   │   ├── WhyChooseUs.jsx          # 6 enterprise pillars
│   │   │   ├── IndustriesSection.jsx    # 8 industry workflows (E-commerce, Healthcare, Real Estate, etc.)
│   │   │   ├── HowItWorks.jsx           # 4-step onboarding process
│   │   │   ├── DataSecurity.jsx         # Confidentiality, access control, QA verification
│   │   │   ├── AboutUs.jsx              # Company story & leadership
│   │   │   ├── Testimonials.jsx         # Client feedback structure
│   │   │   ├── FinalCTA.jsx             # Dark high-conversion call-to-action
│   │   │   ├── QuoteContactSection.jsx  # Lead gen form with file upload & REST API
│   │   │   └── Footer.jsx               # Corporate footer with direct contacts
│   │   ├── App.jsx                      # Main page composition
│   │   ├── main.jsx                     # Vite mount point
│   │   └── index.css                    # Tailwind v4 styles & glassmorphism
│   └── vite.config.js                   # Vite config + proxy to port 5000
└── server/                   # Node.js + Express Backend
    ├── uploads/              # Secure isolated directory for quote files
    ├── src/
    │   ├── config/db.js                 # MongoDB connection handler
    │   ├── models/Enquiry.js            # Mongoose lead schema
    │   ├── controllers/enquiryController.js # Validation, sanitization, lead handling
    │   ├── middleware/upload.js         # Multer file filter (10MB limit)
    │   ├── routes/enquiryRoutes.js      # REST API routes
    │   └── server.js                    # Express entrypoint with Helmet & Rate Limiting
    ├── .env                             # Server environment variables
    └── package.json
```

---

## How to Run

### 1. Start Backend Server
```bash
cd server
npm start
# Server will run on http://127.0.0.1:5000
```

### 2. Start Frontend Application
```bash
cd client
npm run dev
# Frontend will run on http://localhost:5173
```

---

## API Endpoints

- `GET /` — API Information & status
- `GET /api/contact/health` — Health check & enquiry counter
- `POST /api/contact` — Submit lead & project quote with optional file attachment (`multipart/form-data` or `json`)

---

## Verified Security Standards

- Strict input validation & XSS sanitization (`validator.escape`)
- File upload restrictions (only permitted extensions, 10MB limit)
- `Helmet` HTTP security headers & CSRF protection
- Express Rate Limiting (60 requests / 15 minutes window)
