import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Support backend API URL in dev/production via env variable
let rawUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

if (rawUrl.includes(',')) {
  const parts = rawUrl.split(',').map((s) => s.trim()).filter(Boolean);
  rawUrl = parts.find((p) => !p.includes(':5173') && !p.includes(':5174')) || parts[0] || '';
}

if (rawUrl.includes(':5173') || rawUrl.includes(':5174')) {
  rawUrl = '';
}

const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// If in production and VITE_API_BASE_URL accidentally points to localhost or is empty, use relative path (/api) for Vercel Serverless
if (!isLocalHost && (rawUrl.includes('127.0.0.1') || rawUrl.includes('localhost'))) {
  rawUrl = '';
}

if (!rawUrl || rawUrl.includes('render.com/docs') || rawUrl.includes('#')) {
  rawUrl = (import.meta.env.DEV || isLocalHost) ? 'http://127.0.0.1:5000' : 'https://data-galactic-1.onrender.com';
}

if (rawUrl) {
  axios.defaults.baseURL = rawUrl.replace(/\/+$/, '');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
