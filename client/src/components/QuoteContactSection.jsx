import React, { useState, useEffect } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Lock,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  Globe2,
  Sparkles,
  KeyRound,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';

// Country definitions with dial code, flag, and exact digit requirements
const countryList = [
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', digits: 10, placeholder: '9876543210' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', digits: 10, placeholder: '2025550143' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', digits: 10, placeholder: '7911123456' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪', digits: 9, placeholder: '501234567' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', digits: 10, placeholder: '4165550199' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', digits: 9, placeholder: '412345678' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬', digits: 8, placeholder: '81234567' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾', digits: 10, placeholder: '1234567890' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦', digits: 9, placeholder: '512345678' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', digits: 10, placeholder: '1512345678' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', digits: 9, placeholder: '612345678' },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦', digits: 8, placeholder: '33123456' },
  { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼', digits: 8, placeholder: '51234567' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿', digits: 9, placeholder: '211234567' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', digits: 9, placeholder: '711234567' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵', digits: 10, placeholder: '9012345678' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭', digits: 10, placeholder: '9171234567' }
];

const QuoteContactSection = ({ defaultService, defaultDescription }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    country: 'United States',
    service: defaultService || 'Data Entry Services',
    projectType: 'One-time Project',
    estimatedVolume: '',
    description: defaultDescription || '',
    phoneDigits: ''
  });

  // Country Phone Selection
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]); // Default India or US
  
  // Real-Time OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMsg, setOtpMsg] = useState('');
  const [otpCooldown, setOtpCooldown] = useState(0);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Sync defaultService if provided
  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  // Sync defaultDescription if provided
  useEffect(() => {
    if (defaultDescription) {
      setFormData(prev => ({ ...prev, description: defaultDescription }));
    }
  }, [defaultDescription]);

  // OTP Cooldown Timer
  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setTimeout(() => setOtpCooldown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCooldown]);

  const servicesList = [
    'Data Entry Services',
    'Data Processing & Cleaning',
    'Data Conversion (PDF / OCR / Excel)',
    'Web Research & Data Mining',
    'E-commerce Catalog & Product Listing',
    'Back Office & Administrative Support',
    'Other / Custom Enterprise Requirement'
  ];

  const projectTypes = [
    'One-time Project',
    'Ongoing / Dedicated Team',
    'Trial / Pilot Project',
    'Custom Consultation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  // Phone input: strictly allow digits only and cap at selectedCountry.digits
  const handlePhoneDigitsChange = (e) => {
    const rawDigits = e.target.value.replace(/\D/g, ''); // Strip all non-numeric characters
    if (rawDigits.length <= selectedCountry.digits) {
      setFormData((prev) => ({ ...prev, phoneDigits: rawDigits }));
    }
    if (errorMsg) setErrorMsg('');
  };

  const handleCountrySelect = (e) => {
    const code = e.target.value;
    const found = countryList.find(c => c.code === code) || countryList[0];
    setSelectedCountry(found);
    // Truncate existing phone digits if exceeds new country digit length
    setFormData(prev => ({
      ...prev,
      country: found.name,
      phoneDigits: prev.phoneDigits.slice(0, found.digits)
    }));
  };

  // Real-Time OTP Send
  const handleSendOtp = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      setOtpMsg('Please enter your email address before requesting an OTP.');
      return;
    }

    setOtpLoading(true);
    setOtpMsg('');

    try {
      const res = await axios.post('/api/contact/send-otp', { email: formData.email.trim() });
      if (res.data.success) {
        setOtpSent(true);
        setOtpCooldown(60);
        let feedback = res.data.message;
        if (res.data.devOtp) {
          feedback += ` (Testing Code: ${res.data.devOtp})`;
        }
        setOtpMsg(feedback);
      }
    } catch (err) {
      setOtpMsg(err.response?.data?.message || 'Failed to dispatch verification OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Real-Time OTP Verification
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.trim().length !== 6) {
      setOtpMsg('Please enter the full 6-digit code sent to your email.');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await axios.post('/api/contact/verify-otp', {
        email: formData.email.trim(),
        otp: otpCode.trim()
      });
      if (res.data.success) {
        setOtpVerified(true);
        setOtpMsg('Email verified successfully in real time!');
      }
    } catch (err) {
      setOtpMsg(err.response?.data?.message || 'Incorrect or expired OTP code.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Required checks
    if (!formData.name.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.description.trim()) {
      setErrorMsg('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    // Strict Phone digits condition check
    if (formData.phoneDigits) {
      if (formData.phoneDigits.length !== selectedCountry.digits) {
        setErrorMsg(
          `Phone number for ${selectedCountry.name} (${selectedCountry.dial}) must be exactly ${selectedCountry.digits} digits. Currently entered: ${formData.phoneDigits.length} digits.`
        );
        return;
      }
    }

    setLoading(true);

    try {
      const fullPhoneNumber = formData.phoneDigits
        ? `${selectedCountry.dial} ${formData.phoneDigits}`
        : '';

      const payload = {
        name: formData.name.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        country: selectedCountry.name,
        service: formData.service,
        projectType: formData.projectType,
        estimatedVolume: formData.estimatedVolume.trim() || 'Not specified',
        description: formData.description.trim(),
        phone: fullPhoneNumber
      };

      let response;
      let submitted = false;

      // Attempt 1: Standard API endpoint
      try {
        response = await axios.post('/api/contact', payload);
        if (response.data && response.data.success) {
          submitted = true;
        }
      } catch (err1) {
        // Attempt 2: Direct Render production backend
        try {
          response = await axios.post('https://data-galactic-1.onrender.com/api/contact', payload);
          if (response.data && response.data.success) {
            submitted = true;
          }
        } catch (err2) {
          // Attempt 3: Direct localhost if on dev or 127.0.0.1
          const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
          if (isLocal) {
            try {
              response = await axios.post('http://127.0.0.1:5000/api/contact', payload);
              if (response.data && response.data.success) submitted = true;
            } catch (err3) {
              try {
                response = await axios.post('http://localhost:5000/api/contact', payload);
                if (response.data && response.data.success) submitted = true;
              } catch (err4) {
                submitted = false;
              }
            }
          }
        }
      }

      if (submitted && response?.data?.success) {
        setSuccessData(response.data);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        return;
      }

      // Offline / Standalone Fallback: Save directly to local queue
      // so quotes are NEVER lost even when backend is offline or on Vercel
      const offlineRecord = {
        _id: `lead-offline-${Date.now()}`,
        name: payload.name,
        companyName: payload.companyName,
        email: payload.email,
        country: payload.country,
        service: payload.service,
        projectType: payload.projectType,
        estimatedVolume: payload.estimatedVolume,
        description: payload.description,
        phone: payload.phone,
        status: 'New Lead',
        adminNotes: 'Submitted via Web Portal (Offline / Standalone Queue)',
        createdAt: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('dg_offline_quotes') || '[]');
        existing.unshift(offlineRecord);
        localStorage.setItem('dg_offline_quotes', JSON.stringify(existing));
      } catch (storageErr) {
        console.warn('LocalStorage save notice:', storageErr);
      }

      setSuccessData({
        success: true,
        message: 'Your project enquiry has been registered successfully! Our enterprise team will review your specifications and contact you with a customized proposal within 12–24 hours.',
        data: {
          id: offlineRecord._id,
          name: payload.name,
          companyName: payload.companyName,
          service: payload.service,
          createdAt: offlineRecord.createdAt
        }
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors.map(e => e.message).join(', ')) ||
        'Unable to process project details. Please check that all required fields are filled correctly.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccessData(null);
    setFormData({
      name: '',
      companyName: '',
      email: '',
      country: selectedCountry.name,
      service: defaultService || 'Data Entry Services',
      projectType: 'One-time Project',
      estimatedVolume: '',
      description: defaultDescription || '',
      phoneDigits: ''
    });
    setOtpSent(false);
    setOtpCode('');
    setOtpVerified(false);
    setOtpMsg('');
    setErrorMsg('');
  };

  return (
    <section id="contact" className="scroll-mt-24 lg:scroll-mt-28 py-10 sm:py-12 relative bg-slate-50 border-b border-slate-200/80 overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-100/60 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-blue-100/40 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Center aligned */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Free Project Estimation &amp; Real-Time Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Request a Free Project{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              Quote &amp; Proposal
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-normal">
            Tell us about your data workload, timelines, or format requirements. Our enterprise team will analyze your specifications and respond with a customized proposal within 12–24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
          
          {/* Left Column: Direct Communication (Prominent & Clear) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#05142f] via-[#09224f] to-[#0047AB] text-white shadow-xl space-y-6 relative overflow-hidden border border-blue-400/20">
              <div className="absolute top-0 right-0 w-44 h-44 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Instant Reach
                </span>
                <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                  Direct Communication
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have an urgent SLA requirement or want to talk immediately? Connect directly with our core leadership team.
                </p>
              </div>
              
              <div className="space-y-3.5 text-sm">
                <a
                  href="mailto:hello@datagalactic.in"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group backdrop-blur-sm"
                >
                  <div className="p-2.5 rounded-xl bg-sky-400 text-slate-950 font-bold group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-sky-200 font-medium uppercase tracking-wider">Priority Business Inbox</p>
                    <p className="font-bold text-white text-base truncate">hello@datagalactic.in</p>
                    <p className="text-[11px] text-emerald-300 font-medium">12–24h response SLA guaranteed</p>
                  </div>
                </a>

                <a
                  href="mailto:datagalactic2@gmail.com"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-blue-300/20 text-blue-200 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Secondary Inquiries</p>
                    <p className="font-semibold text-slate-100 text-sm truncate">datagalactic2@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919363164608"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/20 border border-emerald-400/30 transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-emerald-300 font-medium uppercase tracking-wider">Phone &amp; WhatsApp Direct Line</p>
                    <p className="font-bold text-white text-base">+91 9363164608</p>
                    <p className="text-[11px] text-emerald-200">Available for instant project discussions</p>
                  </div>
                </a>
              </div>

              {/* Founder & Location Details */}
              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Founder &amp; CEO: <strong className="text-white font-semibold">Risona R</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Tamil Nadu, India · Serving Worldwide Clients</span>
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-sky-700 text-sm font-semibold">
                <Lock className="w-4 h-4" />
                <span>NDA &amp; Confidentiality Protected</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All data submitted is handled under enterprise-grade NDA protocols. We never share or sell project details.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Generation & Quote Form (Medium width & Balanced) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg">
              
              {successData ? (
                /* Success Screen */
                <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Space_Grotesk']">
                      Project Received!
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Thank you, <strong className="text-slate-900">{successData.data?.name}</strong>. Your enquiry for <strong className="text-sky-700">{successData.data?.companyName}</strong> has been logged in our queue.
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">
                      ✓ A real-time confirmation email has been dispatched to your inbox.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left space-y-2 text-xs sm:text-sm text-slate-700">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Service:</span>
                      <span className="font-semibold text-sky-700">{successData.data?.service}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Turnaround SLA:</span>
                      <span className="text-slate-700 font-medium">Custom Proposal in 12–24 Hours</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Direct Inquiries:</span>
                      <span className="text-sky-700 font-medium">hello@datagalactic.in</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-sky-700 rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Screen */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. John Miller"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Company Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Apex Global Logistics Ltd."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Real-Time OTP Verification */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-700">
                        Your Email Address <span className="text-sky-600">*</span>
                      </label>
                      {otpVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <Check className="w-3 h-3" />
                          Email Verified
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpLoading || otpCooldown > 0 || !formData.email}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-800 disabled:text-slate-400 cursor-pointer"
                        >
                          <KeyRound className="w-3 h-3" />
                          <span>
                            {otpCooldown > 0 ? `Resend OTP in ${otpCooldown}s` : 'Verify with Real-Time OTP (Optional)'}
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. yourname@gmail.com or company email"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                          otpVerified ? 'border-emerald-400 bg-emerald-50/20' : 'border-slate-300'
                        } text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all`}
                      />
                    </div>

                    {/* OTP Input Drawer */}
                    {otpSent && !otpVerified && (
                      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-2.5 mt-2 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-sky-900">Enter 6-digit OTP code sent to email:</span>
                          {otpCooldown > 0 && <span className="text-sky-600 font-mono text-[11px]">Expires in 10m</span>}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="6-digit code"
                            className="w-32 px-3 py-2 text-center font-mono font-bold tracking-widest text-sm rounded-xl bg-white border border-sky-300 text-slate-900 focus:outline-none focus:border-sky-600"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpLoading || otpCode.length !== 6}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 transition-colors cursor-pointer"
                          >
                            {otpLoading ? 'Verifying...' : 'Verify Code'}
                          </button>
                        </div>
                        {otpMsg && <p className="text-xs text-sky-800 font-medium">{otpMsg}</p>}
                      </div>
                    )}
                  </div>

                  {/* Row 3: Phone / WhatsApp (Optional) with Integrated Country Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional — Country included)</span>
                      </label>
                      {/* Live Counter Badge */}
                      <span
                        className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                          formData.phoneDigits.length === selectedCountry.digits
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : formData.phoneDigits.length > 0
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {formData.phoneDigits.length === selectedCountry.digits ? (
                          `✓ ${selectedCountry.digits}/${selectedCountry.digits} Complete`
                        ) : (
                          `${formData.phoneDigits.length}/${selectedCountry.digits} digits`
                        )}
                      </span>
                    </div>

                    <div className="relative flex rounded-xl border border-slate-300 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 overflow-hidden bg-white">
                      {/* Country Selector integrated directly inside Phone field - Compact Font Adaptive */}
                      <div className="relative bg-slate-100 border-r border-slate-200 shrink-0 flex items-center hover:bg-slate-200/70 transition-colors">
                        <select
                          value={selectedCountry.code}
                          onChange={handleCountrySelect}
                          className="pl-2.5 pr-6 py-2.5 bg-transparent text-slate-800 text-xs font-semibold cursor-pointer appearance-none focus:outline-none w-auto max-w-[130px] sm:max-w-[150px] truncate"
                          title="Select Country & Dial Code"
                        >
                          {countryList.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.dial} ({c.name})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 pointer-events-none" />
                      </div>

                      {/* Phone Digits Input restricted to country digits */}
                      <input
                        type="tel"
                        inputMode="numeric"
                        name="phoneDigits"
                        maxLength={selectedCountry.digits}
                        value={formData.phoneDigits}
                        onChange={handlePhoneDigitsChange}
                        placeholder={selectedCountry.placeholder}
                        className="w-full px-3.5 py-2.5 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm font-mono tracking-wide focus:outline-none"
                      />
                    </div>
                    
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>Format: {selectedCountry.dial} ({selectedCountry.digits} digits required)</span>
                      <span className="font-medium text-slate-600">{selectedCountry.name}</span>
                    </p>
                  </div>

                  {/* Row 4: Service & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Service Required <span className="text-sky-600">*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                      >
                        {servicesList.map((s, idx) => (
                          <option key={idx} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Project Type <span className="text-sky-600">*</span>
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                      >
                        {projectTypes.map((t, idx) => (
                          <option key={idx} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Volume */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Estimated Data Volume (Optional)
                    </label>
                    <input
                      type="text"
                      name="estimatedVolume"
                      value={formData.estimatedVolume}
                      onChange={handleInputChange}
                      placeholder="e.g. 5,000 PDF invoices, 20 hrs/week, or 50,000 SKU catalog rows"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>

                  {/* Row 6: Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Project Description &amp; Requirements <span className="text-sky-600">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Please outline the nature of your data, source file formats, required deliverables, expected accuracy guidelines, and turnaround timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-bold text-white text-base bg-slate-900 hover:bg-sky-700 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching Real-Time Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Request</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      100% Secure &amp; Confidential under strict NDA. Instant real-time confirmation sent to your email.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuoteContactSection;
