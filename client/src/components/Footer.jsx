import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Data Security', href: '#security' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Request Quote', href: '#contact' },
  ];

  const serviceLinks = [
    'Online & Offline Data Entry',
    'Data Cleansing & Verification',
    'PDF to Excel / Word Conversion',
    'Web Research & Prospecting',
    'E-commerce Catalog Listings',
    'Back Office & Record Operations'
  ];

  const industryLinks = [
    'E-commerce & Marketplaces',
    'Healthcare & Medical Data',
    'Real Estate & Portals',
    'Finance & Banking Records',
    'Logistics & Freight Documents',
    'Professional & Legal Firms'
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-sky-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">

          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="inline-flex items-center gap-3 group">
              <img
                src="/logo-mark.png"
                alt="DataGalactic Monogram"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <div className="flex flex-col text-left">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-['Rajdhani'] leading-tight">
                  DATA <span className="text-sky-600">GALACTIC</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-medium leading-none mt-0.5">
                  Precision Beyond Limits
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Specialized B2B data entry, data processing, and back-office support services helping international enterprises scale accurately and cost-effectively.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <a href="mailto:hello@datagalactic.in" className="flex items-center gap-2 hover:text-sky-600 transition-colors">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                hello@datagalactic.in
              </a>
              <a href="mailto:datagalactic2@gmail.com" className="flex items-center gap-2 hover:text-sky-600 transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                datagalactic2@gmail.com
              </a>
              <a href="tel:+919363164608" className="flex items-center gap-2 hover:text-sky-600 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                +91 9363164608
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* Col 2: Quick / Home Links (FIRST right after brand) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Space_Grotesk']">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500 font-bold">›</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (NEXT) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Space_Grotesk']">Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {serviceLinks.map((svc, idx) => (
                <li key={idx}>
                  <a href="#services" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500 font-bold">›</span>
                    <span>{svc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Industries (NEXT) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Space_Grotesk']">Industries</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {industryLinks.map((ind, idx) => (
                <li key={idx}>
                  <a href="#industries" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500 font-bold">›</span>
                    <span>{ind}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {currentYear} DataGalactic. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-sky-700 font-medium">Founder &amp; CEO — Risona R</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#security" className="hover:text-slate-800 transition-colors">Data Confidentiality</a>
            <a href="#about" className="hover:text-slate-800 transition-colors">Terms of Engagement</a>
            <a href="#admin" className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1 font-medium">
              <span>Admin Portal</span>
            </a>
            <a href="https://datagalactic.in" className="hover:text-sky-600 transition-colors flex items-center gap-1">
              datagalactic.in <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
