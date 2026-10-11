import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  ChevronDown,
  FileSpreadsheet,
  Filter,
  FileCode,
  Search,
  ShoppingCart,
  Briefcase,
  ShoppingBag,
  HeartPulse,
  Building2,
  BadgeDollarSign,
  Truck,
  GraduationCap,
  Users,
  Workflow,
  Lock,
  Star,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'industries' | 'company' | null
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);
  const navContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Toggle dropdown on click (supports 1st click open, 2nd click toggle)
  const toggleDropdown = (menuKey, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(prev => prev === menuKey ? null : menuKey);
  };

  const toggleMobileSubmenu = (menuKey) => {
    setMobileExpanded(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // Smooth scroll handler for all sub menu clicks
  const handleScrollToSection = (targetId, e) => {
    if (e) e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    const serviceIds = ['data-entry', 'data-processing', 'data-conversion', 'web-research', 'ecommerce-data', 'back-office-support'];
    const industryIds = ['ecommerce', 'healthcare', 'real-estate', 'finance', 'logistics', 'education'];
    
    const scrollTargetId = serviceIds.includes(targetId)
      ? 'services'
      : industryIds.includes(targetId)
      ? 'industries'
      : targetId;

    if (location.pathname === '/') {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', `/#${targetId}`);
      window.dispatchEvent(new Event('hashchange'));
    } else {
      navigate(`/#${targetId}`);
    }
  };

  // Submenu Definitions with Section Targets
  const servicesSubmenu = [
    {
      name: 'Data Entry Services',
      desc: 'Online & offline entry with 99.9% accuracy SLA',
      href: '/#data-entry',
      sectionId: 'data-entry',
      icon: FileSpreadsheet
    },
    {
      name: 'Data Processing & Cleansing',
      desc: 'Deduplication, schema normalization & enrichment',
      href: '/#data-processing',
      sectionId: 'data-processing',
      icon: Filter
    },
    {
      name: 'Data Conversion (OCR / PDF)',
      desc: 'PDF to Excel, scanned sheets & automated OCR',
      href: '/#data-conversion',
      sectionId: 'data-conversion',
      icon: FileCode
    },
    {
      name: 'Web Research & Mining',
      desc: 'Business lead generation, market data & price monitoring',
      href: '/#web-research',
      sectionId: 'web-research',
      icon: Search
    },
    {
      name: 'E-commerce Data Services',
      desc: 'Multi-channel product listings & inventory updates',
      href: '/#ecommerce-data',
      sectionId: 'ecommerce-data',
      icon: ShoppingCart
    },
    {
      name: 'Back Office Support',
      desc: 'Dedicated teams for ongoing admin & operations',
      href: '/#back-office-support',
      sectionId: 'back-office-support',
      icon: Briefcase
    }
  ];

  const industriesSubmenu = [
    {
      name: 'E-commerce & Retail',
      desc: 'High-speed SKU population & catalog syncing',
      href: '/#ecommerce',
      sectionId: 'ecommerce',
      icon: ShoppingBag
    },
    {
      name: 'Healthcare & Medical',
      desc: 'Patient intake charts & insurance claims entry',
      href: '/#healthcare',
      sectionId: 'healthcare',
      icon: HeartPulse
    },
    {
      name: 'Real Estate & Properties',
      desc: 'MLS listing management & county deeds indexing',
      href: '/#real-estate',
      sectionId: 'real-estate',
      icon: Building2
    },
    {
      name: 'Banking & Financial',
      desc: 'Ledger reconciliation & KYC document parsing',
      href: '/#finance',
      sectionId: 'finance',
      icon: BadgeDollarSign
    },
    {
      name: 'Logistics & Supply Chain',
      desc: 'Bill of Lading processing & shipping manifests',
      href: '/#logistics',
      sectionId: 'logistics',
      icon: Truck
    },
    {
      name: 'Education & EdTech',
      desc: 'Student admissions digitization & archives',
      href: '/#education',
      sectionId: 'education',
      icon: GraduationCap
    }
  ];

  const companySubmenu = [
    {
      name: 'About Us',
      desc: 'Our mission, leadership & operational standards',
      href: '/#about',
      sectionId: 'about',
      icon: Users
    },
    {
      name: 'How It Works',
      desc: '5-stage precision SLA workflow & delivery',
      href: '/#how-it-works',
      sectionId: 'how-it-works',
      icon: Workflow
    },
    {
      name: 'Data Security & NDA',
      desc: 'Tier-1 confidentiality, ISO protocols & encryption',
      href: '/#security',
      sectionId: 'security',
      icon: Lock
    },
    {
      name: 'Client Testimonials',
      desc: 'Verified enterprise endorsements & reviews',
      href: '/#testimonials',
      sectionId: 'testimonials',
      icon: Star
    }
  ];

  return (
    <header ref={navContainerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm">
      {/* Top micro bar directly touching top edge (no white gap above) */}
      <div className="hidden lg:block bg-[#05142f] py-2 border-b border-[#122f5c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#aac7ee] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4c8df7]" />
              Enterprise Data &amp; Business Support Services
            </span>
            <span className="text-[#1e4480]">|</span>
            <span className="text-slate-300 tracking-wider font-medium">Precision Beyond Limits</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:hello@datagalactic.in" className="flex items-center gap-1.5 text-slate-300 hover:text-[#4c8df7] transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-[#4c8df7]" />
              hello@datagalactic.in
            </a>
            <a href="tel:+919363164608" className="flex items-center gap-1.5 text-white hover:text-[#4c8df7] transition-colors font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#4c8df7]" />
              +91 9363164608
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className={`bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo - Monogram with brand text side-by-side */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/dg-monogram.png"
                alt="DataGalactic Monogram"
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <div className="flex flex-col text-left">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-['Outfit'] leading-tight">
                  Data<span className="text-[#0047AB]">Galactic</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-slate-500 font-bold leading-none mt-0.5">
                  Precision Beyond Limits
                </span>
              </div>
            </Link>

            {/* Desktop Nav: Home | About ⌵ | Services ⌵ | Industries ⌵ | Testimonials ⌵ | Contact ⌵ */}
            <nav className="hidden lg:flex items-center space-x-1">
              
              {/* 1. Home */}
              <Link
                to="/"
                className={`px-3.5 py-2 text-sm font-semibold transition-all rounded-xl ${
                  location.pathname === '/' ? 'text-white bg-[#002b66] shadow-xs' : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                }`}
              >
                Home
              </Link>

              {/* 2. About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => toggleDropdown('about', e)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeDropdown === 'about' || location.pathname.startsWith('/about') || location.pathname === '/how-it-works' || location.pathname === '/security'
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 w-72 p-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                    <a
                      href="/#about"
                      onClick={(e) => handleScrollToSection('about', e)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#002b66] hover:text-white text-slate-800 transition-colors group cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-sky-600 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">Company Profile</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-200">Our mission, leadership &amp; vision</p>
                      </div>
                    </a>
                    <a
                      href="/#how-it-works"
                      onClick={(e) => handleScrollToSection('how-it-works', e)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#002b66] hover:text-white text-slate-800 transition-colors group cursor-pointer"
                    >
                      <Workflow className="w-4 h-4 text-sky-600 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">How It Works</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-200">5-stage precision SLA workflow</p>
                      </div>
                    </a>
                    <a
                      href="/#security"
                      onClick={(e) => handleScrollToSection('security', e)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#002b66] hover:text-white text-slate-800 transition-colors group cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-sky-600 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">Security &amp; NDA</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-200">Bank-grade data confidentiality</p>
                      </div>
                    </a>
                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <Link
                        to="/about"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#002b66] bg-sky-50/70 hover:bg-[#002b66] hover:text-white transition-colors group cursor-pointer"
                      >
                        <span>View Dedicated About Page</span>
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => toggleDropdown('services', e)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeDropdown === 'services' || location.pathname.startsWith('/services')
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-0 w-[580px] p-4 bg-white rounded-2xl shadow-2xl border border-slate-200/90 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="px-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="uppercase tracking-wider font-bold text-slate-700">Enterprise Data Services</span>
                      <div className="flex items-center gap-3">
                        <a href="/#services" onClick={(e) => handleScrollToSection('services', e)} className="text-[#002b66] font-semibold hover:underline cursor-pointer">Scroll to Overview ↓</a>
                        <span className="text-slate-300">|</span>
                        <Link to="/services" onClick={() => setActiveDropdown(null)} className="text-sky-700 font-bold hover:underline cursor-pointer">All Services Page →</Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {servicesSubmenu.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={(e) => handleScrollToSection(item.sectionId, e)}
                            className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group hover:bg-[#002b66] hover:text-white text-slate-800 cursor-pointer"
                          >
                            <div className="p-2 rounded-lg shrink-0 transition-colors bg-slate-100 text-slate-700 group-hover:bg-[#122f5c] group-hover:text-white">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-snug text-slate-900 group-hover:text-white">
                                {item.name}
                              </p>
                              <p className="text-[11px] line-clamp-1 mt-0.5 leading-snug text-slate-500 group-hover:text-slate-200">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-sky-50 text-[#002b66] text-xs font-bold hover:bg-[#002b66] hover:text-white transition-all cursor-pointer group"
                      >
                        <span>Explore Complete Services Catalog &amp; Details</span>
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Industries Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('industries')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => toggleDropdown('industries', e)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeDropdown === 'industries' || location.pathname.startsWith('/industries')
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <span>Industries</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'industries' && (
                  <div className="absolute top-full left-0 w-[580px] p-4 bg-white rounded-2xl shadow-2xl border border-slate-200/90 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="px-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="uppercase tracking-wider font-bold text-slate-700">Specialized Industry Solutions</span>
                      <div className="flex items-center gap-3">
                        <a href="/#industries" onClick={(e) => handleScrollToSection('industries', e)} className="text-[#002b66] font-semibold hover:underline cursor-pointer">Scroll to Sectors ↓</a>
                        <span className="text-slate-300">|</span>
                        <Link to="/industries" onClick={() => setActiveDropdown(null)} className="text-sky-700 font-bold hover:underline cursor-pointer">All Industries Page →</Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {industriesSubmenu.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={(e) => handleScrollToSection(item.sectionId, e)}
                            className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group hover:bg-[#002b66] hover:text-white text-slate-800 cursor-pointer"
                          >
                            <div className="p-2 rounded-lg shrink-0 transition-colors bg-slate-100 text-slate-700 group-hover:bg-[#122f5c] group-hover:text-white">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-snug text-slate-900 group-hover:text-white">
                                {item.name}
                              </p>
                              <p className="text-[11px] line-clamp-1 mt-0.5 leading-snug text-slate-500 group-hover:text-slate-200">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <Link
                        to="/industries"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-sky-50 text-[#002b66] text-xs font-bold hover:bg-[#002b66] hover:text-white transition-all cursor-pointer group"
                      >
                        <span>Explore Dedicated Industry Sectors Overview</span>
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Testimonials Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('testimonials')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => toggleDropdown('testimonials', e)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeDropdown === 'testimonials' || location.pathname.startsWith('/testimonials')
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <span>Testimonials</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'testimonials' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'testimonials' && (
                  <div className="absolute top-full left-0 w-72 p-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                    <a
                      href="/#testimonials"
                      onClick={(e) => handleScrollToSection('testimonials', e)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#002b66] hover:text-white text-slate-800 transition-colors group cursor-pointer"
                    >
                      <Star className="w-4 h-4 text-amber-500 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">Client Endorsements</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-200">Verified global partner reviews</p>
                      </div>
                    </a>
                    <a
                      href="/#feedback"
                      onClick={(e) => handleScrollToSection('feedback', e)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#002b66] hover:text-white text-slate-800 transition-colors group cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-sky-600 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">Submit Feedback</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-200">Share your experience with us</p>
                      </div>
                    </a>
                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <Link
                        to="/testimonials"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#002b66] bg-sky-50/70 hover:bg-[#002b66] hover:text-white transition-colors group cursor-pointer"
                      >
                        <span>View All Client Reviews Page</span>
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Contact Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('contact')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => toggleDropdown('contact', e)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeDropdown === 'contact' || location.pathname === '/contact'
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'contact' && (
                  <div className="absolute top-full right-0 w-80 p-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                    <a
                      href="/#contact"
                      onClick={(e) => handleScrollToSection('contact', e)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#002b66] hover:text-white text-slate-800 transition-colors group cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-sky-600 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">Request Free Quote</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-200">Instant proposal in 12–24h</p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/919363164608"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#25D366] hover:text-white text-slate-800 transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                      <div>
                        <p className="text-xs font-bold leading-snug">WhatsApp Direct Chat</p>
                        <p className="text-[11px] text-slate-500 group-hover:text-white">+91 9363164608</p>
                      </div>
                    </a>
                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <Link
                        to="/contact"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#002b66] bg-sky-50/70 hover:bg-[#002b66] hover:text-white transition-colors group cursor-pointer"
                      >
                        <span>Visit Dedicated Contact Page</span>
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center">
            <a
              href="/#contact"
              onClick={(e) => handleScrollToSection('contact', e)}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#002b66] hover:bg-[#05142f] rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Drawer with Accordion Sub-menus */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            
            {/* Mobile Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-white hover:bg-[#002b66] rounded-xl transition-colors"
            >
              Home
            </Link>

            {/* Mobile About Accordion */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu('about')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-slate-800 hover:text-[#002b66]"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpanded['about'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['about'] && (
                <div className="pl-6 pr-2 py-2 space-y-1.5 bg-slate-50 rounded-xl my-1">
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors border-b border-slate-200/60 pb-2 mb-1 cursor-pointer"
                  >
                    View Dedicated About Page →
                  </Link>
                  <a
                    href="/#about"
                    onClick={(e) => handleScrollToSection('about', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Company Profile (Overview)
                  </a>
                  <a
                    href="/#how-it-works"
                    onClick={(e) => handleScrollToSection('how-it-works', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    How It Works
                  </a>
                  <a
                    href="/#security"
                    onClick={(e) => handleScrollToSection('security', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Security &amp; NDA
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Services Accordion */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu('services')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-slate-800 hover:text-[#002b66]"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpanded['services'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['services'] && (
                <div className="pl-6 pr-2 py-2 space-y-1.5 bg-slate-50 rounded-xl my-1">
                  <Link
                    to="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors border-b border-slate-200/60 pb-2 mb-1 cursor-pointer"
                  >
                    View All Services Page →
                  </Link>
                  <a
                    href="/#services"
                    onClick={(e) => handleScrollToSection('services', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Scroll to Services Overview ↓
                  </a>
                  {servicesSubmenu.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => handleScrollToSection(item.sectionId, e)}
                      className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Industries Accordion */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu('industries')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-slate-800 hover:text-[#002b66]"
              >
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpanded['industries'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['industries'] && (
                <div className="pl-6 pr-2 py-2 space-y-1.5 bg-slate-50 rounded-xl my-1">
                  <Link
                    to="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors border-b border-slate-200/60 pb-2 mb-1 cursor-pointer"
                  >
                    View All Industries Page →
                  </Link>
                  <a
                    href="/#industries"
                    onClick={(e) => handleScrollToSection('industries', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Scroll to Industries Sectors ↓
                  </a>
                  {industriesSubmenu.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => handleScrollToSection(item.sectionId, e)}
                      className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Testimonials Accordion */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu('testimonials')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-slate-800 hover:text-[#002b66]"
              >
                <span>Testimonials</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpanded['testimonials'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['testimonials'] && (
                <div className="pl-6 pr-2 py-2 space-y-1.5 bg-slate-50 rounded-xl my-1">
                  <Link
                    to="/testimonials"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors border-b border-slate-200/60 pb-2 mb-1 cursor-pointer"
                  >
                    View All Reviews Page →
                  </Link>
                  <a
                    href="/#testimonials"
                    onClick={(e) => handleScrollToSection('testimonials', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Client Endorsements (Scroll)
                  </a>
                  <a
                    href="/#feedback"
                    onClick={(e) => handleScrollToSection('feedback', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Submit Feedback
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Contact */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleMobileSubmenu('contact')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-slate-800 hover:text-[#002b66]"
              >
                <span>Contact</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpanded['contact'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['contact'] && (
                <div className="pl-6 pr-2 py-2 space-y-1.5 bg-slate-50 rounded-xl my-1">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-bold text-[#002b66] hover:text-white hover:bg-[#002b66] transition-colors border-b border-slate-200/60 pb-2 mb-1 cursor-pointer"
                  >
                    Visit Dedicated Contact Page →
                  </Link>
                  <a
                    href="/#contact"
                    onClick={(e) => handleScrollToSection('contact', e)}
                    className="block py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-white hover:bg-[#002b66] transition-colors cursor-pointer"
                  >
                    Request Free Quote (Scroll)
                  </a>
                </div>
              )}
            </div>

          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <div className="text-xs text-slate-600 px-2 flex flex-col gap-1 font-medium">
              <span>📧 hello@datagalactic.in</span>
              <span>📞 +91 9363164608</span>
            </div>
            <a
              href="/#contact"
              onClick={(e) => handleScrollToSection('contact', e)}
              className="w-full text-center px-5 py-3 text-sm font-bold text-white bg-[#05142f] hover:bg-sky-600 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
