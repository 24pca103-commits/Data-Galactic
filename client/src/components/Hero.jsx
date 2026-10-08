import React from 'react';
import { ArrowRight, ShieldCheck, FileSpreadsheet, CheckCircle2, Lock, Cpu, Globe2, Sparkles, Layers, CheckCircle, Zap, Shield, Sliders } from 'lucide-react';
import DataVisualizer3D from './DataVisualizer3D';
import heroImage from '../assets/hero.png';

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
    <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-0 overflow-hidden bg-gradient-to-b from-[#05142f] via-[#0a1f45] to-[#05142f]">
      <DataVisualizer3D />

      {/* Sky blue ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4c8df7]/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#0d4ba3]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-[#4c8df7]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122f5c]/80 border border-[#4c8df7]/30 text-xs font-semibold text-[#aac7ee] shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-[#4c8df7] animate-ping" />
              <Globe2 className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span>International B2B Data &amp; Operations Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-['Space_Grotesk']">
              Your Data. Our Expertise.{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#aac7ee] via-[#4c8df7] to-[#0d4ba3]">
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
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>99.9% Accuracy SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>Strict Confidentiality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>Cost-Efficient Scaling</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-[#0d4ba3] hover:bg-[#0a3b80] rounded-xl shadow-lg shadow-[#0d4ba3]/30 border border-[#4c8df7]/40 transition-all active:scale-[0.98] group"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-medium text-slate-200 bg-[#122f5c]/70 hover:bg-[#122f5c] border border-[#1e4480] rounded-xl transition-all"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Metrics Bar */}
            <div className="pt-6 border-t border-[#122f5c] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">100%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Confidentiality</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#4c8df7] font-['Space_Grotesk']">24-48h</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Rapid Turnaround</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#aac7ee] font-['Space_Grotesk']">60%+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Cost Savings</p>
              </div>
            </div>
          </div>

          {/* Right Column: Pipeline Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Card */}
              <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#122f5c]/95 to-[#0a1f45]/98 border border-[#1e4480] backdrop-blur-xl shadow-2xl space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#122f5c] pb-4 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#4c8df7]/15 border border-[#4c8df7]/30 flex items-center justify-center text-[#4c8df7] shrink-0">
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
                  <div className="p-3.5 rounded-xl bg-[#05142f]/60 border border-[#122f5c] flex items-center justify-between hover:border-[#4c8df7]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#4c8df7]/10 text-[#4c8df7] shrink-0">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">Raw Data Ingestion &amp; OCR</p>
                        <p className="text-[10px] text-slate-500 truncate">PDF, Excel, Sheets, Forms</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#4c8df7] font-medium shrink-0 ml-2">99.98% Parsed</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#05142f]/60 border border-[#122f5c] flex items-center justify-between hover:border-[#4c8df7]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#0d4ba3]/20 text-[#aac7ee] shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">Data Cleansing &amp; Formatting</p>
                        <p className="text-[10px] text-slate-500 truncate">Deduplication &amp; Alignment</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-medium shrink-0 ml-2">Verified</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#05142f]/60 border border-[#122f5c] flex items-center justify-between hover:border-[#4c8df7]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#4c8df7]/10 text-[#4c8df7] shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">Double-Key QA &amp; Verification</p>
                        <p className="text-[10px] text-slate-500 truncate">Zero Error Tolerance Protocol</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#aac7ee] font-medium shrink-0 ml-2">100% Passed</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#4c8df7]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Encrypted &amp; Confidential Handover</span>
                  </div>
                  <span className="font-mono text-slate-500">Tier-1 Security</span>
                </div>
              </div>

              {/* Floating Image Badge */}
              <div className="hidden sm:block absolute -top-5 -right-5 p-1.5 rounded-xl bg-[#122f5c]/90 border border-[#4c8df7]/30 backdrop-blur-md shadow-xl">
                <img
                  src={heroImage}
                  alt="DataGalactic data operations"
                  className="w-28 h-auto object-contain rounded-lg"
                />
              </div>

              <div className="hidden sm:flex absolute -bottom-5 -left-5 p-3 rounded-xl bg-[#0a1f45] border border-[#1e4480] backdrop-blur-md shadow-xl items-center gap-2.5">
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

      {/* Trust Highlight Cards — bottom strip with white background */}
      <div className="relative z-20 w-full bg-white border-t border-b border-slate-200/80 py-10 mt-12">
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
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
