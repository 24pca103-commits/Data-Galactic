import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, TrendingUp, Clock, ShieldAlert, Sparkles } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      title: 'Costly In-House Overhead',
      desc: 'Hiring and training full-time internal staff for repetitive data tasks drains enterprise capital and management bandwidth.'
    },
    {
      title: 'Human Errors & Data Inconsistencies',
      desc: 'Rushed team members cause formatting mismatches, duplicate records, and inaccurate reporting.'
    },
    {
      title: 'Bottlenecks in Core Operations',
      desc: 'High-value developers, analysts, and managers get dragged into manual copy-pasting, formatting, and web research.'
    }
  ];

  const solutions = [
    {
      title: 'Dedicated Data Specialists',
      desc: 'Instant access to trained data technicians equipped with rigorous multi-tier verification workflows.'
    },
    {
      title: '60%+ Operational Cost Reduction',
      desc: 'Pay strictly for the volume and service hours you need without paying fixed local salaries or equipment costs.'
    },
    {
      title: 'Laser Focus on Core Growth',
      desc: 'Free your in-house executives to focus on client acquisition, product development, and strategic expansion.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#1b2631]">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#88BDF2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6A89A7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#384959]/80 border border-[#88BDF2]/30 text-xs font-semibold text-[#BDDDFC]">
            <Clock className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Operational Efficiency Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Too Much Data. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BDDDFC] via-[#88BDF2] to-[#6A89A7]">Not Enough Time?</span>
          </h2>
          <p className="text-[#BDDDFC]/80 text-base sm:text-lg leading-relaxed">
            Repetitive data tasks can consume valuable time and resources. Our team helps businesses outsource their data workload so they can focus on growth and core operations.
          </p>
        </div>

        {/* Side-by-Side Problem vs Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Problem Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#24171d]/90 to-[#1d1217]/95 border border-red-900/30 backdrop-blur-xl relative flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">The In-House Data Struggle</h3>
                  <p className="text-xs text-red-400/90">Time-consuming, costly, and error-prone</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {problems.map((prob, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#1b2631]/60 border border-red-950/60 flex items-start gap-3.5">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{prob.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{prob.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-950 text-xs text-red-300/70 italic flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>Result: Stagnant pipeline, employee burnout, and costly errors.</span>
            </div>
          </div>

          {/* Solution Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#2d3e50]/95 to-[#243342]/95 border border-[#88BDF2]/40 backdrop-blur-xl shadow-2xl shadow-[#1b2631]/60 relative flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#88BDF2]/20 border border-[#88BDF2]/50 flex items-center justify-center text-[#88BDF2] shadow-md shadow-[#88BDF2]/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">The DataGalactic Engine</h3>
                  <p className="text-xs text-[#BDDDFC]">Fast, 99.9% accurate, scalable & secure</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {solutions.map((sol, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#1b2631]/80 border border-[#384959] flex items-start gap-3.5 hover:border-[#88BDF2]/40 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#88BDF2] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{sol.title}</h4>
                      <p className="text-xs text-[#BDDDFC]/80 mt-1 leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#384959] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#BDDDFC] flex items-center gap-2 font-medium">
                <TrendingUp className="w-4 h-4 text-[#88BDF2]" />
                <span>Gain a streamlined operational advantage.</span>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-[#1b2631] bg-gradient-to-r from-[#88BDF2] to-[#BDDDFC] hover:from-[#BDDDFC] hover:to-[#88BDF2] rounded-xl shadow-md shadow-[#1b2631]/80 transition-all group shrink-0"
              >
                <span>Outsource Your Data Work</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;
