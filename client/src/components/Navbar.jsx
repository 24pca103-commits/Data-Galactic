import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Database,
  FolderKanban,
  CheckCheck,
  Target,
  Search,
  TrendingUp,
  ShoppingCart,
  FileCode,
  Briefcase,
  Cpu,
  Megaphone,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Building2,
  Factory,
  Ship,
  UserCheck,
  BadgeDollarSign,
  Truck,
  Store,
  Building,
  Sparkles
} from 'lucide-react';
import { serviceCategories, servicesData } from '../data/siteData';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'industries' | null
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();
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

  const servicesList = Object.values(servicesData);

  return (
    <header ref={navContainerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm">
      {/* Top micro bar */}
      <div className="hidden lg:block bg-[#05142f] py-2 border-b border-[#122f5c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#aac7ee] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4c8df7]" />
              Data Management, Business Research &amp; Back-Office Outsourcing Partner
            </span>
            <span className="text-[#1e4480]">|</span>
            <span className="text-slate-300 tracking-wider font-medium">Serving US, UK, CA, AU &amp; UAE</span>
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
        scrolled ? 'py-2.5' : 'py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <img
                src="/dg-monogram.png"
                alt="DataGalactic Monogram"
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200 shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 font-['Outfit'] leading-tight">
                  Data<span className="text-[#0047AB]">Galactic</span>
                </span>
                <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-slate-500 font-bold leading-none mt-0.5">
                  Precision Beyond Limits
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
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

              {/* 2. About Us */}
              <Link
                to="/about"
                className={`px-3.5 py-2 text-sm font-semibold transition-all rounded-xl ${
                  location.pathname === '/about' ? 'text-white bg-[#002b66] shadow-xs' : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                }`}
              >
                About Us
              </Link>

              {/* 3. Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`flex items-center rounded-xl transition-all ${
                    activeDropdown === 'services' || location.pathname.startsWith('/services')
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <Link
                    to="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="pl-3.5 pr-1 py-2 text-sm font-semibold transition-colors"
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => toggleDropdown('services', e)}
                    aria-label="Toggle Services submenu"
                    className="pl-0.5 pr-2.5 py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Services Mega Dropdown */}
                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-0 w-[640px] p-5 bg-white rounded-3xl shadow-2xl border border-slate-200 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">10 Core Services in 3 Categories</span>
                      <Link to="/services" onClick={() => setActiveDropdown(null)} className="text-[#0047AB] font-bold hover:underline">
                        View All Services →
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      {serviceCategories.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                          <h4 className="font-bold text-[#0047AB] uppercase text-[11px] tracking-wider font-mono">
                            {cat.name}
                          </h4>
                          <div className="space-y-1">
                            {servicesList.filter(s => s.categoryId === cat.id).map(svc => (
                              <Link
                                key={svc.id}
                                to={`/services/${svc.id}`}
                                onClick={() => setActiveDropdown(null)}
                                className="block p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors"
                              >
                                <p className="font-semibold text-xs leading-snug">{svc.title}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Multi-stage verification on every project batch</span>
                      <Link to="/services" onClick={() => setActiveDropdown(null)} className="text-xs font-bold text-[#0047AB] hover:underline">
                        Explore Catalog →
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
                <div
                  className={`flex items-center rounded-xl transition-all ${
                    activeDropdown === 'industries' || location.pathname.startsWith('/industries')
                      ? 'text-white bg-[#002b66] shadow-xs'
                      : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                  }`}
                >
                  <Link
                    to="/industries"
                    onClick={() => setActiveDropdown(null)}
                    className="pl-3.5 pr-1 py-2 text-sm font-semibold transition-colors"
                  >
                    Industries
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => toggleDropdown('industries', e)}
                    aria-label="Toggle Industries submenu"
                    className="pl-0.5 pr-2.5 py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Industries Dropdown */}
                {activeDropdown === 'industries' && (
                  <div className="absolute top-full left-0 w-[540px] p-5 bg-white rounded-3xl shadow-2xl border border-slate-200 mt-1 animate-in fade-in zoom-in-95 duration-150 z-50 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">15 Industry Sectors Supported</span>
                      <Link to="/industries" onClick={() => setActiveDropdown(null)} className="text-[#0047AB] font-bold hover:underline">
                        All Sectors →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link to="/industries/it-software" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        IT &amp; Software Companies
                      </Link>
                      <Link to="/industries/marketing-agencies" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        Digital Marketing Agencies
                      </Link>
                      <Link to="/industries/leadgen-agencies" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        Research &amp; Consulting Agencies
                      </Link>
                      <Link to="/industries/ecommerce" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        E-commerce Companies
                      </Link>
                      <Link to="/industries/healthcare" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        Hospitals &amp; Healthcare
                      </Link>
                      <Link to="/industries/real-estate" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        Real Estate Companies
                      </Link>
                      <Link to="/industries/financial-services" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        Financial Services Companies
                      </Link>
                      <Link to="/industries/logistics-transportation" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-[#0047AB] transition-colors font-medium">
                        Logistics &amp; Transportation
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Explore tailored workflows for all 15 industries</span>
                      <Link to="/industries" onClick={() => setActiveDropdown(null)} className="text-xs font-bold text-[#0047AB] hover:underline">
                        View Complete List →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Portfolio */}
              <Link
                to="/portfolio"
                className={`px-3.5 py-2 text-sm font-semibold transition-all rounded-xl ${
                  location.pathname === '/portfolio' ? 'text-white bg-[#002b66] shadow-xs' : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                }`}
              >
                Portfolio
              </Link>

              {/* 6. Feedback */}
              <a
                href="/#feedback"
                className="px-3.5 py-2 text-sm font-semibold transition-all rounded-xl text-slate-700 hover:text-white hover:bg-[#002b66]"
              >
                Feedback
              </a>

              {/* 7. Contact */}
              <Link
                to="/contact"
                className={`px-3.5 py-2 text-sm font-semibold transition-all rounded-xl ${
                  location.pathname === '/contact' ? 'text-white bg-[#002b66] shadow-xs' : 'text-slate-700 hover:text-white hover:bg-[#002b66]'
                }`}
              >
                Contact
              </Link>

            </nav>

            {/* Right Action: Prominent "Get a Free Quote" Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="/contact#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="/contact#contact"
                className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0047AB] text-white text-[11px] sm:text-xs font-bold shrink-0"
              >
                Get Quote
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-2.5 shadow-2xl max-h-[82vh] overflow-y-auto overscroll-contain">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            About Us
          </Link>

          {/* Mobile Services */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu('services')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <span>Services (10)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.services ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded.services && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-bold text-[#0047AB]">
                  All Services Catalog →
                </Link>
                {servicesList.map(s => (
                  <Link
                    key={s.id}
                    to={`/services/${s.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-xs text-slate-600 hover:text-[#0047AB]"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Industries */}
          <div>
            <button
              onClick={() => toggleMobileSubmenu('industries')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <span>Industries (15)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.industries ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded.industries && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                <Link to="/industries" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-bold text-[#0047AB]">
                  All 15 Industries Overview →
                </Link>
                <Link to="/industries/it-software" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-slate-600">IT &amp; Software Companies</Link>
                <Link to="/industries/ecommerce" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-slate-600">E-commerce Companies</Link>
                <Link to="/industries/healthcare" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-slate-600">Healthcare Organisations</Link>
                <Link to="/industries/real-estate" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-slate-600">Real Estate Companies</Link>
                <Link to="/industries/financial-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-slate-600">Financial Services</Link>
              </div>
            )}
          </div>

          <Link
            to="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Portfolio
          </Link>

          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            How It Works
          </Link>

          <Link
            to="/security"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Data Security &amp; NDA
          </Link>

          <a
            href="/#feedback"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Client Feedback
          </a>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Contact
          </Link>

          <div className="pt-2 border-t border-slate-100">
            <a
              href="/contact#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 rounded-xl bg-[#0047AB] text-white text-sm font-bold shadow-sm"
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
