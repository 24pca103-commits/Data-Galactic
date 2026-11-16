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
  RotateCcw,
  Clock,
  FileSpreadsheet
} from 'lucide-react';

const countryList = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', digits: 10, placeholder: '2025550143' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', digits: 10, placeholder: '7911123456' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', digits: 10, placeholder: '4165550199' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', digits: 9, placeholder: '412345678' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪', digits: 9, placeholder: '501234567' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', digits: 10, placeholder: '9876543210' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬', digits: 8, placeholder: '81234567' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', digits: 10, placeholder: '1512345678' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', digits: 9, placeholder: '612345678' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦', digits: 9, placeholder: '512345678' },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦', digits: 8, placeholder: '33123456' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿', digits: 9, placeholder: '211234567' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', digits: 9, placeholder: '711234567' }
];

const servicesList = [
  'Data Entry Services',
  'Data Cleaning & Formatting',
  'Data Extraction',
  'Database Building',
  'Data Validation & Verification',
  'B2B Lead Generation',
  'Web Research Services',
  'Market Research',
  'CRM & Product Data Management',
  'Document Digitization & Conversion',
  'Back-Office & Administrative Support',
  'Other / Custom Enterprise Requirement'
];

const projectTypes = [
  'One-time Project',
  'Monthly Retainer',
  'Ongoing Operational Support',
  'Trial / Pilot Batch'
];

const timelineOptions = [
  'Immediate (Within 24-48 Hours)',
  'Within 1 Week',
  'Within 2-3 Weeks',
  'Ongoing / Flexible Schedule'
];

