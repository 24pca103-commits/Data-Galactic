import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Mail, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Data Security', href: '#security' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/90 ${
      scrolled
        ? 'shadow-md py-2.5'
        : 'shadow-sm py-3'
    }`}>
      {/* Top micro bar — Hero section tone */}
      <div className="hidden lg:block bg-[#05142f] pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#aac7ee] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4c8df7]" />
              B2B Data &amp; Business Support Services
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo with Hero Section Dark Color */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/logo-mark.png"
              alt="DataGalactic Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#05142f] font-['Outfit'] leading-tight">
                Data<span className="text-[#0d4ba3]">Galactic</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-slate-500 font-semibold leading-none mt-0.5">
                Precision Beyond Limits
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-slate-100 transition-colors rounded-xl"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button in Hero Section Tone */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#05142f] hover:bg-sky-600 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center md:hidden">
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <div className="text-xs text-slate-600 px-2 flex flex-col gap-1 font-medium">
              <span>📧 hello@datagalactic.in</span>
              <span>📞 +91 9363164608</span>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-5 py-3 text-sm font-bold text-white bg-[#05142f] hover:bg-sky-600 rounded-xl shadow-lg transition-colors"
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
