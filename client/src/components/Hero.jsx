import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe2, Sparkles, Database, FileSpreadsheet, Layers } from 'lucide-react';
import DataVisualizer3D from './DataVisualizer3D';
import DataOpsVisualizer from './DataOpsVisualizer';

const Hero = () => {
  const trustHighlights = [
    'Accuracy-Focused Data Processing',
    'Reliable Project Delivery',
    'Strict NDA & Confidentiality',
    'Dedicated Project Coordination'
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#05142f] via-[#091f47] to-[#05142f]"
    >
      {/* Subtle 3D background ambient canvas */}
      <DataVisualizer3D />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-gradient-to-r from-[#0047AB]/20 via-[#4c8df7]/25 to-[#6366f1]/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-6 right-10 w-[420px] h-[260px] bg-[#0d4ba3]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full py-4">

          {/* Left Column: Core Positioning, Headline, Description, CTAs */}
          <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6">
            
            {/* Positioning Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-[11px] sm:text-xs font-semibold text-[#aac7ee] shadow-sm backdrop-blur-md max-w-full">
              <Globe2 className="w-3.5 h-3.5 text-[#4c8df7] shrink-0" />
              <span className="truncate sm:whitespace-normal">Data Management, Business Research &amp; Back-Office Outsourcing Partner</span>
            </div>

            {/* Main Headline (Exact Required Text) */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-white leading-[1.2] font-['Space_Grotesk'] break-words">
              Your Trusted Partner for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aac7ee] via-[#4c8df7] to-[#93c5fd]">
                Data Management &amp; Business Support
              </span>
            </h1>

            {/* Supporting Description (Exact Required Text) */}
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              We help businesses streamline their operations through reliable data entry, data processing, web research, lead generation, and back-office support services.
            </p>

            {/* Trust Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-300 max-w-xl font-medium pt-1">
              {trustHighlights.map((pt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA Buttons (Exact Required Labels) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#002b66] via-[#0047AB] to-[#0d4ba3] hover:from-[#0047AB] hover:to-[#1a64d2] rounded-xl shadow-[0_4px_20px_rgba(0,71,171,0.4)] border border-[#4c8df7]/40 transition-all cursor-pointer group text-center"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-[#0a1f45]/80 hover:bg-[#122f5c] rounded-xl border border-[#4c8df7]/30 hover:border-[#4c8df7]/70 backdrop-blur-md transition-all cursor-pointer text-center"
              >
                <Database className="w-4 h-4 mr-2 text-[#4c8df7]" />
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* International Target Markets Indicator */}
            <div className="pt-4 border-t border-[#122f5c] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 shrink-0">Targeting Global Enterprises:</span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#aac7ee] font-medium text-[11px] sm:text-xs">
                <span>United States</span>
                <span>•</span>
                <span>United Kingdom</span>
                <span>•</span>
                <span>Canada</span>
                <span>•</span>
                <span>Australia</span>
                <span>•</span>
                <span>UAE</span>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Data Operations & Spreadsheet Visualizer */}
          <div className="lg:col-span-5 relative flex justify-center px-2 sm:px-4 py-4 w-full">
            <DataOpsVisualizer />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
