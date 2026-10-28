import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Globe2, 
  Sparkles, 
  CheckCircle, 
  Zap, 
  Shield, 
  Sliders, 
  Award 
} from 'lucide-react';
import DataVisualizer3D from './DataVisualizer3D';
import CyberPortal3D from './CyberPortal3D';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'International Data & Operations Partner',
      titleLine1: 'Your Data. Our Expertise.',
      titleLine2: 'Your Business, Simplified.',
      description: 'Reliable data entry and back-office support that helps global businesses save time, reduce operational costs, and focus on what matters most.',
      checkpoints: ['99.9% Accuracy SLA', 'Strict Confidentiality', 'Cost-Efficient Scaling'],
      ctaText: 'Get a Free Quote',
      metrics: [
        { val: '100%', label: 'Confidentiality' },
        { val: '24-48h', label: 'Rapid Turnaround' },
        { val: '60%+', label: 'Cost Savings' }
      ]
    },
    {
      badge: 'High-Throughput Enterprise Data Cleansing',
      titleLine1: 'Precision Data Processing.',
      titleLine2: 'Near-Zero Error Rates.',
      description: 'From high-volume spreadsheets to complex document conversion, our dual-key QA workflow audits every single data point for mission-critical accuracy.',
      checkpoints: ['Double-Key QA Audits', 'Structured Formatting', 'Seamless Document Conversion'],
      ctaText: 'Explore Data Services',
      metrics: [
        { val: '99.98%', label: 'Quality Verification' },
        { val: 'Same-Day', label: 'Batch Execution' },
        { val: 'Dual QA', label: 'Manual & System Check' }
      ]
    },
    {
      badge: 'Dedicated Back-Office Operations Backbone',
      titleLine1: 'Scale Global Workloads.',
      titleLine2: 'Without In-House Overhead.',
      description: 'Serving international clients across the US, UK, Europe, and worldwide with reliable operational delivery, predictable SLAs, and direct supervisory communication.',
      checkpoints: ['ISO SLA Standards', 'Dedicated Project Leads', 'Flexible On-Demand Scale'],
      ctaText: 'Schedule Consultation',
      metrics: [
        { val: '24/7', label: 'Secure Portal Sync' },
        { val: '100%', label: 'Strict NDA Compliance' },
        { val: 'Global', label: 'Enterprise Delivery' }
      ]
    }
  ];

  // Auto-slide every 5.5 seconds (bg remains static, only font & text slide smoothly)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  const highlights = [
    {
      icon: CheckCircle,
      title: 'Accurate Data Processing',
      description: 'Rigorous multi-stage validation ensures near-zero error rates on every batch.',
      metric: '99.9% Accuracy'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Dedicated workflows optimized for rapid turnaround and consistent delivery cycles.',
      metric: '24-48h Delivery'
    },
    {
      icon: Shield,
      title: 'Secure Handling',
      description: 'Restricted-access environments and strict NDAs ensure complete confidentiality.',
      metric: '100% Confidential'
    },
    {
      icon: Sliders,
      title: 'Flexible Support',
      description: 'Easily scale project capacity up or down to match seasonal and enterprise demand.',
      metric: 'On-Demand Scale'
    }
  ];

  return (
    <section id="home" className="relative flex flex-col items-center pt-28 sm:pt-32 lg:pt-36 pb-0 overflow-hidden bg-gradient-to-b from-[#05142f] via-[#0a1f45] to-[#05142f]">
      <DataVisualizer3D />

      {/* Dynamic Slide Background Ambient Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] blur-[150px] rounded-full pointer-events-none transition-all duration-1000 ${
          currentSlide === 0
            ? 'bg-[#0047AB]/15'
            : currentSlide === 1
            ? 'bg-[#4c8df7]/18'
            : 'bg-[#6366f1]/15'
        }`}
      />
      <div className="absolute bottom-6 right-10 w-[400px] h-[250px] bg-[#0d4ba3]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full pt-4 pb-4">

          {/* Left Column: Original 3 Smooth Sliding Text Content Sets starting from the left matching logo */}
          <div className="lg:col-span-7 text-left">

            {/* Content Container with Uniform Even Spacing */}
            <div
              key={currentSlide}
              className="space-y-4 sm:space-y-4.5 animate-in fade-in slide-in-from-right-4 duration-700 ease-out"
            >
              {/* Pill Badge (No dot) */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] shadow-sm backdrop-blur-md">
                  <Globe2 className="w-3.5 h-3.5 text-[#4c8df7]" />
                  <span>{active.badge}</span>
                </div>
              </div>

              {/* Main Headline - Strictly Two Clean Lines with Even Line Spacing */}
              <h1 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold tracking-tight text-white leading-[1.22] font-['Space_Grotesk'] text-left">
                <span className="block whitespace-nowrap">{active.titleLine1}</span>
                <span className="block whitespace-nowrap mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#aac7ee] via-[#4c8df7] to-[#818cf8]">
                  {active.titleLine2}
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl text-left leading-normal font-normal">
                {active.description}
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm text-slate-300 max-w-xl text-left font-medium">
                {active.checkpoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* CTA Group */}
              <div className="flex items-center justify-start">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-[#002b66] hover:bg-[#0047AB] rounded-xl shadow-lg border border-[#4c8df7]/40 transition-all group cursor-pointer"
                >
                  <span>{active.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Metrics Bar */}
              <div className="pt-4 border-t border-[#122f5c] grid grid-cols-3 gap-4 text-left">
                {active.metrics.map((m, mi) => (
                  <div key={mi}>
                    <p className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">{m.val}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-medium">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Cybernetic Portal (from reference image) */}
          <div className="lg:col-span-5 relative flex justify-center items-center px-3 sm:px-6 py-4">
            <div className="relative w-full max-w-md flex flex-col items-center">
              
              {/* Outer soft cyan & blue ambient bloom */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/25 via-blue-600/30 to-purple-600/20 rounded-full blur-3xl opacity-80 pointer-events-none" />

              {/* 3D Cybernetic Holographic Portal Component */}
              <CyberPortal3D />

              {/* Floating Glowing Badges around the 3D Portal */}
              {/* 1. Top-Left: 99.9% Accuracy */}
              <div className="absolute -top-2 -left-2 sm:-left-4 z-20 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f2d]/95 border border-cyan-400/80 shadow-[0_0_18px_rgba(6,182,212,0.4)] backdrop-blur-md flex items-center gap-2 text-white animate-float-gentle">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold text-xs sm:text-[13px] text-white tracking-wide">99.9% Accuracy</span>
              </div>

              {/* 2. Top-Right: Modern Tech */}
              <div className="absolute top-4 -right-2 sm:-right-4 z-20 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f2d]/95 border border-cyan-400/80 shadow-[0_0_18px_rgba(6,182,212,0.4)] backdrop-blur-md flex items-center gap-2 text-white animate-float-delayed">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold text-xs sm:text-[13px] text-white tracking-wide">Modern Tech</span>
              </div>

              {/* 3. Bottom-Left: Zero Error SLA */}
              <div className="absolute bottom-6 -left-2 sm:-left-4 z-20 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f2d]/95 border border-cyan-400/80 shadow-[0_0_18px_rgba(6,182,212,0.4)] backdrop-blur-md flex items-center gap-2 text-white animate-float-slow">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-xs sm:text-[13px] text-white tracking-wide">Zero Error SLA</span>
              </div>

              {/* 4. Bottom-Right: Pure Precision */}
              <div className="absolute -bottom-2 -right-2 sm:-right-4 z-20 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f2d]/95 border border-cyan-400/80 shadow-[0_0_18px_rgba(6,182,212,0.4)] backdrop-blur-md flex items-center gap-2 text-white animate-float-gentle">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-xs sm:text-[13px] text-white tracking-wide">Pure Precision</span>
              </div>

            </div>
          </div>
        </div>

        {/* Center Bottom Sliding Controls (No numbers, purely smooth rounded pills) */}
        <div className="flex items-center justify-center gap-2 pt-4 pb-4 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlide === idx
                  ? 'w-10 bg-[#4c8df7] shadow-lg shadow-[#4c8df7]/50'
                  : 'w-2.5 bg-slate-600/80 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Highlight Cards — bottom strip with white background */}
      <div className="relative z-20 w-full bg-white border-t border-b border-slate-200/80 py-6 sm:py-7 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative group p-5 sm:p-6 rounded-2xl bg-sky-50/90 hover:bg-sky-50 border border-sky-200/90 hover:border-sky-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-sky-200 flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-6 h-6 text-blue-950" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-white border border-sky-200 text-blue-950 shadow-xs">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-['Space_Grotesk']">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
