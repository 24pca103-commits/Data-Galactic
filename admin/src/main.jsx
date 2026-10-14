import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';
import './index.css';

// Support backend API URL in dev & production deployments (e.g. Render / Vercel)
let rawUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
if (!rawUrl || rawUrl.includes('render.com/docs') || rawUrl.includes('#')) {
  rawUrl = import.meta.env.DEV ? 'http://127.0.0.1:5000' : '';
}
if (rawUrl) {
  // Strip trailing slash
  axios.defaults.baseURL = rawUrl.replace(/\/+$/, '');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
