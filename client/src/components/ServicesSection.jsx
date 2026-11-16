import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
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
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { serviceCategories, servicesData } from '../data/siteData';

const iconMap = {
  FileSpreadsheet,
  Filter,
  DatabaseZap: Database,
  FolderKanban,
  CheckCheck,
  Target,
  Search,
  TrendingUp,
  ShoppingCart,
  FileCode,
  Briefcase
};

const ServicesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allServices = Object.values(servicesData);

  const filteredServices = selectedCategory === 'all'
    ? allServices
    : allServices.filter(s => s.categoryId === selectedCategory);

  return (
    <section id="services" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-white border-b border-slate-200/90 overflow-hidden">
      
      {/* Background Subtle Shapes */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-blue-50/60 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Comprehensive Service Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Our Core{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Outsourcing Services
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Organized across three core operational pillars to help international businesses eliminate administrative bottlenecks, improve data hygiene, and scale efficiently.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#002b66] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Services (10)
          </button>

          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#002b66] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Rich Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.iconName] || FileSpreadsheet;

            return (
              <div
                key={service.id}
                className="group relative p-7 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-[#0047AB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon + Category Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shrink-0 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.subtitle}
                  </p>

                  {/* Business Problems It Solves */}
                  <div className="pt-3 border-t border-slate-200/80 mb-4">
                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Problems Solved:</span>
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {service.businessProblems.slice(0, 2).map((prob, pi) => (
                        <li key={pi} className="flex items-start gap-1.5">
                          <span className="text-[#0047AB] font-bold mt-0.5">•</span>
                          <span className="line-clamp-2">{prob}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Tasks Included */}
                  <div className="pt-3 border-t border-slate-200/80 mb-4">
                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Tasks Included:</span>
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.keyTasks.slice(0, 3).map((task, ti) => (
                        <li key={ti} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                          <span className="line-clamp-1">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable Industries Tags */}
                  <div className="pt-3 border-t border-slate-200/80">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      Suitable Client Industries:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.suitableIndustries.slice(0, 3).map((ind, ii) => (
                        <span key={ii} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action CTAs */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0047AB] hover:text-[#002b66] transition-colors"
                  >
                    <span>View Full Scope</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#002b66] hover:bg-[#0047AB] text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Need a specialized workflow or pilot trial?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              We process custom sample batches so you can inspect our turnaround and verification standards prior to commitment.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer mx-auto sm:mx-0"
          >
            <span>Request Sample Batch</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