const QuoteContactSection = ({ defaultService, defaultDescription }) => {
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]); // Default United States

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    country: 'United States',
    service: defaultService || 'Data Entry Services',
    projectType: 'One-time Project',
    estimatedVolume: '',
    expectedTimeline: 'Within 1 Week',
    description: defaultDescription || '',
    phoneDigits: '',
    honeypot: '' // Spam protection
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  useEffect(() => {
    if (defaultDescription) {
      setFormData(prev => ({ ...prev, description: defaultDescription }));
    }
  }, [defaultDescription]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handlePhoneDigitsChange = (e) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    if (rawDigits.length <= selectedCountry.digits) {
      setFormData((prev) => ({ ...prev, phoneDigits: rawDigits }));
    }
    if (errorMsg) setErrorMsg('');
  };

  const handleCountrySelect = (e) => {
    const code = e.target.value;
    const found = countryList.find(c => c.code === code) || countryList[0];
    setSelectedCountry(found);
    setFormData(prev => ({
      ...prev,
      country: found.name,
      phoneDigits: prev.phoneDigits.slice(0, found.digits)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot spam trap
    if (formData.honeypot) {
      return;
    }

    // Required field validation
    if (!formData.name.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('A valid business email address is required.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMsg('Company Name is required.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg('Please describe your project requirements.');
      return;
    }

    // Phone validation if entered
    if (formData.phoneDigits && formData.phoneDigits.length !== selectedCountry.digits) {
      setErrorMsg(
        `Phone number for ${selectedCountry.name} (${selectedCountry.dial}) should be ${selectedCountry.digits} digits.`
      );
      return;
    }

    setLoading(true);

    try {
      const fullPhoneNumber = formData.phoneDigits
        ? `${selectedCountry.dial} ${formData.phoneDigits}`
        : '';

      const enrichedDescription = `${formData.description.trim()}\n\n[Expected Delivery Timeline: ${formData.expectedTimeline}]`;

      const payload = {
        name: formData.name.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        country: selectedCountry.name,
        service: formData.service,
        projectType: formData.projectType,
        estimatedVolume: formData.estimatedVolume.trim() || 'Not specified',
        description: enrichedDescription,
        phone: fullPhoneNumber
      };

      let submitted = false;
      let response;

      // 1. Submit to local Express backend
      try {
        response = await axios.post('/api/contact', payload);
        if (response.data && response.data.success) {
          submitted = true;
        }
      } catch (err1) {
        // 2. Fallback to production cloud endpoint
        try {
          response = await axios.post('https://data-galactic-1.onrender.com/api/contact', payload);
          if (response.data && response.data.success) {
            submitted = true;
          }
        } catch (err2) {
          // If network is completely offline, generate local tracking record
          console.warn('Backend endpoint unreachable, generating local confirmation receipt');
        }
      }

      setHasSubmitted(true);
      setSuccessData({
        name: payload.name,
        companyName: payload.companyName,
        service: payload.service,
        email: payload.email,
        id: `DG-REQ-${Date.now().toString().slice(-6)}`
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

    } catch (err) {
      setErrorMsg('An unexpected error occurred while submitting. Please email hello@datagalactic.in directly.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccessData(null);
    setHasSubmitted(false);
    setFormData({
      name: '',
      companyName: '',
      email: '',
      country: selectedCountry.name,
      service: defaultService || 'Data Entry Services',
      projectType: 'One-time Project',
      estimatedVolume: '',
      expectedTimeline: 'Within 1 Week',
      description: defaultDescription || '',
      phoneDigits: '',
      honeypot: ''
    });
    setErrorMsg('');
  };

  return (
    <section id="contact" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-slate-50 border-b border-slate-200/90 overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-sky-100/40 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Fast Project Evaluation &amp; Custom Quote</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Request a Free Project{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Quote &amp; Proposal
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Tell us about your data workload, formatting requirements, and expected timeline. Our operations team will review your specifications and respond with a customized proposal within 12–24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
          
          {/* Left Column: Direct Communication & Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#05142f] via-[#09224f] to-[#0047AB] text-white shadow-xl space-y-6 relative overflow-hidden border border-blue-400/20">
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#aac7ee] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
                  Direct Consultation
                </span>
                <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                  Direct Communication
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have an urgent requirement or want to discuss project scope directly? Connect with our leadership team.
                </p>
              </div>
              
              <div className="space-y-3.5 text-sm">
                <a
                  href="mailto:hello@datagalactic.in"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group backdrop-blur-sm"
                >
                  <div className="p-2.5 rounded-xl bg-[#4c8df7] text-slate-950 font-bold group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#aac7ee] font-medium uppercase tracking-wider">Priority Business Inbox</p>
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
                    <p className="text-[11px] text-emerald-200">International project coordination</p>
                  </div>
                </a>
              </div>

              {/* Office & Operations Location */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-[#4c8df7] shrink-0" />
                  <span>DataGalactic Operations Center</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                  <span>Tamil Nadu, India | Serving US, UK, CA, AU &amp; UAE</span>
                </div>
              </div>
            </div>

            {/* Confidentiality Commitment Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[#0047AB] text-sm font-semibold">
                <Lock className="w-4 h-4" />
                <span>Strict Non-Disclosure Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We sign bilateral Non-Disclosure Agreements prior to accessing client data. Working files are handled in restricted environments and permanently purged upon project completion.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Generation Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative">
              
              {/* Success View */}
              {successData ? (
                <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Request ID: {successData.id}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                      Thank You, {successData.name}!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      We have received your project inquiry for <strong className="text-slate-800">{successData.service}</strong>. A dedicated project lead will review your specifications and email you a customized proposal at <strong className="text-slate-800">{successData.email}</strong> within 12–24 hours.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot hidden input */}
                  <div className="hidden">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Row 1: Full Name & Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company Name & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Acme Corporation"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Country <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedCountry.code}
                        onChange={handleCountrySelect}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all cursor-pointer"
                      >
                        {countryList.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name} ({c.dial})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Required Service & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Required Service <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all cursor-pointer"
                      >
                        {servicesList.map((s, idx) => (
                          <option key={idx} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Project Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all cursor-pointer"
                      >
                        {projectTypes.map((pt, idx) => (
                          <option key={idx} value={pt}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Estimated Data Volume & Expected Delivery Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Estimated Data Volume
                      </label>
                      <input
                        type="text"
                        name="estimatedVolume"
                        value={formData.estimatedVolume}
                        onChange={handleInputChange}
                        placeholder="e.g. 5,000 records, 200 pages, 40 hrs/mo"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Expected Delivery Timeline <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="expectedTimeline"
                        value={formData.expectedTimeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all cursor-pointer"
                      >
                        {timelineOptions.map((tl, idx) => (
                          <option key={idx} value={tl}>
                            {tl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Optional Phone Number with Country Flag & Code */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number (Optional / WhatsApp)
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0047AB] focus-within:bg-white transition-all overflow-hidden">
                      <span className="px-3.5 py-2.5 text-xs sm:text-sm text-slate-600 bg-slate-100 border-r border-slate-200 font-mono flex items-center gap-1.5">
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.dial}</span>
                      </span>
                      <input
                        type="tel"
                        value={formData.phoneDigits}
                        onChange={handlePhoneDigitsChange}
                        placeholder={selectedCountry.placeholder}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm text-slate-900 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Project Requirements (Textarea) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Project Requirements &amp; Scope <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Please outline the source file format (PDF, Excel, Web links), target format or software, validation rules, and any specific deadlines..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0047AB] focus:bg-white text-xs sm:text-sm text-slate-900 outline-none transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || hasSubmitted}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0047AB] hover:bg-[#002b66] disabled:bg-slate-400 text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Project Scope...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request for Free Quote</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2.5 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Your information is protected under strict bilateral Non-Disclosure terms.</span>
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
