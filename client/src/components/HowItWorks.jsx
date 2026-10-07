import React from 'react';
import { Send, FileSearch, ShieldCheck, CheckCircle2, ArrowRight, GitCommit } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Share Your Requirements',
      description: 'Send us your raw files, data schemas, guidelines, or sample documents via our secure portal or email.',
      icon: Send,
      highlight: 'Free Sample Test'
    },
    {
      title: 'We Understand Your Workflow',
      description: 'Our project leads analyze your requirements, establish standard operating procedures (SOPs), and set up verification rules.',
      icon: FileSearch,
      highlight: 'Custom SOP Setup'
    },
    {
      title: 'We Process & Verify',
      description: 'Trained data specialists execute the tasks followed by strict double-key quality audits to eliminate inaccuracies.',
      icon: ShieldCheck,
      highlight: 'Double-Key QA'
    },
    {
      title: 'Final Delivery',
      description: 'Structured, clean data files are securely delivered in your preferred format on or ahead of schedule.',
      icon: CheckCircle2,
      highlight: 'Secure Handover'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-slate-50 border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-100/60 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-700 shadow-sm">
            <GitCommit className="w-3.5 h-3.5 text-sky-600" />
            <span>Seamless Project Onboarding</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              Works
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our 4-step execution framework guarantees frictionless onboarding, total transparency, and flawless data delivery for global clients.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-0.5 -translate-y-6 bg-gradient-to-r from-slate-200 via-sky-300 to-slate-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 group-hover:border-sky-300 flex items-center justify-center text-sky-600 group-hover:scale-110 shadow-sm transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors font-['Space_Grotesk'] mb-3">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight pill bottom */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-sky-700 font-semibold uppercase tracking-wider">
                      {item.highlight}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Onboarding Callout */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-900 hover:bg-sky-700 rounded-xl shadow-lg transition-all group"
          >
            <span>Start Your Project Ingestion</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
