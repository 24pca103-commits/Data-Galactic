import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filledSuccess, setFilledSuccess] = useState(false);

  const handleFillCredentials = (type = 'default') => {
    if (type === 'simple') {
      setEmail('admin');
      setPassword('admin123');
    } else {
      setEmail('admin@datagalactic.in');
      setPassword('Admin@DG2026!');
    }
    setError('');
    setFilledSuccess(true);
    setTimeout(() => setFilledSuccess(false), 2500);
  };

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
      const response = await axios.post('/api/admin/login', {
        email: cleanEmail,
        password: cleanPassword
      }, { withCredentials: true });

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
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setError('Cannot connect to API server at http://127.0.0.1:5000. Please ensure the backend server is running.');
      } else {
        setError('Authentication failed. Please verify your credentials or server status.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (onBackToSite) {
      onBackToSite();
    } else {
      window.location.href = 'http://localhost:5173';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-blue-50/50 text-slate-800 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-[#0047AB] selection:text-white">
      {/* Background ambient royal-blue glows and geometric precision accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#0047AB]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-[#0A58CA]/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Subtle modern grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0047AB 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top back button */}
      <button
        type="button"
        onClick={handleBack}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0047AB] transition-all py-2 px-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:shadow hover:border-[#0047AB]/30 backdrop-blur-md cursor-pointer z-20 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#0047AB]" />
        <span>Back to DataGalactic Website</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,55,160,0.08)] backdrop-blur-xl relative">
          
          {/* Brand Header adopting the Data Galactic logo in PNG format with NO box */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-3">
              <img
                src="/dg-logo.png"
                alt="Data Galactic"
                className="h-24 sm:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm"
              />
            </div>

            {/* Security Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-[#0047AB]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0047AB]" />
              <span>Admin Operations Console</span>
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-600 text-xs sm:text-sm animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <div className="flex-1 font-medium leading-relaxed">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Administrator Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0047AB]/70" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@datagalactic.in or admin"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-[#0047AB] focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0047AB]/70" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-[#0047AB] focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0047AB] via-[#0855c4] to-[#0A58CA] text-white font-semibold text-sm shadow-md shadow-blue-700/20 hover:shadow-lg hover:shadow-blue-700/30 hover:brightness-105 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
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

          {/* Quick Credential Helpers */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>Default Admin Access</span>
                </span>
                {filledSuccess && (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Auto-filled!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-2.5 font-mono">
                <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 truncate">
                  <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">User</span>
                  admin@datagalactic.in
                </div>
                <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 truncate">
                  <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Pass</span>
                  Admin@DG2026!
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFillCredentials('default')}
                  className="flex-1 text-center py-1.5 px-2 rounded-lg bg-blue-50 text-[#0047AB] hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer border border-blue-200/60"
                >
                  Auto-fill standard
                </button>
                <button
                  type="button"
                  onClick={() => handleFillCredentials('simple')}
                  className="flex-1 text-center py-1.5 px-2 rounded-lg bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
                >
                  Auto-fill simple (admin)
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Security watermark */}
        <p className="text-center text-[11px] text-slate-500 mt-6 font-medium">
          Data Galactic Internal Ops • Secure End-to-End Cryptographic Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
