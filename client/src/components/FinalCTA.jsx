import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Clock } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-[#1b2631] via-[#243342] to-[#1b2631] overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#88BDF2]/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#2d3e50]/95 via-[#384959]/95 to-[#2d3e50]/95 border border-[#88BDF2]/35 backdrop-blur-2xl shadow-2xl shadow-black/60 text-center space-y-8 relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b2631]/80 border border-[#88BDF2]/30 text-xs font-semibold text-[#BDDDFC]">
            <Sparkles className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Ready to Eliminate Operational Bottlenecks?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] max-w-2xl mx-auto leading-tight">
            Have Data Work to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BDDDFC] via-[#88BDF2] to-[#6A89A7]">
              Outsource?
            </span>
          </h2>

          <p className="text-[#BDDDFC]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Let our team handle your data workload while you focus on growing your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-[#1b2631] bg-gradient-to-r from-[#88BDF2] to-[#BDDDFC] hover:from-[#BDDDFC] hover:to-[#88BDF2] rounded-xl shadow-xl shadow-[#1b2631]/80 border border-[#BDDDFC]/40 transition-all group"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-6 border-t border-[#384959] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#BDDDFC]/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#88BDF2]" />
              Free Pilot Samples
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#88BDF2]" />
              100% Confidential
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#88BDF2]" />
              Response in 12-24h
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
