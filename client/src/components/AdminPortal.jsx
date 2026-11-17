import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  Database,
  RefreshCw,
  Download,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  ArrowLeft,
  Phone,
  Building,
  Globe2,
  Star,
  Sparkles,
  ExternalLink,
  FileSpreadsheet,
  Check,
  X,
  Layers,
  ChevronDown,
  UserCheck
} from 'lucide-react';

const AdminPortal = () => {
  // Authentication State
  const [token, setToken] = useState(() => localStorage.getItem('dg_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dg_admin_user')) || null;
    } catch {
      return null;
    }
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Navigation
  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries' | 'feedbacks' | 'system'

  // Data State
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters & Search for Enquiries
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Axios helper with Auth headers
  const authAxios = useMemo(() => {
    return axios.create({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
  }, [token]);

  // Show Toast
  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Verify Session on token change
  useEffect(() => {
    if (!token) return;

    authAxios.get('/api/admin/verify')
      .then((res) => {
        if (res.data?.success) {
          setAdminUser(res.data.admin);
          localStorage.setItem('dg_admin_user', JSON.stringify(res.data.admin));
        }
      })
      .catch(() => {
        // Token invalid or expired
        handleLogout();
      });
  }, [token, authAxios]);

  // Fetch Dashboard Data
  const fetchData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [statsRes, enquiriesRes, feedbacksRes] = await Promise.all([
        authAxios.get('/api/admin/stats').catch(() => ({ data: { data: null } })),
        authAxios.get('/api/admin/enquiries').catch(() => ({ data: { data: [] } })),
        authAxios.get('/api/admin/feedbacks').catch(() => ({ data: { data: [] } }))
      ]);

      if (statsRes.data?.success) setStats(statsRes.data.data);
      if (enquiriesRes.data?.success) setEnquiries(enquiriesRes.data.data || []);
      if (feedbacksRes.data?.success) setFeedbacks(feedbacksRes.data.data || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await axios.post('/api/admin/login', {
        email: loginEmail.trim(),
        password: loginPassword
      });

      if (res.data?.success && res.data.token) {
        setToken(res.data.token);
        setAdminUser(res.data.admin);
        localStorage.setItem('dg_admin_token', res.data.token);
        localStorage.setItem('dg_admin_user', JSON.stringify(res.data.admin));
        showToast('Welcome back, Administrator!');
      } else {
        setLoginError(res.data?.message || 'Authentication failed.');
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setToken('');
    setAdminUser(null);
    localStorage.removeItem('dg_admin_token');
    localStorage.removeItem('dg_admin_user');
  };

  // Quick autofill for demo testing
  const autofillCredentials = () => {
    setLoginEmail('admin@datagalactic.in');
    setLoginPassword('Admin@DG2026!');
    setLoginError('');
  };

  // Update Enquiry Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await authAxios.patch(`/api/admin/enquiries/${id}/status`, { status: newStatus });
      if (res.data?.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id || item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && (selectedEnquiry._id === id || selectedEnquiry.id === id)) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead record?')) return;
    try {
      const res = await authAxios.delete(`/api/admin/enquiries/${id}`);
      if (res.data?.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id && item.id !== id));
        if (selectedEnquiry && (selectedEnquiry._id === id || selectedEnquiry.id === id)) {
          setSelectedEnquiry(null);
        }
        showToast('Enquiry deleted successfully');
      }
    } catch (err) {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  // Toggle Feedback Publish
  const handleTogglePublishFeedback = async (id, currentPublished) => {
    const nextState = !currentPublished;
    try {
      const res = await authAxios.patch(`/api/admin/feedbacks/${id}/publish`, { isPublished: nextState });
      if (res.data?.success) {
        setFeedbacks((prev) =>
          prev.map((f) =>
            f._id === id || f.id === id ? { ...f, isPublished: nextState ? 1 : 0, status: nextState ? 'published' : 'pending' } : f
          )
        );
        showToast(nextState ? 'Feedback published to website' : 'Feedback unpublished');
      }
    } catch (err) {
      showToast('Failed to update feedback status', 'error');
    }
  };

  // Delete Feedback
  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Delete this client testimonial review?')) return;
    try {
      const res = await authAxios.delete(`/api/admin/feedbacks/${id}`);
      if (res.data?.success) {
        setFeedbacks((prev) => prev.filter((f) => f._id !== id && f.id !== id));
        showToast('Feedback removed');
      }
    } catch (err) {
      showToast('Failed to delete feedback', 'error');
    }
  };

  // Export Enquiries to CSV
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) {
      showToast('No enquiries to export in current filter', 'error');
      return;
    }

    const headers = [
      'Reference ID',
      'Date Submitted',
      'Client Name',
      'Company Name',
      'Email',
      'Phone',
      'Country',
      'Service Requested',
      'Project Type',
      'Estimated Volume',
      'Status',
      'Project Description'
    ];

    const rows = filteredEnquiries.map((item) => [
      `"DG-${String(item._id || item.id).slice(-6).toUpperCase()}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.companyName || '').replace(/"/g, '""')}"`,
      `"${item.email || ''}"`,
      `"${item.phone || ''}"`,
      `"${(item.country || '').replace(/"/g, '""')}"`,
      `"${(item.service || '').replace(/"/g, '""')}"`,
      `"${(item.projectType || '').replace(/"/g, '""')}"`,
      `"${(item.estimatedVolume || '').replace(/"/g, '""')}"`,
      `"${item.status || 'New Lead'}"`,
      `"${(item.description || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DataGalactic_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filteredEnquiries.length} leads to CSV`);
  };

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.companyName?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.service?.toLowerCase().includes(q) ||
        item.country?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [enquiries, statusFilter, searchQuery]);

  // Status color pill generator
  const getStatusBadge = (st) => {
    switch (st) {
      case 'New Lead':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Under Review':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'Quote Sent':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'In Discussion':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Closed':
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
      default:
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    }
  };

  // ==============================================================
  // 1. LOGIN SCREEN (If not authenticated)
  // ==============================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-[#05142f] text-slate-100 flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden font-sans">
        {/* Background Cyber Grid & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0047AB22,transparent_60%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0047AB]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Back Link */}
        <div className="w-full max-w-md mb-6 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-[#0a1f45]/90 border border-[#1e3f73] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#002b66] to-[#0047AB] border border-[#4c8df7]/40 shadow-[0_0_20px_rgba(0,71,171,0.5)] mb-4">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight font-['Space_Grotesk']">
              Data<span className="text-[#4c8df7]">Galactic</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#aac7ee] font-semibold mt-1">
              Internal Operations Portal
            </p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@datagalactic.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#05142f]/80 border border-[#1e3f73] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4c8df7] focus:ring-1 focus:ring-[#4c8df7] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Portal Master Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#05142f]/80 border border-[#1e3f73] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4c8df7] focus:ring-1 focus:ring-[#4c8df7] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#002b66] via-[#0047AB] to-[#0d4ba3] hover:from-[#0047AB] hover:to-[#1a64d2] text-white rounded-xl text-sm font-bold shadow-[0_4px_18px_rgba(0,71,171,0.4)] border border-[#4c8df7]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Unlock Admin Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Autofill */}
          <div className="mt-6 pt-5 border-t border-[#1e3f73] text-center">
            <button
              type="button"
              onClick={autofillCredentials}
              className="text-xs text-[#aac7ee] hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              ⚡ Click here to auto-fill default admin credentials
            </button>
            <p className="text-[11px] text-slate-500 mt-2">
              Default: <code className="text-slate-400">admin@datagalactic.in</code> / <code className="text-slate-400">Admin@DG2026!</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==============================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==============================================================
  return (
    <div className="min-h-screen bg-[#05142f] text-slate-100 font-sans pb-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slide-up ${
            toastMessage.type === 'error'
              ? 'bg-red-500/90 text-white border-red-400'
              : 'bg-[#0047AB]/90 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          }`}
        >
          {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-cyan-300" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#071736]/90 border-b border-[#1e3f73] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#002b66] to-[#0047AB] border border-[#4c8df7]/40 flex items-center justify-center font-black text-white text-base">
                DG
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white font-['Space_Grotesk'] leading-none">
                  Data<span className="text-[#4c8df7]">Galactic</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mt-0.5">
                  Operations Suite
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live System</span>
            </span>
          </div>

          {/* Right Controls: Website Link & Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1f45] hover:bg-[#122f5c] border border-[#1e3f73] text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span className="hidden sm:inline">View Website</span>
            </Link>

            <div className="h-6 w-[1px] bg-[#1e3f73] hidden sm:block" />

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate max-w-[150px]">{adminUser?.email || 'admin@datagalactic.in'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-xs font-semibold text-red-300 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-[#122f5c] overflow-x-auto">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'enquiries'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Enquiries &amp; Leads</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#0047AB] text-white font-mono">
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'feedbacks'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Client Reviews</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono">
              {feedbacks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'system'
                ? 'border-purple-400 text-purple-300 bg-purple-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>System &amp; Database</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ==============================================================
            TAB 1: ENQUIRIES & LEADS
        ============================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#0a1f45]/80 border border-[#1e3f73] rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Leads</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">
                  {enquiries.length}
                </span>
              </div>
              <div className="bg-[#0a1f45]/80 border border-emerald-500/30 rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">New Leads</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1 block">
                  {enquiries.filter((q) => q.status === 'New Lead').length}
                </span>
              </div>
              <div className="bg-[#0a1f45]/80 border border-sky-500/30 rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block">Under Review</span>
                <span className="text-2xl sm:text-3xl font-black text-sky-300 font-mono mt-1 block">
                  {enquiries.filter((q) => q.status === 'Under Review' || q.status === 'In Discussion').length}
                </span>
              </div>
              <div className="bg-[#0a1f45]/80 border border-purple-500/30 rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block">Quotes Sent / Closed</span>
                <span className="text-2xl sm:text-3xl font-black text-purple-300 font-mono mt-1 block">
                  {enquiries.filter((q) => q.status === 'Quote Sent' || q.status === 'Closed').length}
                </span>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0a1f45]/80 border border-[#1e3f73] rounded-xl p-3 sm:p-4 backdrop-blur-md">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by client, company, email, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#05142f] border border-[#1e3f73] rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4c8df7]"
                />
              </div>

              {/* Status Filter + Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 bg-[#05142f] border border-[#1e3f73] rounded-lg px-2.5 py-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#05142f]">All Statuses</option>
                    <option value="New Lead" className="bg-[#05142f]">New Lead</option>
                    <option value="Under Review" className="bg-[#05142f]">Under Review</option>
                    <option value="Quote Sent" className="bg-[#05142f]">Quote Sent</option>
                    <option value="In Discussion" className="bg-[#05142f]">In Discussion</option>
                    <option value="Closed" className="bg-[#05142f]">Closed</option>
                  </select>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0047AB] hover:bg-[#125ecc] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={fetchData}
                  disabled={loadingData}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#05142f] hover:bg-[#122f5c] border border-[#1e3f73] text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin text-cyan-400' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Leads Table / Card List */}
            {filteredEnquiries.length === 0 ? (
              <div className="bg-[#0a1f45]/50 border border-[#1e3f73] rounded-xl p-12 text-center">
                <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-300">No project enquiries found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery || statusFilter !== 'all'
                    ? 'No leads match your current search or status filter criteria.'
                    : 'When prospective clients submit quote requests on the website, they will appear here in real time.'}
                </p>
              </div>
            ) : (
              <div className="bg-[#0a1f45]/80 border border-[#1e3f73] rounded-xl overflow-hidden shadow-xl backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#071736] text-[11px] uppercase tracking-wider text-slate-400 border-b border-[#1e3f73]">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Ref / Date</th>
                        <th className="py-3.5 px-4 font-bold">Client / Company</th>
                        <th className="py-3.5 px-4 font-bold">Service &amp; Scope</th>
                        <th className="py-3.5 px-4 font-bold">Type &amp; Volume</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#122f5c]">
                      {filteredEnquiries.map((item) => {
                        const refCode = String(item._id || item.id).slice(-6).toUpperCase();
                        return (
                          <tr key={item._id || item.id} className="hover:bg-[#0e2754]/50 transition-colors">
                            {/* Ref & Date */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-mono font-bold text-[#4c8df7]">#DG-{refCode}</span>
                              <span className="block text-[11px] text-slate-400 mt-0.5">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            </td>

                            {/* Client & Company */}
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-white block">{item.name}</span>
                              <span className="text-[#aac7ee] block text-[11px] font-medium">{item.companyName}</span>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                                <span>{item.email}</span>
                                <span>&bull;</span>
                                <span className="text-slate-300">{item.country}</span>
                              </div>
                            </td>

                            {/* Service Requested */}
                            <td className="py-3.5 px-4 max-w-xs">
                              <span className="font-semibold text-white block">{item.service}</span>
                              <p className="text-[11px] text-slate-400 truncate max-w-[240px] mt-0.5">
                                {item.description}
                              </p>
                              {item.file_originalName && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                                  📎 {item.file_originalName}
                                </span>
                              )}
                            </td>

                            {/* Type & Volume */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="block text-slate-200">{item.projectType}</span>
                              <span className="block text-[11px] text-slate-400 mt-0.5">
                                {item.estimatedVolume || 'Standard Volume'}
                              </span>
                            </td>

                            {/* Status Dropdown */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={item.status || 'New Lead'}
                                onChange={(e) => handleUpdateStatus(item._id || item.id, e.target.value)}
                                className={`text-[11px] font-bold rounded-full px-2.5 py-1 border focus:outline-none cursor-pointer ${getStatusBadge(
                                  item.status || 'New Lead'
                                )}`}
                              >
                                <option value="New Lead" className="bg-[#05142f] text-white">New Lead</option>
                                <option value="Under Review" className="bg-[#05142f] text-white">Under Review</option>
                                <option value="Quote Sent" className="bg-[#05142f] text-white">Quote Sent</option>
                                <option value="In Discussion" className="bg-[#05142f] text-white">In Discussion</option>
                                <option value="Closed" className="bg-[#05142f] text-white">Closed</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedEnquiry(item)}
                                  className="p-1.5 rounded-lg bg-[#05142f] hover:bg-[#122f5c] border border-[#1e3f73] text-slate-300 hover:text-white transition-all cursor-pointer"
                                  title="View Full Specifications"
                                >
                                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                </button>
                                <a
                                  href={`mailto:${item.email}?subject=DataGalactic%20Proposal%20for%20${encodeURIComponent(
                                    item.service
                                  )}%20[Ref:%20#DG-${refCode}]`}
                                  className="p-1.5 rounded-lg bg-[#0047AB]/30 hover:bg-[#0047AB] border border-[#4c8df7]/30 text-white transition-all cursor-pointer"
                                  title="Send Email Reply"
                                >
                                  <Mail className="w-3.5 h-3.5 text-white" />
                                </a>
                                <button
                                  onClick={() => handleDeleteEnquiry(item._id || item.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-300 transition-all cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            TAB 2: CLIENT REVIEWS & FEEDBACK
        ============================================================== */}
        {activeTab === 'feedbacks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0a1f45]/80 border border-[#1e3f73] rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Reviews</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">
                  {feedbacks.length}
                </span>
              </div>
              <div className="bg-[#0a1f45]/80 border border-emerald-500/30 rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">Published on Site</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1 block">
                  {feedbacks.filter((f) => f.isPublished).length}
                </span>
              </div>
              <div className="bg-[#0a1f45]/80 border border-amber-500/30 rounded-xl p-4 backdrop-blur-md">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">Pending Moderation</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1 block">
                  {feedbacks.filter((f) => !f.isPublished).length}
                </span>
              </div>
            </div>

            {feedbacks.length === 0 ? (
              <div className="bg-[#0a1f45]/50 border border-[#1e3f73] rounded-xl p-12 text-center">
                <Star className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-300">No client feedback submitted yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When clients share reviews via the homepage feedback section, you can review, approve, or hide them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedbacks.map((f) => (
                  <div
                    key={f._id || f.id}
                    className="bg-[#0a1f45]/80 border border-[#1e3f73] rounded-xl p-5 backdrop-blur-md flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Stars + Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < (f.rating || 5) ? 'fill-amber-400' : 'text-slate-600'}`}
                            />
                          ))}
                          <span className="text-xs font-bold text-slate-300 ml-1.5 font-mono">
                            {f.rating || 5}.0
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            f.isPublished
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {f.isPublished ? '✓ Published on Website' : '⏳ Pending Approval'}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed mb-4">
                        "{f.quote}"
                      </p>

                      {/* Client Info */}
                      <div className="pt-3 border-t border-[#122f5c] text-xs">
                        <span className="font-bold text-white block">{f.name}</span>
                        <span className="text-[#aac7ee] text-[11px] block">{f.company || f.clientType}</span>
                        <span className="text-slate-400 text-[11px] block mt-0.5">
                          {f.serviceType} &bull; {f.region || 'Global'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#122f5c]">
                      <button
                        onClick={() => handleTogglePublishFeedback(f._id || f.id, f.isPublished)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          f.isPublished
                            ? 'bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300'
                            : 'bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300'
                        }`}
                      >
                        {f.isPublished ? 'Unpublish from Site' : '✓ Approve & Publish'}
                      </button>

                      <button
                        onClick={() => handleDeleteFeedback(f._id || f.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-300 transition-all cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            TAB 3: SYSTEM & DATABASE
        ============================================================== */}
        {activeTab === 'system' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-[#0a1f45]/80 border border-[#1e3f73] rounded-2xl p-6 backdrop-blur-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0047AB]/20 border border-[#4c8df7]/40 flex items-center justify-center">
                  <Database className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Database &amp; Storage Architecture</h3>
                  <p className="text-xs text-slate-400">Integrated MySQL persistence layer with automatic schema synchronization</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#05142f] border border-[#1e3f73]">
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Engine &amp; Connection</span>
                  <span className="text-white font-bold text-sm mt-1 block">
                    {stats?.database || 'MySQL Connected (datagalactic)'}
                  </span>
                  <span className="text-emerald-400 text-[11px] mt-1 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Host: 127.0.0.1:3306
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#05142f] border border-[#1e3f73]">
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Real-Time Mail Dispatcher</span>
                  <span className="text-white font-bold text-sm mt-1 block">Gmail SMTP (SSL Port 465)</span>
                  <span className="text-cyan-400 text-[11px] mt-1 block truncate">
                    Admin: kan93095@gmail.com
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05142f] border border-[#1e3f73] space-y-2 text-xs">
                <span className="font-bold text-slate-200 block">Database Schema Summary:</span>
                <ul className="space-y-1 text-slate-400 font-mono text-[11px]">
                  <li>&bull; <strong className="text-slate-200">enquiries</strong> (Stores project leads, volume, specs, uploads, status)</li>
                  <li>&bull; <strong className="text-slate-200">feedbacks</strong> (Stores client ratings, testimonials, publishing flag)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#05142f] border border-[#1e3f73] space-y-2 text-xs">
                <span className="font-bold text-slate-200 block">Staff Authentication Configuration:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Admin session is authenticated using signed JSON Web Tokens (JWT) with 24-hour expiration. Direct credential overrides can be adjusted in <code className="text-[#4c8df7]">server/.env</code>.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==============================================================
          LEAD DETAIL MODAL
      ============================================================== */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#071736] border border-[#1e3f73] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0047AB] text-white font-mono">
                #DG-{String(selectedEnquiry._id || selectedEnquiry.id).slice(-6).toUpperCase()}
              </span>
              <h2 className="text-xl font-bold text-white mt-2 font-['Space_Grotesk']">
                {selectedEnquiry.service}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#05142f] border border-[#1e3f73] rounded-xl p-4 mb-5 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Client Name:</span>
                <span className="text-white font-bold">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Company / Organization:</span>
                <span className="text-[#4c8df7] font-bold">{selectedEnquiry.companyName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email Address:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-cyan-400 font-medium hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Phone / WhatsApp:</span>
                <span className="text-slate-200 font-medium">{selectedEnquiry.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Target Region / Country:</span>
                <span className="text-slate-200">{selectedEnquiry.country}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Engagement Model:</span>
                <span className="text-slate-200 font-medium">{selectedEnquiry.projectType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Estimated Data Volume:</span>
                <span className="text-slate-200">{selectedEnquiry.estimatedVolume || 'Standard Volume'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Current Status:</span>
                <span className="text-emerald-400 font-bold">{selectedEnquiry.status || 'New Lead'}</span>
              </div>
            </div>

            {/* Scope / Description Box */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Project Scope &amp; Requirements:
              </span>
              <div className="bg-[#05142f] border border-[#1e3f73] rounded-xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.description}
              </div>
            </div>

            {/* Attachment if present */}
            {selectedEnquiry.file_storedName && (
              <div className="mb-6 p-3.5 bg-[#05142f] border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <span>📎</span>
                  <span>{selectedEnquiry.file_originalName}</span>
                </div>
                <a
                  href={`/api/admin/download/${selectedEnquiry.file_storedName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all"
                >
                  Download File
                </a>
              </div>
            )}

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1e3f73]">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 bg-[#05142f] hover:bg-[#122f5c] border border-[#1e3f73] rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
              >
                Close View
              </button>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=DataGalactic%20Proposal%20for%20${encodeURIComponent(
                  selectedEnquiry.service
                )}%20[Ref:%20#DG-${String(selectedEnquiry._id || selectedEnquiry.id).slice(-6).toUpperCase()}]`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#002b66] to-[#0047AB] hover:from-[#0047AB] hover:to-[#1a64d2] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Send Proposal / Reply</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
