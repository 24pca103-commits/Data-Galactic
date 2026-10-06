import React from 'react';
import {
  ShieldCheck,
  Coins,
  Zap,
  Lock,
  Sliders,
  Headphones,
  CheckCircle2,
  Award,
  Sparkles
} from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Accuracy First',
      description: 'Zero-tolerance error protocols featuring double-key entry and independent quality audits to ensure complete data integrity.',
      stat: '99.9% Accuracy SLA'
    },
    {
      icon: Coins,
      title: 'Cost Efficient',
      description: 'Eliminate internal recruitment, software overheads, and local facility costs while slashing operational expenses by up to 60%.',
      stat: 'Up to 60% Savings'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Streamlined shift scheduling and agile workflows deliver batch projects within agreed international timeframes without delays.',
      stat: '24-48h Delivery'
    },
    {
      icon: Lock,
      title: 'Data Confidentiality',
      description: 'Comprehensive Non-Disclosure Agreements, restricted system access, and secure data handling procedures protect your intellectual property.',
      stat: 'Strict NDA & Protection'
    },
    {
      icon: Sliders,
      title: 'Flexible Support',
      description: 'Seamlessly scale from a 20-hour trial project to a dedicated team matching seasonal peaks and enterprise demand.',
      stat: 'Elastic On-Demand Scaling'
    },
    {
      icon: Headphones,
      title: 'Dedicated Assistance',
      description: 'Direct communication with dedicated project supervisors and account managers for swift alignment and real-time status reporting.',
      stat: 'Direct Account Supervision'
    }
  ];

  return (
    <section className="py-24 relative bg-[#1b2631] overflow-hidden">
      
      {/* Background Subtle Shapes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#88BDF2]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#384959]/80 border border-[#88BDF2]/30 text-xs font-semibold text-[#BDDDFC]">
            <Award className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>The Enterprise Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Why Businesses Choose to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BDDDFC] via-[#88BDF2] to-[#6A89A7]">
              Work With Us
            </span>
          </h2>
          <p className="text-[#BDDDFC]/80 text-base sm:text-lg leading-relaxed">
            International enterprises partner with DataGalactic because we blend human precision, systematic workflows, and uncompromising data security.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2d3e50]/95 to-[#243342]/95 border border-[#88BDF2]/20 hover:border-[#88BDF2]/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[#384959]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#88BDF2]/15 border border-[#88BDF2]/30 group-hover:border-[#88BDF2] flex items-center justify-center text-[#88BDF2] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#1b2631] border border-[#384959] text-[#BDDDFC]">
                      {benefit.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#88BDF2] transition-colors font-['Space_Grotesk'] mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-[#BDDDFC]/75 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#384959]/80 flex items-center gap-2 text-xs text-[#6A89A7]">
                  <CheckCircle2 className="w-4 h-4 text-[#88BDF2] shrink-0" />
                  <span>Enterprise SLA Covered</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2d3e50]/90 via-[#243342]/95 to-[#2d3e50]/90 border border-[#88BDF2]/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#88BDF2]" />
              Looking for a tailored pilot project?
            </h4>
            <p className="text-xs sm:text-sm text-[#BDDDFC]/80">
              We offer low-risk pilot batches so you can test our speed, format compliance, and precision firsthand.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#1b2631] bg-gradient-to-r from-[#88BDF2] to-[#BDDDFC] hover:from-[#BDDDFC] hover:to-[#88BDF2] rounded-xl shadow-md transition-all shrink-0"
          >
            Request a Pilot Test
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
