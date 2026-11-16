import React from 'react';
import {
  FileCheck2,
  Lock,
  FolderLock,
  ShieldCheck,
  Trash2,
  Scale,
  CheckCircle2,
  UserCheck,
  Server
} from 'lucide-react';
import { securityPillarsData } from '../data/siteData';

const iconMap = {
  FileCheck2,
  Lock,
  FolderLock,
  ShieldCheck,
  Trash2,
  Scale
};

const DataSecurity = () => {
  return (
    <section id="security" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-white border-b border-slate-200/90 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-blue-50/70 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Confidentiality &amp; Information Protection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Data Security &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Confidentiality
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Data security is engineered into every stage of our operations. We enforce strict contractual, technical, and procedural safeguards to protect your business data at all times.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {securityPillarsData.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || ShieldCheck;

            return (
              <div
                key={pillar.id}
                className="group p-7 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-[#0047AB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Enforced Across All Projects</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Checklist Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-800 font-semibold">
            <UserCheck className="w-4 h-4 text-[#0047AB]" />
            <span>Dedicated Supervised Workstations</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-800 font-semibold">
            <FolderLock className="w-4 h-4 text-[#0047AB]" />
            <span>Encrypted Batch File Transfers</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-800 font-semibold">
            <Server className="w-4 h-4 text-[#0047AB]" />
            <span>Permanent Data Purge Following Sign-Off</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DataSecurity;
