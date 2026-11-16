import React from 'react';
import { ShieldCheck, Award, Users2, Zap, ArrowRight, Building2, Globe2, CheckCircle2, Lock, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Accuracy-First Execution',
      desc: 'Disciplined multi-stage quality checks and supervisory reviews ensure near-zero error rates across every data batch.'
    },
    {
      icon: Lock,
      title: 'Confidentiality & Security',
      desc: 'Comprehensive non-disclosure agreements (NDAs), restricted-access workstations, and permanent data deletion upon project acceptance.'
    },
    {
      icon: Zap,
      title: 'Reliable Project Turnaround',
      desc: 'Predictable delivery cycles and structured shift planning keep your downstream business operations moving without delays.'
    },
    {
      icon: Users2,
      title: 'Operational Cost Efficiency',
      desc: 'Dependable offshore operational execution based in Tamil Nadu, India, delivering enterprise-grade accuracy at a fraction of domestic costs.'
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 lg:scroll-mt-28 py-12 sm:py-16 relative bg-slate-50/90 overflow-hidden border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-100/50 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Center aligned */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>About DataGalactic</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk'] leading-tight">
            Your Dedicated{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Outsourcing Partner
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            DataGalactic is an international data management, business research, and back-office outsourcing firm based in Tamil Nadu, India, partnering with clients across the United States, United Kingdom, Canada, Australia, and the United Arab Emirates.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-mono">
            Data Management • Business Research • Back-Office Support
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {coreValues.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0047AB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shadow-xs mb-5">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#0047AB]">
                  <span>Operational Standard</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Verification & Direct Details Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0047AB] border border-blue-100 flex items-center justify-center font-bold text-base font-['Outfit'] shrink-0">
              DG
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 font-['Outfit']">DataGalactic Operations Center</p>
              <p className="text-xs text-slate-500">Tamil Nadu, India | Serving International Enterprises</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 text-xs w-full md:w-auto">
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors text-center"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0047AB]" />
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white font-semibold transition-colors text-center"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
