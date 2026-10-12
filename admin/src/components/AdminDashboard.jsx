import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  RefreshCw,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Send,
  CheckCheck,
  XCircle,
  FileText,
  Download,
  Trash2,
  Eye,
  Star,
  Building,
  Mail,
  Phone,
  Globe,
  AlertCircle,
  Radio,
  Check,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Save,
  Menu,
  X,
  User,
  SlidersHorizontal,
  MapPin,
  Calendar
} from 'lucide-react';

const AdminDashboard = ({ token, adminUser, initialTab = 'overview', onLogout, onBackToSite }) => {
  // Default to 'overview' (Dashboard) as requested
  const [activeTab, setActiveTab] = useState(initialTab || 'overview'); // 'overview' | 'quotes' | 'feedback'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    window.location.hash = `#admin/${tab}`;
    setSidebarOpen(false); // Close sidebar drawer upon selecting a tab
  };

  // Data state
  const [stats, setStats] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date());

  // Search & Filter state for Quotes
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('all');

  // Search & Filter state for Customer Feedback (matching Quotes structure)
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState('all'); // 'all' | 'pending' | 'published'

  // Modals & Active Selections
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Customer Feedback Details Modal
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Live Notification Toast
  const [liveToast, setLiveToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Auth Header helper
  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const showToast = (message, type = 'info') => {
    setLiveToast({ message, type });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setLiveToast(null);
    }, 4500);
  };

  // Fetch all primary dashboard data
  const fetchData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const [statsRes, quotesRes, feedbacksRes] = await Promise.all([
        axios.get('/api/admin/stats', authHeaders),
        axios.get('/api/admin/enquiries', authHeaders),
        axios.get('/api/admin/feedbacks', authHeaders)
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (quotesRes.data.success) setQuotes(quotesRes.data.data);
      if (feedbacksRes.data.success) setFeedbacks(feedbacksRes.data.data);
      
      setLastRefreshedAt(new Date());
    } catch (err) {
      if (err.response?.status === 401) {
        onLogout();
      }
      console.error('Failed to refresh admin data:', err);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, [token]);

  // Auto-refresh interval (5-second polling fallback)
  useEffect(() => {
    if (!autoRefreshEnabled) return;
    const interval = setInterval(() => {
      fetchData(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefreshEnabled, token]);



  // Update Quote Status
  const handleUpdateQuoteStatus = async (quoteId, newStatus) => {
    try {
      const res = await axios.patch(
        `/api/admin/enquiries/${quoteId}/status`,
        { status: newStatus },
        authHeaders
      );

      if (res.data.success) {
        setQuotes((prev) =>
          prev.map((q) => (q._id === quoteId ? { ...q, status: newStatus } : q))
        );
        if (selectedQuote && selectedQuote._id === quoteId) {
          setSelectedQuote((prev) => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus}"`, 'success');
      }
    } catch (err) {
      showToast('Failed to update quote status.', 'error');
    }
  };

  // Save Notes on Quote
  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setSavingNotes(true);
    try {
      const res = await axios.patch(
        `/api/admin/enquiries/${selectedQuote._id}/status`,
        { status: selectedQuote.status, notes: adminNotes },
        authHeaders
      );
      if (res.data.success) {
        setQuotes((prev) =>
          prev.map((q) =>
            q._id === selectedQuote._id ? { ...q, adminNotes } : q
          )
        );
        setSelectedQuote((prev) => ({ ...prev, adminNotes }));
        showToast('Internal notes saved successfully.', 'success');
      }
    } catch (err) {
      showToast('Failed to save notes.', 'error');
    } finally {
      setSavingNotes(false);
    }
  };

  // Delete Quote
  const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote record? This cannot be undone.')) return;
    try {
      const res = await axios.delete(`/api/admin/enquiries/${quoteId}`, authHeaders);
      if (res.data.success) {
        setQuotes((prev) => prev.filter((q) => q._id !== quoteId));
        if (selectedQuote && selectedQuote._id === quoteId) {
          setSelectedQuote(null);
        }
        showToast('Quote record successfully deleted.', 'info');
      }
    } catch (err) {
      showToast('Failed to delete quote.', 'error');
    }
  };

  // Toggle Feedback Publish state
  const handleTogglePublishFeedback = async (feedbackId, currentPublishedState) => {
    const nextState = !currentPublishedState;
    try {
      const res = await axios.patch(
        `/api/admin/feedbacks/${feedbackId}/publish`,
        { isPublished: nextState },
        authHeaders
      );
      if (res.data.success) {
        setFeedbacks((prev) =>
          prev.map((fb) =>
            fb._id === feedbackId
              ? { ...fb, isPublished: nextState, status: nextState ? 'published' : 'pending' }
              : fb
          )
        );
        if (selectedFeedback && selectedFeedback._id === feedbackId) {
          setSelectedFeedback((prev) => ({ ...prev, isPublished: nextState, status: nextState ? 'published' : 'pending' }));
        }
        showToast(
          nextState
            ? 'Review approved and published to website!'
            : 'Review unpublished from website.',
          'success'
        );
      }
    } catch (err) {
      showToast('Failed to update publication status.', 'error');
    }
  };

  // Delete Feedback
  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm('Delete this client feedback submission?')) return;
    try {
      const res = await axios.delete(`/api/admin/feedbacks/${feedbackId}`, authHeaders);
      if (res.data.success) {
        setFeedbacks((prev) => prev.filter((f) => f._id !== feedbackId));
        if (selectedFeedback && selectedFeedback._id === feedbackId) {
          setSelectedFeedback(null);
        }
        showToast('Feedback record deleted.', 'info');
      }
    } catch (err) {
      showToast('Failed to delete feedback.', 'error');
    }
  };

  // Filtered Quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesFilter = quoteStatusFilter === 'all' || q.status === quoteStatusFilter;
    if (!matchesFilter) return false;
    if (!quoteSearch.trim()) return true;
    const s = quoteSearch.toLowerCase();
    return (
      (q.name && q.name.toLowerCase().includes(s)) ||
      (q.companyName && q.companyName.toLowerCase().includes(s)) ||
      (q.email && q.email.toLowerCase().includes(s)) ||
      (q.service && q.service.toLowerCase().includes(s)) ||
      (q.country && q.country.toLowerCase().includes(s))
    );
  });

  // Filtered Feedbacks (Structured exactly like quotes)
  const filteredFeedbacks = feedbacks.filter((fb) => {
    const isPub = Boolean(fb.isPublished);
    if (feedbackStatusFilter === 'pending' && isPub) return false;
    if (feedbackStatusFilter === 'published' && !isPub) return false;
    if (!feedbackSearch.trim()) return true;
    const s = feedbackSearch.toLowerCase();
    return (
      (fb.name && fb.name.toLowerCase().includes(s)) ||
      (fb.clientType && fb.clientType.toLowerCase().includes(s)) ||
      (fb.serviceType && fb.serviceType.toLowerCase().includes(s)) ||
      (fb.quote && fb.quote.toLowerCase().includes(s)) ||
      (fb.region && fb.region.toLowerCase().includes(s))
    );
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New Lead':
        return 'bg-blue-50 text-[#0047AB] border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Quote Sent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'In Discussion':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Closed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#0047AB] selection:text-white">
      
      {/* ----------------- Top Header Navbar ----------------- */}
      {/* Requirement 1: Logo on Left side; Requirement 4: System Controls in navbar */}
      <header className="bg-white/95 border-b border-slate-200 sticky top-0 z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          
          {/* Left Side: 3-line Menu Button + Logo (PNG format, NO box) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Three lines menu button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              title="Open navigation menu"
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-all cursor-pointer border border-slate-200 active:scale-95 shrink-0"
            >
              <Menu className="w-5 h-5 text-[#0047AB]" />
            </button>

            {/* Logo on the left side - transparent PNG, NO box */}
            <div 
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => handleTabSwitch('overview')}
              title="Data Galactic Admin"
            >
              <img
                src="/dg-logo.png"
                alt="Data Galactic"
                className="h-9 sm:h-11 w-auto object-contain transition-transform hover:scale-102"
              />
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0047AB] border border-blue-200">
                Admin Console
              </span>
            </div>
          </div>

          {/* Right Side: System Controls in the Navbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Auto-Sync Indicator & Toggle */}
            <div
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              title={autoRefreshEnabled ? 'Live Auto-Sync: Active (5s)' : 'Auto-Sync Paused (click to resume)'}
              className={`flex items-center gap-2 py-1.5 px-2.5 sm:px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                autoRefreshEnabled
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefreshEnabled ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
              <span className="hidden sm:inline">
                {autoRefreshEnabled ? 'Live Sync: ON (5s)' : 'Sync Paused'}
              </span>
            </div>

            {/* Manual Refresh Button */}
            <button
              type="button"
              onClick={() => fetchData(true)}
              disabled={refreshing}
              title="Refresh data now"
              className="py-1.5 px-2.5 sm:px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#0047AB] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#0047AB] ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* View Public Website Link */}
            {onBackToSite && (
              <button
                type="button"
                onClick={onBackToSite}
                title="View public website"
                className="hidden md:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-[#0047AB] text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>View Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Admin Logout Button */}
            <button
              type="button"
              onClick={onLogout}
              title="Sign out"
              className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* ----------------- Slide-Over Sidebar Drawer (Accessed via 3-line Menu) ----------------- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          {/* Sidebar Drawer */}
          <aside className="relative w-80 max-w-[85vw] bg-white border-r border-slate-200 shadow-2xl h-full flex flex-col p-6 z-10 animate-in slide-in-from-left duration-200">
            
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <img
                src="/dg-logo.png"
                alt="Data Galactic"
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="py-6 space-y-2 flex-grow overflow-y-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Operations Menu
              </span>

              {/* Tab 1: Dashboard (Overview & Analytics) */}
              <button
                type="button"
                onClick={() => handleTabSwitch('overview')}
                className={`w-full text-left py-3 px-3.5 rounded-xl font-semibold text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-blue-50 text-[#0047AB] border border-blue-200/80 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-[#0047AB]" />
                  <span>Dashboard &amp; Overview</span>
                </div>
              </button>

              {/* Tab 2: Project Submissions & Quotes */}
              <button
                type="button"
                onClick={() => handleTabSwitch('quotes')}
                className={`w-full text-left py-3 px-3.5 rounded-xl font-semibold text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'quotes'
                    ? 'bg-blue-50 text-[#0047AB] border border-blue-200/80 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4 text-[#0047AB]" />
                  <span>Project Submissions &amp; Quotes</span>
                </div>
                {stats?.quotes?.newLeads > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#0047AB] text-white font-bold">
                    {stats.quotes.newLeads}
                  </span>
                )}
              </button>

              {/* Tab 3: Customer Feedback */}
              <button
                type="button"
                onClick={() => handleTabSwitch('feedback')}
                className={`w-full text-left py-3 px-3.5 rounded-xl font-semibold text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'feedback'
                    ? 'bg-blue-50 text-[#0047AB] border border-blue-200/80 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#0047AB]" />
                  <span>Customer Feedback</span>
                </div>
                {stats?.feedback?.pending > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                    {stats.feedback.pending}
                  </span>
                )}
              </button>

              {/* Quick Website Navigation */}
              {onBackToSite && (
                <div className="pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onBackToSite}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700 hover:text-[#0047AB] hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <span>View Public Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom: Admin User & Sign Out */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0047AB]">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {adminUser?.email || 'admin@datagalactic.in'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Administrator</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="w-full py-2.5 px-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 flex items-center justify-center gap-2 font-semibold text-xs transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </aside>
        </div>
      )}

      {/* ----------------- Floating Live Toast ----------------- */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="bg-white border border-blue-200 shadow-xl rounded-2xl p-4 flex items-center gap-3 max-w-md">
            <Sparkles className="w-5 h-5 text-[#0047AB] shrink-0 animate-bounce" />
            <p className="text-xs sm:text-sm text-slate-700 font-semibold">{liveToast.message}</p>
            <button
              onClick={() => setLiveToast(null)}
              className="text-slate-400 hover:text-slate-600 ml-auto cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- Main Dashboard Content ----------------- */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 w-full">
        
        {/* Section Header with Quick Tab Switches */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {activeTab === 'overview' && 'Dashboard Overview & Analytics'}
              {activeTab === 'quotes' && 'Project Submissions & Quotes'}
              {activeTab === 'feedback' && 'Customer Feedback & Reviews'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick tab switcher pills */}
            <div className="inline-flex rounded-xl bg-slate-200/70 p-1 border border-slate-200">
              <button
                onClick={() => handleTabSwitch('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-[#0047AB] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleTabSwitch('quotes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'quotes'
                    ? 'bg-white text-[#0047AB] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quotes ({quotes.length})
              </button>
              <button
                onClick={() => handleTabSwitch('feedback')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'feedback'
                    ? 'bg-white text-[#0047AB] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Feedback ({feedbacks.length})
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW / DASHBOARD (Starting view as requested)       */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Total Quotes */}
              <div
                onClick={() => handleTabSwitch('quotes')}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0047AB]/50 hover:shadow-md transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between text-slate-500 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Total Quotes &amp; Bookings</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-[#0047AB] group-hover:scale-105 transition-transform">
                    <Inbox className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
                  {stats?.quotes?.total ?? quotes.length}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0047AB] font-bold">
                    {stats?.quotes?.newLeads ?? 0} New
                  </span>
                  <span>• {stats?.quotes?.underReview ?? 0} In Review</span>
                </div>
              </div>

              {/* Card 2: Closed / Won */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Completed / Closed</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
                  {stats?.quotes?.closed ?? 0}
                </div>
                <p className="mt-3 text-xs text-slate-500 font-medium">
                  {stats?.quotes?.quoteSent ?? 0} proposals sent to clients
                </p>
              </div>

              {/* Card 3: Feedback Pending Approval */}
              <div
                onClick={() => { handleTabSwitch('feedback'); setFeedbackStatusFilter('pending'); }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between text-slate-500 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Feedback Pending Review</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
                  {stats?.feedback?.pending ?? 0}
                </div>
                <p className="mt-3 text-xs text-amber-600 font-semibold">
                  {stats?.feedback?.pending > 0 ? 'Action required: Review & publish' : 'All reviews reviewed'}
                </p>
              </div>

              {/* Card 4: Published Testimonials */}
              <div
                onClick={() => { handleTabSwitch('feedback'); setFeedbackStatusFilter('published'); }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0047AB]/50 hover:shadow-md transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between text-slate-500 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Live on Website</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-[#0047AB] group-hover:scale-105 transition-transform">
                    <Star className="w-5 h-5 fill-[#0047AB]/30" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
                  {stats?.feedback?.published ?? 0}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Visible in client testimonials scroller
                </p>
              </div>

            </div>

            {/* Quick Action Navigation Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div
                onClick={() => handleTabSwitch('quotes')}
                className="p-6 rounded-2xl bg-white border-2 border-blue-200 hover:border-[#0047AB] flex items-center justify-between cursor-pointer group shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0047AB] group-hover:scale-105 transition-transform">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
                      1. Project Submissions &amp; Quotes
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Review incoming client lead specifications, estimated volume &amp; requirements
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0047AB] group-hover:translate-x-1 transition-all" />
              </div>

              <div
                onClick={() => handleTabSwitch('feedback')}
                className="p-6 rounded-2xl bg-white border-2 border-blue-200 hover:border-[#0047AB] flex items-center justify-between cursor-pointer group shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0047AB] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
                      2. Customer Feedback &amp; Publishing
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Inspect client testimonials in full table format and publish live
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0047AB] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Split Panel: Recent Leads vs Feedback Awaiting Approval */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Latest Quotes Preview */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-[#0047AB]" />
                    <span>Latest Quote Submissions</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-xs text-[#0047AB] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all ({quotes.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {quotes.slice(0, 5).map((q) => (
                    <div
                      key={q._id}
                      onClick={() => { setSelectedQuote(q); setAdminNotes(q.adminNotes || ''); }}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#0047AB]/50 hover:bg-blue-50/20 transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm truncate">{q.companyName || q.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(q.status)}`}>
                            {q.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{q.service} • {q.name}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap font-mono">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}

                  {quotes.length === 0 && (
                    <p className="text-center py-8 text-xs text-slate-400">No quotes received yet.</p>
                  )}
                </div>
              </div>

              {/* Feedbacks Pending Approval Preview */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Customer Reviews Awaiting Approval</span>
                  </h3>
                  <button
                    onClick={() => { setActiveTab('feedback'); setFeedbackStatusFilter('pending'); }}
                    className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage all</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {feedbacks.filter(f => !f.isPublished).slice(0, 4).map((fb) => (
                    <div
                      key={fb._id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{fb.name}</span>
                          <span className="text-xs text-slate-500 font-normal">({fb.clientType})</span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(fb.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 italic">"{fb.quote}"</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500">{fb.serviceType}</span>
                        <button
                          onClick={() => handleTogglePublishFeedback(fb._id, false)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0047AB] hover:bg-[#0047AB] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Publish to Website
                        </button>
                      </div>
                    </div>
                  ))}

                  {feedbacks.filter(f => !f.isPublished).length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-400 flex flex-col items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                      <span>All client feedback submissions have been reviewed and published.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PROJECT SUBMISSIONS & QUOTES                            */}
        {/* ============================================================== */}
        {activeTab === 'quotes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Search and Filters Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between shadow-xs">
              
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder="Search by company, client name, email, or service..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0047AB] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'New Lead', 'Under Review', 'Quote Sent', 'In Discussion', 'Closed'].map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => setQuoteStatusFilter(statusKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      quoteStatusFilter === statusKey
                        ? 'bg-[#0047AB] text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {statusKey === 'all' ? `All (${quotes.length})` : statusKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Quotes Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Client &amp; Company</th>
                      <th className="py-3.5 px-4 font-bold">Service &amp; Project</th>
                      <th className="py-3.5 px-4 font-bold">Volume</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold">Attachment</th>
                      <th className="py-3.5 px-4 font-bold">Date</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredQuotes.map((q) => (
                      <tr key={q._id} className="hover:bg-blue-50/30 transition-colors">
                        
                        {/* Client & Company */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm">{q.companyName || 'Not specified'}</div>
                          <div className="text-slate-600 text-xs mt-0.5">{q.name}</div>
                          <div className="text-[11px] text-[#0047AB] font-mono mt-0.5">{q.email}</div>
                          {q.country && (
                            <span className="inline-block mt-1 text-[10px] text-slate-500 font-medium">
                              📍 {q.country}
                            </span>
                          )}
                        </td>

                        {/* Service & Type */}
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-800">{q.service}</span>
                          <div className="text-[11px] text-slate-500 mt-0.5">{q.projectType}</div>
                        </td>

                        {/* Volume */}
                        <td className="py-4 px-4 font-mono text-xs text-slate-700">
                          {q.estimatedVolume || '—'}
                        </td>

                        {/* Status Select */}
                        <td className="py-4 px-4">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${getStatusBadgeClass(
                              q.status
                            )} bg-white`}
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        {/* File Attachment */}
                        <td className="py-4 px-4">
                          {q.file && q.file.storedName ? (
                            <a
                              href={`${axios.defaults.baseURL || ''}/api/admin/download/${encodeURIComponent(q.file.storedName)}?token=${encodeURIComponent(token)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0047AB] border border-blue-200 hover:bg-blue-100 text-xs font-semibold transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="max-w-[100px] truncate">{q.file.originalName || 'Download'}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs font-mono">—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-xs text-slate-600 font-mono whitespace-nowrap">
                          {new Date(q.createdAt).toLocaleDateString()}<br />
                          <span className="text-[10px] text-slate-400">
                            {new Date(q.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => { setSelectedQuote(q); setAdminNotes(q.adminNotes || ''); }}
                              title="View full project details"
                              className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB]/40 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuote(q._id)}
                              title="Delete record"
                              className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 hover:border-red-300 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}

                    {filteredQuotes.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                          No quotes match the filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CUSTOMER FEEDBACK (Structured exactly like Quotes)      */}
        {/* ============================================================== */}
        {activeTab === 'feedback' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Search and Filters Bar (Identical layout to Quotes) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between shadow-xs">
              
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={feedbackSearch}
                  onChange={(e) => setFeedbackSearch(e.target.value)}
                  placeholder="Search by customer name, client type, service, or review text..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0047AB] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: 'all', label: `All (${feedbacks.length})` },
                  { key: 'pending', label: `Pending Review (${feedbacks.filter(f => !f.isPublished).length})` },
                  { key: 'published', label: `Published (${feedbacks.filter(f => f.isPublished).length})` }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFeedbackStatusFilter(key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      feedbackStatusFilter === key
                        ? key === 'pending'
                          ? 'bg-amber-500 text-white shadow-xs font-bold'
                          : key === 'published'
                          ? 'bg-emerald-600 text-white shadow-xs font-bold'
                          : 'bg-[#0047AB] text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Feedback Table (Identical format to Quotes Table) */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Customer &amp; Client</th>
                      <th className="py-3.5 px-4 font-bold">Rating &amp; Service</th>
                      <th className="py-3.5 px-4 font-bold">Review Testimonial</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold">Date</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredFeedbacks.map((fb) => (
                      <tr key={fb._id} className="hover:bg-blue-50/30 transition-colors">
                        
                        {/* Customer & Client */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm">{fb.name}</div>
                          <div className="text-xs text-[#0047AB] font-medium mt-0.5">{fb.clientType || 'Corporate Client'}</div>
                          {fb.region && (
                            <span className="inline-block mt-1 text-[10px] text-slate-500 font-medium">
                              📍 {fb.region}
                            </span>
                          )}
                        </td>

                        {/* Rating & Service */}
                        <td className="py-4 px-4">
                          <div className="flex text-amber-400 mb-1">
                            {[...Array(fb.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-slate-700">
                            {fb.serviceType || 'B2B Data'}
                          </span>
                        </td>

                        {/* Review Quote snippet */}
                        <td className="py-4 px-4 max-w-xs md:max-w-md">
                          <p className="text-xs text-slate-600 italic line-clamp-2 leading-relaxed">
                            "{fb.quote}"
                          </p>
                        </td>

                        {/* Status (Inline Publish / Pending dropdown or toggle) */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={fb.isPublished ? 'published' : 'pending'}
                            onChange={() => handleTogglePublishFeedback(fb._id, fb.isPublished)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${
                              fb.isPublished
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="published">● Published (Live)</option>
                            <option value="pending">⏳ Pending Review</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-xs text-slate-600 font-mono whitespace-nowrap">
                          {new Date(fb.createdAt || Date.now()).toLocaleDateString()}<br />
                          <span className="text-[10px] text-slate-400">
                            {new Date(fb.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Actions (View Details, Toggle Publish, Delete) */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* View Details Eye */}
                            <button
                              onClick={() => setSelectedFeedback(fb)}
                              title="View full review details"
                              className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB]/40 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Quick Publish / Unpublish Button */}
                            <button
                              onClick={() => handleTogglePublishFeedback(fb._id, fb.isPublished)}
                              title={fb.isPublished ? 'Unpublish from website' : 'Publish to website'}
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                fb.isPublished
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-blue-50 text-[#0047AB] border-blue-200 hover:bg-[#0047AB] hover:text-white'
                              }`}
                            >
                              {fb.isPublished ? <Check className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                            </button>

                            {/* Delete Trash */}
                            <button
                              onClick={() => handleDeleteFeedback(fb._id)}
                              title="Delete review"
                              className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 hover:border-red-300 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}

                    {filteredFeedbacks.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                          No feedback reviews match the filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ----------------- Quote Details Modal ----------------- */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-mono text-slate-400 font-bold">Project Lead Specifications</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedQuote.companyName || selectedQuote.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Contact Name:</span>
                <span className="font-bold text-slate-900">{selectedQuote.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Business Email:</span>
                <a href={`mailto:${selectedQuote.email}`} className="font-bold text-[#0047AB] hover:underline">
                  {selectedQuote.email}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Phone / WhatsApp:</span>
                <span className="font-bold text-slate-900">{selectedQuote.phone || 'Not provided'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Country / Territory:</span>
                <span className="font-bold text-slate-900">{selectedQuote.country}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Service Required:</span>
                <span className="font-bold text-slate-900">{selectedQuote.service}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Project Engagement Type:</span>
                <span className="font-bold text-slate-900">{selectedQuote.projectType}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                Project Workflow Details / Requirements
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {selectedQuote.description}
              </div>
            </div>

            {/* File Attachment */}
            {selectedQuote.file && selectedQuote.file.storedName && (
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#0047AB]" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {selectedQuote.file.originalName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {selectedQuote.file.size ? `${(selectedQuote.file.size / 1024).toFixed(1)} KB` : 'Attached Document'}
                    </span>
                  </div>
                </div>
                <a
                  href={`${axios.defaults.baseURL || ''}/api/admin/download/${encodeURIComponent(selectedQuote.file.storedName)}?token=${encodeURIComponent(token)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#0047AB] text-white font-bold text-xs hover:bg-[#003893] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            )}

            {/* Internal Admin Notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  Internal Operations Notes
                </h4>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="text-xs text-[#0047AB] hover:underline flex items-center gap-1 font-bold cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingNotes ? 'Saving...' : 'Save Notes'}</span>
                </button>
              </div>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add confidential admin notes, quotation cost estimate, follow-up dates..."
                rows={3}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0047AB] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Footer Status Change */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Current Status:</span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleUpdateQuoteStatus(selectedQuote._id, e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${getStatusBadgeClass(
                    selectedQuote.status
                  )} bg-white`}
                >
                  <option value="New Lead">New Lead</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Close Dialog
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- Customer Feedback Details Modal ----------------- */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-mono text-slate-400 font-bold">Client Review Specifications</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedFeedback.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feedback Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Customer Name:</span>
                <span className="font-bold text-slate-900">{selectedFeedback.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Client Type:</span>
                <span className="font-bold text-[#0047AB]">{selectedFeedback.clientType || 'Corporate Client'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Service Category:</span>
                <span className="font-bold text-slate-900">{selectedFeedback.serviceType || 'B2B Data Support'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Region / Country:</span>
                <span className="font-bold text-slate-900">{selectedFeedback.region || 'Global'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Rating:</span>
                <div className="flex text-amber-400 mt-0.5">
                  {[...Array(selectedFeedback.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block mb-1 font-medium">Current Status:</span>
                <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                  selectedFeedback.isPublished
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {selectedFeedback.isPublished ? 'Published Live on Site' : 'Pending Review'}
                </span>
              </div>
            </div>

            {/* Full Review Testimonial */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                Full Testimonial Content
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 italic leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                "{selectedFeedback.quote}"
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleTogglePublishFeedback(selectedFeedback._id, selectedFeedback.isPublished)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  selectedFeedback.isPublished
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    : 'bg-[#0047AB] text-white hover:bg-[#003893]'
                }`}
              >
                {selectedFeedback.isPublished ? (
                  <>
                    <XCircle className="w-4 h-4 text-amber-600" />
                    <span>Unpublish from Website</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Publish Live to Website</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteFeedback(selectedFeedback._id)}
                  className="px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold cursor-pointer"
                >
                  Delete Review
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Close Dialog
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
