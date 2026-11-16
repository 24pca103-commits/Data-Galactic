import React from 'react';
import {
  Send,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Handshake,
  ArrowRight,
  GitCommit,
  Sparkles
} from 'lucide-react';
import { howItWorksSteps } from '../data/siteData';

const iconMap = {
  Send,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Handshake
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-white border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-50/70 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <GitCommit className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Structured 5-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Works
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our transparent 5-step onboarding and execution framework ensures clear communication, zero scope ambiguity, and dependable delivery.
          </p>
        </div>

        {/* 5-Step Timeline Cards */}
        <div className="relative">
          {/* Subtle desktop connecting guide line */}
          <div className="hidden xl:block absolute top-1/2 left-[5%] right-[5%] h-0.5 -translate-y-8 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0 opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
            {howItWorksSteps.map((item, index) => {
              const Icon = iconMap[item.iconName] || Send;

              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-[#0047AB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Step Pill & Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shadow-xs">
                        <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-[#0047AB] transition-colors">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] mb-2.5">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight Tag */}
                  <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#0047AB] uppercase tracking-wider">
                      {item.highlight}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0047AB]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Start Step 1: Share Your Requirements</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
