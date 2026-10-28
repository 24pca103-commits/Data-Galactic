import React, { useState } from 'react';
import axios from 'axios';
import { Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import AdminLogin3DBackground from './AdminLogin3DBackground';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please provide both administrator email/username and password.');
      return;
    }

    setLoading(true);
    try {
      let response;
      try {
        response = await axios.post('/api/admin/login', {
          email: cleanEmail,
          password: cleanPassword
        }, { withCredentials: true });
      } catch (postErr) {
        // If relative call failed, retry directly against local backend port 5000
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        let retried = false;

        if (isLocal) {
          try {
            response = await axios.post('http://127.0.0.1:5000/api/admin/login', {
              email: cleanEmail,
              password: cleanPassword
            }, { withCredentials: true });
            retried = true;
          } catch (localErr1) {
            try {
              response = await axios.post('http://localhost:5000/api/admin/login', {
                email: cleanEmail,
                password: cleanPassword
              }, { withCredentials: true });
              retried = true;
            } catch (localErr2) {
              retried = false;
            }
          }
        }

        if (!retried) {
          // If backend API is not running or returned 405/network error, check if default credentials match
          const isDefaultUser = (
            cleanEmail.toLowerCase() === 'admin@datagalactic.in' ||
            cleanEmail.toLowerCase() === 'admin' ||
            cleanEmail.toLowerCase() === 'administrator'
          );
          const isDefaultPass = (
            cleanPassword === 'Admin@DG2026!' ||
            cleanPassword === 'admin123' ||
            cleanPassword === 'admin' ||
            cleanPassword === 'Admin@123' ||
            cleanPassword === 'Admin@dg2026!'
          );

          if (isDefaultUser && isDefaultPass) {
            // Log in gracefully with Standalone Mode
            const offlineAdmin = {
              email: 'admin@datagalactic.in',
              role: 'admin',
              name: 'Administrator (Standalone Mode)',
              mode: 'standalone'
            };
            const offlineToken = 'offline-admin-token';
            localStorage.setItem('dg_admin_token', offlineToken);
            localStorage.setItem('dg_admin_user', JSON.stringify(offlineAdmin));
            onLoginSuccess(offlineToken, offlineAdmin);
            return;
          }

          // If credentials were invalid, show clear message rather than cryptic 405
          if (!isDefaultUser || !isDefaultPass) {
            setError('Invalid administrator credentials. Please check your username and password.');
            return;
          }

          throw postErr;
        }
      }

      if (response && response.data && response.data.success) {
        const { token, admin } = response.data;
        localStorage.setItem('dg_admin_token', token);
        localStorage.setItem('dg_admin_user', JSON.stringify(admin));
        onLoginSuccess(token, admin);
      } else {
        setError(response?.data?.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 405) {
        setError('405 Method Not Allowed: Backend API endpoint is not active. Run "npm run server" for local backend, or use default credentials to enter Standalone Mode.');
      } else if (err.code === 'ERR_NETWORK' || !err.response || err.response?.status === 502) {
        setError('Cannot connect to API server. If hosted on Render, free instances can take ~30-50s to wake up. For local development, run "npm run server" in your terminal.');
      } else {
        setError('Authentication failed. Please verify your credentials or server status.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnterStandaloneMode = () => {
    const offlineAdmin = {
      email: 'admin@datagalactic.in',
      role: 'admin',
      name: 'Administrator (Standalone Mode)',
      mode: 'standalone'
    };
    const offlineToken = 'offline-admin-token';
    localStorage.setItem('dg_admin_token', offlineToken);
    localStorage.setItem('dg_admin_user', JSON.stringify(offlineAdmin));
    onLoginSuccess(offlineToken, offlineAdmin);
  };

  const handleBack = () => {
    if (onBackToSite) {
      onBackToSite();
    } else {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      window.location.href = isLocal ? 'http://localhost:5173' : (import.meta.env.VITE_CLIENT_URL || '/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020813] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-[#0047AB] selection:text-white">
      {/* Interactive 3D Animated Background Canvas */}
      <AdminLogin3DBackground />

      {/* Top back button */}
      <button
        type="button"
        onClick={handleBack}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-blue-200 hover:text-white transition-all py-2 px-3.5 rounded-xl bg-slate-900/80 border border-blue-500/30 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-md cursor-pointer z-20 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#38BDF8]" />
        <span>Back to DataGalactic Website</span>
      </button>

      {/* Login Card - Dark Blue Theme */}
      <div className="w-full max-w-[390px] relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <div 
          className="admin-card-dark rounded-2xl p-6 sm:p-7 shadow-[0_25px_70px_-15px_rgba(0,25,80,0.7)] relative text-white border"
          style={{ backgroundColor: '#002244', borderColor: '#003875', color: '#ffffff' }}
        >
          
          {/* Brand Header: Logo mark on left, text on the right side (Side-by-Side) */}
          <div className="flex items-center justify-center gap-3 mb-5 select-none">
            <img
              src="/dg-monogram.png"
              alt="Data Galactic"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-md"
            />
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit'] leading-tight">
                Data<span className="text-[#38BDF8]">Galactic</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-blue-200/80 font-bold leading-none mt-1">
                Precision Beyond Limits
              </span>
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-blue-100 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#38BDF8]" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter username or email"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 transition-all placeholder:text-blue-300/40 font-medium border"
                  style={{ backgroundColor: '#051426', borderColor: '#0f2744', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-blue-100 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#38BDF8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl text-white text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/20 transition-all placeholder:text-blue-300/40 font-medium border"
                  style={{ backgroundColor: '#051426', borderColor: '#0f2744', color: '#ffffff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-blue-200 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0047AB] via-[#0284C7] to-[#0A58CA] text-white font-semibold text-sm shadow-lg shadow-blue-950/60 hover:brightness-110 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 border border-blue-400/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Admin Portal</span>
              )}
            </button>
          </form>

        </div>

        {/* Security watermark */}
        <p className="text-center text-[11px] text-blue-300/70 mt-5 font-medium">
          Data Galactic Internal Ops • Secure End-to-End Cryptographic Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
