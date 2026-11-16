import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Globe2, MessageCircle } from 'lucide-react';
import { servicesData } from '../data/siteData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Industries We Serve', href: '/industries' },
    { name: 'Sample Projects / Portfolio', href: '/portfolio' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Data Security & NDA', href: '/security' },
    { name: 'Request a Quote', href: '/contact' }
  ];

  const primaryServices = [
    { name: 'Data Entry Services', href: '/services/data-entry' },
    { name: 'Data Cleaning & Formatting', href: '/services/data-cleaning' },
    { name: 'Data Extraction', href: '/services/data-extraction' },
    { name: 'Database Building', href: '/services/database-building' },
    { name: 'Data Validation & Verification', href: '/services/data-validation' },
    { name: 'Business & Company Research', href: '/services/company-research' },
    { name: 'Web Research Services', href: '/services/web-research' },
    { name: 'CRM & Product Data Management', href: '/services/crm-product-data' },
    { name: 'Document Digitization & Conversion', href: '/services/document-digitization' },
    { name: 'Back-Office & Admin Support', href: '/services/back-office-support' }
  ];

  const industryLinks = [
    { name: 'IT & Software Companies', href: '/industries/it-software' },
    { name: 'Digital Marketing Agencies', href: '/industries/marketing-agencies' },
    { name: 'Research & Consulting Agencies', href: '/industries/leadgen-agencies' },
    { name: 'E-commerce Companies', href: '/industries/ecommerce' },
    { name: 'Hospitals & Healthcare', href: '/industries/healthcare' },
    { name: 'Real Estate Companies', href: '/industries/real-estate' },
    { name: 'Financial Services', href: '/industries/financial-services' },
    { name: 'Logistics & Transportation', href: '/industries/logistics-transportation' }
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">

          {/* Col 1: Brand & Positioning */}
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
              Professional Data Management, Business Research &amp; Back-Office Outsourcing Partner helping international clients across the US, UK, Canada, Australia, and UAE eliminate operational backlogs.
            </p>

            {/* Direct Contact Information */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <a href="mailto:hello@datagalactic.in" className="flex items-center gap-2 hover:text-[#0047AB] transition-colors">
                <Mail className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span className="font-semibold text-slate-900">hello@datagalactic.in</span>
              </a>
              <a href="mailto:datagalactic2@gmail.com" className="flex items-center gap-2 hover:text-[#0047AB] transition-colors">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>datagalactic2@gmail.com</span>
              </a>
              <a href="tel:+919363164608" className="flex items-center gap-2 hover:text-[#0047AB] transition-colors font-medium">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+91 9363164608</span>
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span>Tamil Nadu, India · Serving Worldwide Enterprises</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/datagalactic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#0047AB] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67a1.67 1.67 0 0 0-1.67-1.67 1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67M7.86 18.5V10.1H5.06v8.4h2.8Z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/datagalactic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#0047AB] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/919363164608"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.href} className="hover:text-[#0047AB] transition-colors flex items-center gap-1.5">
                    <span className="text-[#0047AB]/50">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Our Core Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {primaryServices.map((svc, idx) => (
                <li key={idx}>
                  <Link to={svc.href} className="hover:text-[#0047AB] transition-colors flex items-center gap-1.5">
                    <span className="text-[#0047AB]/50">›</span>
                    <span className="truncate">{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Industries */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Industries We Serve</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {industryLinks.map((ind, idx) => (
                <li key={idx}>
                  <Link to={ind.href} className="hover:text-[#0047AB] transition-colors flex items-center gap-1.5">
                    <span className="text-[#0047AB]/50">›</span>
                    <span className="truncate">{ind.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} DataGalactic. All rights reserved. Data Management &amp; Business Support Outsourcing.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#0047AB] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#0047AB] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link to="/security" className="hover:text-[#0047AB] transition-colors">
              Data Security &amp; NDA
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
