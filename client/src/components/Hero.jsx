import React from 'react';
import { ArrowRight, ShieldCheck, Database, FileSpreadsheet, CheckCircle2, Lock, Cpu, Globe2, Sparkles, Layers, CheckCircle, Zap, Shield, Sliders } from 'lucide-react';
import DataVisualizer3D from './DataVisualizer3D';

const Hero = () => {
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
    <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-0 overflow-hidden bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]">
      <DataVisualizer3D />

      {/* Sky blue ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#38bdf8]/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#0284c7]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-[#38bdf8]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21262d]/80 border border-[#38bdf8]/30 text-xs font-semibold text-[#7dd3fc] shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
              <Globe2 className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>International B2B Data &amp; Operations Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-['Space_Grotesk']">
              Your Data. Our Expertise.{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#0284c7]">
                Your Business, Simplified.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Reliable data entry and back-office support that helps global businesses save time, reduce operational costs, and focus on what matters most.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto lg:mx-0 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>99.9% Accuracy SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>Strict Confidentiality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>Cost-Efficient Scaling</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl shadow-lg shadow-[#0284c7]/30 border border-[#38bdf8]/40 transition-all active:scale-[0.98] group"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-medium text-slate-200 bg-[#21262d]/70 hover:bg-[#21262d] border border-[#30363d] rounded-xl transition-all"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Metrics Bar */}
            <div className="pt-6 border-t border-[#21262d] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">100%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Confidentiality</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#38bdf8] font-['Space_Grotesk']">24-48h</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Rapid Turnaround</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#7dd3fc] font-['Space_Grotesk']">60%+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Cost Savings</p>
              </div>
            </div>
          </div>

          {/* Right Column: Pipeline Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Card */}
              <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#21262d]/95 to-[#161b22]/98 border border-[#30363d] backdrop-blur-xl shadow-2xl space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#21262d] pb-4 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">Data Processing Pipeline</h4>
                      <p className="text-[11px] text-slate-500 truncate">Live Enterprise Workflow</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 ml-2 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    Active SLA
                  </span>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#0d1117]/60 border border-[#21262d] flex items-center justify-between hover:border-[#38bdf8]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#38bdf8]/10 text-[#38bdf8] shrink-0">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">Raw Data Ingestion &amp; OCR</p>
                        <p className="text-[10px] text-slate-500 truncate">PDF, Excel, Sheets, Forms</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#38bdf8] font-medium shrink-0 ml-2">99.98% Parsed</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0d1117]/60 border border-[#21262d] flex items-center justify-between hover:border-[#38bdf8]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#0284c7]/20 text-[#7dd3fc] shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">Data Cleansing &amp; Formatting</p>
                        <p className="text-[10px] text-slate-500 truncate">Deduplication &amp; Alignment</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-medium shrink-0 ml-2">Verified</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0d1117]/60 border border-[#21262d] flex items-center justify-between hover:border-[#38bdf8]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#38bdf8]/10 text-[#38bdf8] shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">Double-Key QA &amp; Verification</p>
                        <p className="text-[10px] text-slate-500 truncate">Zero Error Tolerance Protocol</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#7dd3fc] font-medium shrink-0 ml-2">100% Passed</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#38bdf8]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Encrypted &amp; Confidential Handover</span>
                  </div>
                  <span className="font-mono text-slate-500">Tier-1 Security</span>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="hidden sm:flex absolute -top-5 -right-5 p-3 rounded-xl bg-[#21262d] border border-[#38bdf8]/30 backdrop-blur-md shadow-xl items-center gap-2.5">
                <Database className="w-4 h-4 text-[#38bdf8]" />
                <div>
                  <p className="text-[11px] font-semibold text-white">Database Synchronization</p>
                  <p className="text-[9px] text-[#7dd3fc]">Clean Records Structured</p>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-5 -left-5 p-3 rounded-xl bg-[#161b22] border border-[#30363d] backdrop-blur-md shadow-xl items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-[11px] font-semibold text-white">Dedicated Support</p>
                  <p className="text-[9px] text-slate-400">Direct Project Supervision</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Highlight Cards — bottom of hero */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative group p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#21262d]/95 to-[#161b22]/95 border border-[#30363d] hover:border-[#38bdf8]/50 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 group-hover:border-[#38bdf8]/60 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#21262d] text-[#7dd3fc]">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#38bdf8] transition-colors font-['Space_Grotesk']">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
