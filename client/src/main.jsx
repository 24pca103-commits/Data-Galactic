import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Support backend API URL in dev/production via env variable
let rawUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
if (!rawUrl || rawUrl.includes('render.com/docs') || rawUrl.includes('#')) {
  rawUrl = import.meta.env.DEV ? 'http://127.0.0.1:5000' : '';
}
if (rawUrl) {
  axios.defaults.baseURL = rawUrl.replace(/\/+$/, '');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
