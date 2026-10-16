import React from 'react';
import { Eye, MapPin, Mail, Phone, Globe2, ShieldCheck, Zap, Award, Users2, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const pillars = [
    {
      icon: Award,
      title: '99.9% Dual-Key Accuracy',
      desc: 'Every dataset undergoes rigorous multi-layer human proofreading and automated schema validation before delivery.'
    },
    {
      icon: Zap,
      title: '24–48h Rapid Turnaround',
      desc: 'Predictable delivery cycles and dedicated project leads keep your downstream business operations moving without delay.'
    },
    {
      icon: Users2,
      title: 'Up to 60% Cost Efficiency',
      desc: 'High-throughput offshore execution from Tamil Nadu, India, delivering enterprise quality at a fraction of internal hiring costs.'
    },
    {
      icon: ShieldCheck,
      title: 'Strict NDA & Confidentiality',
      desc: 'Encrypted storage, restricted terminal access, and zero data-sharing protocols safeguard all intellectual property.'
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 lg:scroll-mt-28 py-10 sm:py-12 relative bg-slate-50/80 overflow-hidden border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-100/50 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Center aligned */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <Eye className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Company Snapshot &amp; Operational Standards</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk'] leading-tight">
            Your Trusted{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Data Support Partner
            </span>
          </h2>

          {/* Short, crisp main lines */}
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-normal">
            DataGalactic is a specialized data entry and business support operations firm based in Tamil Nadu, India, partnering with international enterprises across the US, UK, and Europe.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-mono">
            High-Volume Execution | Zero Overhead | Reliable International Delivery
          </p>
        </div>

        {/* Fresh 4-Card Modern Grid Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pillars.map((item, idx) => {
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
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#0047AB]">
                  <span>Enterprise SLA</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Verification & Direct Details Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center font-bold text-sm">
              DG
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 font-['Outfit']">DataGalactic Operations Center</p>
              <p className="text-xs text-slate-500">Tamil Nadu, India | Worldwide Client Deliveries</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-700 font-medium">
            <a href="mailto:hello@datagalactic.in" className="flex items-center gap-1.5 hover:text-[#0047AB] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#0047AB]" />
              <span>hello@datagalactic.in</span>
            </a>
            <a href="tel:+919363164608" className="flex items-center gap-1.5 hover:text-[#0047AB] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#0047AB]" />
              <span>+91 9363164608</span>
            </a>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Direct Project Supervision
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
