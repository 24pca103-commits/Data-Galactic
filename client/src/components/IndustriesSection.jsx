import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Megaphone,
  Target,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Building2,
  Factory,
  Ship,
  UserCheck,
  BadgeDollarSign,
  Truck,
  Briefcase,
  Store,
  Building,
  ArrowRight,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { industriesData } from '../data/siteData';

const iconMap = {
  Cpu,
  Megaphone,
  Target,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Building2,
  Factory,
  Ship,
  UserCheck,
  BadgeDollarSign,
  Truck,
  Briefcase,
  Store,
  Building
};

const IndustriesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'tech-digital' | 'commerce-trade' | 'services-institutions'

  const allIndustries = Object.values(industriesData);

  const filterGroups = {
    'all': allIndustries,
    'tech-digital': allIndustries.filter(i => ['it-software', 'marketing-agencies', 'leadgen-agencies'].includes(i.id)),
    'commerce-trade': allIndustries.filter(i => ['ecommerce', 'manufacturing', 'export-import', 'logistics-transportation'].includes(i.id)),
    'services-institutions': allIndustries.filter(i => ['healthcare', 'education', 'real-estate', 'financial-services', 'consulting-services', 'recruitment-staffing', 'smes', 'enterprises'].includes(i.id))
  };

  const displayedIndustries = filterGroups[activeFilter] || allIndustries;

  return (
    <section id="industries" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-slate-50/70 border-b border-slate-200/90 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-100/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Target Industry Sectors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Industries We{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Support
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            DataGalactic supports businesses across 15 distinct sectors by tailoring our data capture, cleansing, research, and back-office workflows to specific industry compliance and reporting standards.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#002b66] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            All 15 Industries
          </button>
          <button
            onClick={() => setActiveFilter('tech-digital')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'tech-digital'
                ? 'bg-[#002b66] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Technology &amp; Agencies
          </button>
          <button
            onClick={() => setActiveFilter('commerce-trade')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'commerce-trade'
                ? 'bg-[#002b66] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Commerce, Logistics &amp; Manufacturing
          </button>
          <button
            onClick={() => setActiveFilter('services-institutions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'services-institutions'
                ? 'bg-[#002b66] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Professional Services &amp; Institutions
          </button>
        </div>

        {/* 15 Industries Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedIndustries.map((ind) => {
            const Icon = iconMap[ind.iconName] || Building2;

            return (
              <div
                key={ind.id}
                className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#0047AB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shadow-xs shrink-0">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] leading-snug">
                      {ind.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {ind.supportDetails}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Key Support Tasks:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {ind.keyTasks.slice(0, 2).map((t, ti) => (
                        <li key={ti} className="flex items-start gap-1.5">
                          <span className="text-[#0047AB] font-bold mt-0.5">•</span>
                          <span className="line-clamp-2">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/industries/${ind.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0047AB] hover:text-[#002b66] transition-colors"
                  >
                    <span>Industry Scope</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0047AB]"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Don't see your exact industry listed? We tailor our data processing pipelines to custom schemas and operational rules.{' '}
            <a href="#contact" className="text-[#0047AB] font-semibold hover:underline">
              Speak with our team →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
