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
  Save
} from 'lucide-react';

const AdminDashboard = ({ token, adminUser, initialTab = 'quotes', onLogout, onBackToSite }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'quotes'); // 'quotes' | 'feedback' | 'overview'
  
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    window.location.hash = `#admin/${tab}`;
  };

  // Data state
  const [stats, setStats] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date());

  // Search & Filter state
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('all');
  const [feedbackFilter, setFeedbackFilter] = useState('all'); // 'all' | 'pending' | 'published'

  // Modals & Active Selections
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

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

  // Real-Time Server-Sent Events (SSE) Stream
  useEffect(() => {
    if (!token) return;

    let eventSource;
    try {
      eventSource = new EventSource(`/api/admin/events?token=${encodeURIComponent(token)}`);

      eventSource.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === 'enquiry_created') {
            showToast(`🔔 New Quote Request received from ${payload.data.companyName || payload.data.name}!`, 'quote');
            fetchData(false);
          } else if (payload.type === 'feedback_created') {
            showToast(`⭐ New Client Feedback received from ${payload.data.name}!`, 'feedback');
            fetchData(false);
          } else if (payload.type === 'feedback_updated') {
            fetchData(false);
          }
        } catch (parseErr) {
          console.debug('SSE parse message', parseErr);
        }
      };

      eventSource.onerror = () => {
        // SSE reconnects automatically, fallback interval is also running
        eventSource.close();
      };
    } catch (e) {
      console.warn('SSE connection initialization skipped', e);
    }

    return () => {
      if (eventSource) eventSource.close();
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [token]);

  // Quote Status Update
  const handleUpdateQuoteStatus = async (quoteId, newStatus) => {
    try {
      const response = await axios.patch(
        `/api/admin/enquiries/${quoteId}/status`,
        { status: newStatus },
        authHeaders
      );
      if (response.data.success) {
        setQuotes(prev =>
          prev.map(q => (q._id === quoteId ? { ...q, status: newStatus } : q))
        );
        if (selectedQuote && selectedQuote._id === quoteId) {
          setSelectedQuote(prev => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus}"`, 'success');
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  // Save admin internal notes
  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setSavingNotes(true);
    try {
      const response = await axios.patch(
        `/api/admin/enquiries/${selectedQuote._id}/status`,
        { status: selectedQuote.status, notes: adminNotes },
        authHeaders
      );
      if (response.data.success) {
        setQuotes(prev =>
          prev.map(q => (q._id === selectedQuote._id ? { ...q, adminNotes } : q))
        );
        setSelectedQuote(prev => ({ ...prev, adminNotes }));
        showToast('Internal notes saved successfully', 'success');
      }
    } catch (err) {
      showToast('Failed to save notes', 'error');
    } finally {
      setSavingNotes(false);
    }
  };

  // Delete Quote
  const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote record? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await axios.delete(`/api/admin/enquiries/${quoteId}`, authHeaders);
      if (res.data.success) {
        setQuotes(prev => prev.filter(q => q._id !== quoteId));
        if (selectedQuote && selectedQuote._id === quoteId) {
          setSelectedQuote(null);
        }
        showToast('Quote record deleted.', 'info');
      }
    } catch (err) {
      showToast('Failed to delete quote', 'error');
    }
  };

  // Toggle Publish Feedback
  const handleTogglePublishFeedback = async (feedbackId, currentPublishedState) => {
    try {
      const targetState = !currentPublishedState;
      const res = await axios.patch(
        `/api/admin/feedbacks/${feedbackId}/publish`,
        { isPublished: targetState },
        authHeaders
      );
      if (res.data.success) {
        setFeedbacks(prev =>
          prev.map(f =>
            f._id === feedbackId
              ? { ...f, isPublished: targetState, status: targetState ? 'published' : 'pending' }
              : f
          )
        );
        showToast(
          targetState
            ? '✓ Feedback published! It is now live on the website.'
            : 'Feedback unpublished from website.',
          'success'
        );
      }
    } catch (err) {
      showToast('Failed to toggle publish state', 'error');
    }
  };

  // Delete Feedback
  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm('Delete this feedback review?')) return;
    try {
      const res = await axios.delete(`/api/admin/feedbacks/${feedbackId}`, authHeaders);
      if (res.data.success) {
        setFeedbacks(prev => prev.filter(f => f._id !== feedbackId));
        showToast('Feedback removed.', 'info');
      }
    } catch (err) {
      showToast('Failed to delete feedback', 'error');
    }
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter(quote => {
    const matchesStatus = quoteStatusFilter === 'all' || quote.status === quoteStatusFilter;
    const query = quoteSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (quote.name && quote.name.toLowerCase().includes(query)) ||
      (quote.companyName && quote.companyName.toLowerCase().includes(query)) ||
      (quote.email && quote.email.toLowerCase().includes(query)) ||
      (quote.service && quote.service.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  // Filtered feedbacks
  const filteredFeedbacks = feedbacks.filter(fb => {
    if (feedbackFilter === 'pending') return !fb.isPublished || fb.status === 'pending';
    if (feedbackFilter === 'published') return fb.isPublished;
    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New Lead':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'Under Review':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Quote Sent':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'In Discussion':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Closed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#090d13] text-slate-100 flex flex-col font-sans selection:bg-[#38bdf8] selection:text-white">
      
      {/* ----------------- Top Header ----------------- */}
      <header className="bg-[#161b22]/90 border-b border-[#30363d] sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark-white.png"
              alt="DataGalactic Logo"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]"
            />
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-['Rajdhani']">
                Data<span className="text-[#38bdf8]">Galactic</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
                Admin Console
              </span>
            </div>
          </div>

          {/* Sync Status & Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Auto-Refresh Pulse Indicator */}
            <div
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              title={autoRefreshEnabled ? 'Click to pause auto-refresh' : 'Click to enable live auto-refresh'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs cursor-pointer transition-all ${
                autoRefreshEnabled
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefreshEnabled ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
              <span className="font-semibold text-[11px] uppercase tracking-wider">
                {autoRefreshEnabled ? 'Live Auto-Sync: ON (5s)' : 'Auto-Sync Paused'}
              </span>
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              title="Refresh now"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-slate-300 hover:text-white hover:border-[#38bdf8]/40 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#38bdf8] ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Back to site */}
            {onBackToSite && (
              <button
                onClick={onBackToSite}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#38bdf8] transition-colors py-1.5 px-2.5 rounded-lg border border-[#30363d] hover:border-[#38bdf8]/40 bg-[#161b22] cursor-pointer"
              >
                <span>View Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Logout */}
            <button
              onClick={onLogout}
              title="Sign out"
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-1.5 px-2.5 rounded-lg border border-red-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 sm:gap-8 text-sm border-t border-[#30363d]/60">
          <button
            onClick={() => handleTabSwitch('quotes')}
            className={`py-3.5 font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer relative ${
              activeTab === 'quotes'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>📁 Project Submissions &amp; Quotes</span>
            {stats?.quotes?.newLeads > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-500 text-white font-bold animate-pulse">
                {stats.quotes.newLeads} New
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabSwitch('feedback')}
            className={`py-3.5 font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer relative ${
              activeTab === 'feedback'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>💬 Customer Feedback &amp; Publishing</span>
            {stats?.feedback?.pending > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-black font-bold">
                {stats.feedback.pending} Pending
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabSwitch('overview')}
            className={`py-3.5 font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>📊 Overview &amp; Analytics</span>
          </button>
        </div>
      </header>

      {/* ----------------- Floating Live Toast ----------------- */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#1c2128] border border-[#38bdf8]/50 shadow-2xl shadow-[#38bdf8]/20 rounded-xl p-4 flex items-center gap-3 max-w-md backdrop-blur-xl">
            <Sparkles className="w-5 h-5 text-[#38bdf8] shrink-0 animate-bounce" />
            <p className="text-xs sm:text-sm text-slate-200 font-medium">{liveToast.message}</p>
            <button
              onClick={() => setLiveToast(null)}
              className="text-slate-500 hover:text-slate-300 ml-auto cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- Main Content ----------------- */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Total Quotes */}
              <div
                onClick={() => handleTabSwitch('quotes')}
                className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#38bdf8]/50 transition-all cursor-pointer group shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Total Quotes &amp; Bookings</span>
                  <Inbox className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Rajdhani']">
                  {stats?.quotes?.total ?? quotes.length}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 font-semibold">
                    {stats?.quotes?.newLeads ?? 0} New
                  </span>
                  <span>• {stats?.quotes?.underReview ?? 0} In Review</span>
                </div>
              </div>

              {/* Card 2: Closed / Won */}
              <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Completed / Closed</span>
                  <CheckCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Rajdhani']">
                  {stats?.quotes?.closed ?? 0}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  {stats?.quotes?.quoteSent ?? 0} proposals sent to clients
                </p>
              </div>

              {/* Card 3: Feedback Pending Approval */}
              <div
                onClick={() => { handleTabSwitch('feedback'); setFeedbackFilter('pending'); }}
                className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Feedback Pending Review</span>
                  <Clock className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Rajdhani']">
                  {stats?.feedback?.pending ?? 0}
                </div>
                <p className="mt-3 text-xs text-amber-400 font-medium">
                  {stats?.feedback?.pending > 0 ? 'Action required: Review & publish' : 'All reviews reviewed'}
                </p>
              </div>

              {/* Card 4: Published Testimonials */}
              <div
                onClick={() => { handleTabSwitch('feedback'); setFeedbackFilter('published'); }}
                className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#38bdf8]/50 transition-all cursor-pointer group shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider">Live on Website</span>
                  <Star className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Rajdhani']">
                  {stats?.feedback?.published ?? 0}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Visible in client testimonials scroller
                </p>
              </div>

            </div>

            {/* Direct 2 Quick Access Action Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div
                onClick={() => handleTabSwitch('quotes')}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#1c2430] to-[#161b22] border-2 border-sky-500/40 hover:border-sky-400 flex items-center justify-between cursor-pointer group shadow-xl hover:shadow-sky-500/10 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                      1. Project Submissions &amp; Quotes
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      View all customer project requirements, volumes &amp; uploaded files
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-semibold text-sky-400 gap-1 shrink-0">
                  <span>Open Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => handleTabSwitch('feedback')}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#1c2430] to-[#161b22] border-2 border-amber-500/40 hover:border-amber-400 flex items-center justify-between cursor-pointer group shadow-xl hover:shadow-amber-500/10 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      2. Customer Feedback &amp; Publishing
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Review customer feedback and publish directly to user testimonials
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-semibold text-amber-400 gap-1 shrink-0">
                  <span>Open Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Quotes */}
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-[#38bdf8]" />
                    <span>Latest Quote Submissions</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
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
                      className="p-3.5 rounded-xl bg-[#0d1117] border border-[#21262d] hover:border-[#38bdf8]/40 transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm truncate">{q.companyName || q.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadgeClass(q.status)}`}>
                            {q.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{q.service} • {q.name}</p>
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap font-mono">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}

                  {quotes.length === 0 && (
                    <p className="text-center py-8 text-xs text-slate-500">No quotes received yet.</p>
                  )}
                </div>
              </div>

              {/* Feedbacks Pending Approval */}
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>Client Reviews Awaiting Approval</span>
                  </h3>
                  <button
                    onClick={() => { setActiveTab('feedback'); setFeedbackFilter('pending'); }}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage all</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {feedbacks.filter(f => !f.isPublished).slice(0, 4).map((fb) => (
                    <div
                      key={fb._id}
                      className="p-3.5 rounded-xl bg-[#0d1117] border border-[#21262d] flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{fb.name}</span>
                          <span className="text-xs text-slate-400 font-normal">({fb.clientType})</span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(fb.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 italic">"{fb.quote}"</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500">{fb.serviceType}</span>
                        <button
                          onClick={() => handleTogglePublishFeedback(fb._id, false)}
                          className="px-2.5 py-1 rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#7dd3fc] hover:bg-[#38bdf8] hover:text-black font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Publish to Website
                        </button>
                      </div>
                    </div>
                  ))}

                  {feedbacks.filter(f => !f.isPublished).length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-500 flex flex-col items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                      <span>All client feedback submissions have been reviewed and published.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: QUOTES & BOOKINGS */}
        {activeTab === 'quotes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Search and Filters Bar */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between shadow-lg">
              
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder="Search by company, client name, email, or service..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'New Lead', 'Under Review', 'Quote Sent', 'In Discussion', 'Closed'].map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => setQuoteStatusFilter(statusKey)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      quoteStatusFilter === statusKey
                        ? 'bg-[#38bdf8] text-slate-950 font-bold'
                        : 'bg-[#0d1117] text-slate-400 border border-[#30363d] hover:text-white'
                    }`}
                  >
                    {statusKey === 'all' ? `All (${quotes.length})` : statusKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Quotes Table */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-[#0d1117] text-[11px] uppercase tracking-wider text-slate-400 border-b border-[#30363d]">
                    <tr>
                      <th className="py-3.5 px-4">Client &amp; Company</th>
                      <th className="py-3.5 px-4">Service &amp; Project</th>
                      <th className="py-3.5 px-4">Volume</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Attachment</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363d]/60 font-sans">
                    {filteredQuotes.map((q) => (
                      <tr key={q._id} className="hover:bg-[#1f242c]/50 transition-colors">
                        
                        {/* Client & Company */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-sm">{q.companyName || 'Not specified'}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{q.name}</div>
                          <div className="text-[11px] text-[#38bdf8] font-mono mt-0.5">{q.email}</div>
                          {q.country && (
                            <span className="inline-block mt-1 text-[10px] text-slate-500">
                              📍 {q.country}
                            </span>
                          )}
                        </td>

                        {/* Service & Type */}
                        <td className="py-4 px-4">
                          <span className="font-medium text-slate-200">{q.service}</span>
                          <div className="text-[11px] text-slate-400 mt-0.5">{q.projectType}</div>
                        </td>

                        {/* Volume */}
                        <td className="py-4 px-4 font-mono text-xs text-slate-300">
                          {q.estimatedVolume || '—'}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none ${getStatusBadgeClass(
                              q.status
                            )} bg-[#0d1117]`}
                          >
                            <option value="New Lead" className="bg-[#161b22] text-sky-400">New Lead</option>
                            <option value="Under Review" className="bg-[#161b22] text-amber-400">Under Review</option>
                            <option value="Quote Sent" className="bg-[#161b22] text-purple-400">Quote Sent</option>
                            <option value="In Discussion" className="bg-[#161b22] text-indigo-400">In Discussion</option>
                            <option value="Closed" className="bg-[#161b22] text-emerald-400">Closed</option>
                          </select>
                        </td>

                        {/* File Attachment */}
                        <td className="py-4 px-4">
                          {q.file && q.file.storedName ? (
                            <a
                              href={`/api/admin/download/${encodeURIComponent(q.file.storedName)}?token=${encodeURIComponent(token)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 text-xs font-medium transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="max-w-[100px] truncate">{q.file.originalName || 'Download'}</span>
                            </a>
                          ) : (
                            <span className="text-slate-600 text-xs font-mono">—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-xs text-slate-400 font-mono whitespace-nowrap">
                          {new Date(q.createdAt).toLocaleDateString()}<br />
                          <span className="text-[10px] text-slate-500">
                            {new Date(q.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => { setSelectedQuote(q); setAdminNotes(q.adminNotes || ''); }}
                              title="View full project details"
                              className="p-1.5 rounded-lg bg-[#21262d] text-slate-300 hover:text-[#38bdf8] hover:border-[#38bdf8]/40 border border-[#30363d] transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuote(q._id)}
                              title="Delete record"
                              className="p-1.5 rounded-lg bg-[#21262d] text-slate-400 hover:text-red-400 hover:border-red-500/40 border border-[#30363d] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}

                    {filteredQuotes.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
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

        {/* TAB 3: CLIENT FEEDBACK & PUBLISHING */}
        {activeTab === 'feedback' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Filter bar */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
              <div>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Client Feedback Moderation &amp; Publishing
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Review submitted client reviews. When you click "Publish", the review instantly appears on the live website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFeedbackFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    feedbackFilter === 'all'
                      ? 'bg-[#38bdf8] text-slate-950 font-bold'
                      : 'bg-[#0d1117] text-slate-400 border border-[#30363d]'
                  }`}
                >
                  All ({feedbacks.length})
                </button>
                <button
                  onClick={() => setFeedbackFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    feedbackFilter === 'pending'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-[#0d1117] text-slate-400 border border-[#30363d]'
                  }`}
                >
                  Pending ({feedbacks.filter(f => !f.isPublished).length})
                </button>
                <button
                  onClick={() => setFeedbackFilter('published')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    feedbackFilter === 'published'
                      ? 'bg-emerald-400 text-slate-950 font-bold'
                      : 'bg-[#0d1117] text-slate-400 border border-[#30363d]'
                  }`}
                >
                  Published ({feedbacks.filter(f => f.isPublished).length})
                </button>
              </div>
            </div>

            {/* Feedback Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className={`p-6 rounded-2xl bg-[#161b22] border transition-all shadow-xl flex flex-col justify-between ${
                    fb.isPublished
                      ? 'border-emerald-500/30 hover:border-emerald-500/60'
                      : 'border-amber-500/30 hover:border-amber-500/60'
                  }`}
                >
                  <div>
                    {/* Header: Stars & Status */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(fb.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                          fb.isPublished
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {fb.isPublished ? '● Live on Site' : 'Pending Review'}
                      </span>
                    </div>

                    {/* Quote text */}
                    <p className="text-sm text-slate-200 italic leading-relaxed mb-5">
                      "{fb.quote}"
                    </p>

                    {/* Client info */}
                    <div className="pt-4 border-t border-[#30363d] space-y-1">
                      <div className="font-bold text-white text-sm">{fb.name}</div>
                      <div className="text-xs text-[#38bdf8]">{fb.clientType || 'Corporate Client'}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>📍 {fb.region || 'Global'}</span>
                        <span>{fb.serviceType || 'B2B Data'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-[#30363d] flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleTogglePublishFeedback(fb._id, fb.isPublished)}
                      className={`flex-grow py-2 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                        fb.isPublished
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-500 hover:to-teal-400'
                      }`}
                    >
                      {fb.isPublished ? (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Unpublish from Site</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Publish to Website</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteFeedback(fb._id)}
                      title="Delete feedback"
                      className="p-2 rounded-xl bg-[#21262d] text-slate-400 hover:text-red-400 border border-[#30363d] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}

              {filteredFeedbacks.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 text-sm">
                  No feedback records found.
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* ----------------- Quote Details Modal ----------------- */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#30363d]">
              <div>
                <span className="text-xs uppercase font-mono text-slate-500">Project Lead Specifications</span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedQuote.companyName || selectedQuote.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <span className="text-slate-500 block mb-1">Contact Name:</span>
                <span className="font-semibold text-white">{selectedQuote.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <span className="text-slate-500 block mb-1">Business Email:</span>
                <a href={`mailto:${selectedQuote.email}`} className="font-semibold text-[#38bdf8] hover:underline">
                  {selectedQuote.email}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <span className="text-slate-500 block mb-1">Phone / WhatsApp:</span>
                <span className="font-semibold text-white">{selectedQuote.phone || 'Not provided'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <span className="text-slate-500 block mb-1">Country / Territory:</span>
                <span className="font-semibold text-white">{selectedQuote.country}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <span className="text-slate-500 block mb-1">Service Required:</span>
                <span className="font-semibold text-white">{selectedQuote.service}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <span className="text-slate-500 block mb-1">Project Engagement Type:</span>
                <span className="font-semibold text-white">{selectedQuote.projectType}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Project Workflow Details / Requirements
              </h4>
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#21262d] text-sm text-slate-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {selectedQuote.description}
              </div>
            </div>

            {/* File Attachment */}
            {selectedQuote.file && selectedQuote.file.storedName && (
              <div className="p-4 rounded-xl bg-[#0d1117] border border-sky-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#38bdf8]" />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {selectedQuote.file.originalName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {selectedQuote.file.size ? `${(selectedQuote.file.size / 1024).toFixed(1)} KB` : 'Attached Document'}
                    </span>
                  </div>
                </div>
                <a
                  href={`/api/admin/download/${encodeURIComponent(selectedQuote.file.storedName)}?token=${encodeURIComponent(token)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#38bdf8] text-slate-950 font-bold text-xs hover:bg-[#7dd3fc] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            )}

            {/* Internal Admin Notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Internal Operations Notes
                </h4>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="text-xs text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-1 font-semibold cursor-pointer disabled:opacity-50"
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
                className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            {/* Footer Status Change */}
            <div className="pt-4 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Status:</span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleUpdateQuoteStatus(selectedQuote._id, e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${getStatusBadgeClass(
                    selectedQuote.status
                  )} bg-[#0d1117]`}
                >
                  <option value="New Lead" className="bg-[#161b22] text-sky-400">New Lead</option>
                  <option value="Under Review" className="bg-[#161b22] text-amber-400">Under Review</option>
                  <option value="Quote Sent" className="bg-[#161b22] text-purple-400">Quote Sent</option>
                  <option value="In Discussion" className="bg-[#161b22] text-indigo-400">In Discussion</option>
                  <option value="Closed" className="bg-[#161b22] text-emerald-400">Closed</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Close Dialog
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
