import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFillCredentials = () => {
    setEmail('admin@datagalactic.in');
    setPassword('Admin@DG2026!');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/admin/login', {
        email: email.trim(),
        password
      });

      if (response.data.success) {
        const { token, admin } = response.data;
        localStorage.setItem('dg_admin_token', token);
        localStorage.setItem('dg_admin_user', JSON.stringify(admin));
        onLoginSuccess(token, admin);
      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or server connection error.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d13] flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background ambient neon glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#38bdf8]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#0284c7]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Top back button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#38bdf8] transition-colors py-2 px-3 rounded-lg bg-[#161b22]/80 border border-[#30363d] backdrop-blur-md cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to DataGalactic Website</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#161b22]/95 border border-[#30363d] rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Brand & Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21262d] border border-[#38bdf8]/30 text-xs font-medium text-[#7dd3fc] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Admin Security Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Rajdhani']">
              DATA <span className="text-[#38bdf8]">GALACTIC</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">
              Management &amp; Live Operations Console
            </p>
          </div>

          {/* Error notice */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs sm:text-sm animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@datagalactic.in"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-semibold text-sm shadow-lg hover:shadow-[#38bdf8]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Admin Dashboard</span>
              )}
            </button>
          </form>

          {/* Quick Demo Credential Helper */}
          <div className="mt-6 pt-5 border-t border-[#30363d]/80 text-center">
            <button
              type="button"
              onClick={handleFillCredentials}
              className="text-xs text-[#7dd3fc] hover:text-[#38bdf8] hover:underline font-medium transition-colors cursor-pointer"
            >
              Auto-fill default admin credentials
            </button>
          </div>

        </div>

        {/* Security watermark */}
        <p className="text-center text-[11px] text-slate-600 mt-6 font-mono">
          DataGalactic Internal Ops • Protected by cryptographic HMAC verification
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
