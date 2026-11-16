import React from 'react';
import {
  ShieldCheck,
  Clock,
  Sliders,
  TrendingUp,
  Lock,
  UserCheck,
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { whyChooseUsData } from '../data/siteData';

const iconMap = {
  ShieldCheck,
  Clock,
  Sliders,
  TrendingUp,
  Lock,
  UserCheck
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-slate-50 border-b border-slate-200 overflow-hidden">
      
      {/* Background Subtle Shapes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-100/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Built on Trust &amp; Operational Rigor</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              DataGalactic
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            International businesses choose DataGalactic because we combine thorough human verification, dependable project timelines, and uncompromising confidentiality.
          </p>
        </div>

        {/* 6 Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((benefit) => {
            const Icon = iconMap[benefit.iconName] || ShieldCheck;
            return (
              <div
                key={benefit.id}
                className="group relative p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#0047AB] transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 shadow-xs">
                      {benefit.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#0047AB]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standard Operational Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Evaluate our capabilities with zero commitment
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Send us a test batch of 50-100 records to inspect our accuracy and communication before signing.
            </p>
          </div>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shrink-0 text-center"
          >
            <span>Request a Free Pilot Batch</span>
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
