import React from 'react';
import { CheckCircle, Zap, Shield, Sliders } from 'lucide-react';

const TrustHighlights = () => {
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
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative group p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#2d3e50]/95 to-[#243342]/95 border border-[#88BDF2]/20 hover:border-[#88BDF2]/60 backdrop-blur-xl shadow-xl hover:shadow-[#384959]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#88BDF2]/15 border border-[#88BDF2]/30 group-hover:border-[#88BDF2] flex items-center justify-center text-[#88BDF2] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-[#1b2631] border border-[#384959] text-[#BDDDFC]">
                  {item.metric}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-[#88BDF2] transition-colors font-['Space_Grotesk']">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#BDDDFC]/75 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustHighlights;
