import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Data Security', href: '/security' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Request Quote', href: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Online & Offline Data Entry', href: '/services/data-entry' },
    { name: 'Data Cleansing & Verification', href: '/services/data-processing' },
    { name: 'PDF to Excel / Word Conversion', href: '/services/data-conversion' },
    { name: 'Web Research & Prospecting', href: '/services/web-research' },
    { name: 'E-commerce Catalog Listings', href: '/services/ecommerce-data' },
    { name: 'Back Office & Record Operations', href: '/services/back-office-support' }
  ];

  const industryLinks = [
    { name: 'E-commerce & Marketplaces', href: '/industries/ecommerce' },
    { name: 'Healthcare & Medical Data', href: '/industries/healthcare' },
    { name: 'Real Estate & Portals', href: '/industries/real-estate' },
    { name: 'Finance & Banking Records', href: '/industries/finance' },
    { name: 'Logistics & Freight Documents', href: '/industries/logistics' },
    { name: 'Education & EdTech', href: '/industries/education' }
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">

          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <img
                src="/dg-monogram.png"
                alt="DataGalactic Monogram"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <div className="flex flex-col text-left">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-['Outfit'] leading-tight">
                  Data<span className="text-[#0047AB]">Galactic</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-semibold leading-none mt-0.5">
                  Precision Beyond Limits
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Specialized data entry, data processing, and back-office support services helping international enterprises scale accurately and cost-effectively.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <a href="mailto:hello@datagalactic.in" className="flex items-center gap-2 hover:text-[#0047AB] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#0047AB] shrink-0" />
                hello@datagalactic.in
              </a>
              <a href="mailto:datagalactic2@gmail.com" className="flex items-center gap-2 hover:text-[#0047AB] transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                datagalactic2@gmail.com
              </a>
              <a href="tel:+919363164608" className="flex items-center gap-2 hover:text-emerald-700 transition-colors font-medium">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                +91 9363164608
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#0047AB] shrink-0" />
                Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Space_Grotesk']">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.href} className="footer-link hover:text-[#0047AB] transition-all flex items-center gap-1.5 group">
                    <span className="text-[#0047AB]/50 group-hover:text-[#0047AB] transition-colors">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Space_Grotesk']">Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {serviceLinks.map((svc, idx) => (
                <li key={idx}>
                  <Link to={svc.href} className="footer-link hover:text-[#0047AB] transition-all flex items-center gap-1.5 group">
                    <span className="text-[#0047AB]/50 group-hover:text-[#0047AB] transition-colors">›</span>
                    <span>{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Industries */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Space_Grotesk']">Industries</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {industryLinks.map((ind, idx) => (
                <li key={idx}>
                  <Link to={ind.href} className="footer-link hover:text-[#0047AB] transition-all flex items-center gap-1.5 group">
                    <span className="text-[#0047AB]/50 group-hover:text-[#0047AB] transition-colors">›</span>
                    <span>{ind.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {currentYear} DataGalactic. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[#0047AB] font-semibold">Founder &amp; CEO — Risona R</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/security" className="footer-link hover:text-slate-800 transition-colors">Data Confidentiality</Link>
            <Link to="/about" className="footer-link hover:text-slate-800 transition-colors">Terms of Engagement</Link>
            <a href="https://datagalactic.in" className="footer-link hover:text-[#0047AB] transition-colors flex items-center gap-1">
              datagalactic.in <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
