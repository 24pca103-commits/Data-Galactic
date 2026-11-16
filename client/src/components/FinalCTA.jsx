import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Clock, Mail } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-14 sm:py-20 relative bg-white border-b border-slate-200/90 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-50/80 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#05142f] via-[#091f47] to-[#05142f] border border-[#142d57] shadow-2xl text-center space-y-5 relative overflow-hidden text-white">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
            <span>Ready to Eliminate Operational Backlogs?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] max-w-3xl mx-auto leading-tight">
            Scale Your Business With a Trusted{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aac7ee] via-[#4c8df7] to-[#93c5fd]">
              Data Operations Partner
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Eliminate tedious manual data tasks, improve database accuracy, and lower operating overhead. Request a free quote or test batch today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-[#0047AB] hover:bg-[#1258c7] rounded-xl shadow-lg transition-all group cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="mailto:hello@datagalactic.in"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/15 transition-all"
            >
              <Mail className="w-4 h-4 text-[#4c8df7]" />
              <span>Email Requirements Directly</span>
            </a>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-8 border-t border-[#142d57] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Free Pilot Sample Available</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict NDA &amp; Confidentiality</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Response in 12–24 Hours</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
