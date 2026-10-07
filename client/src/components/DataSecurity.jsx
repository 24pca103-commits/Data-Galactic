import React from 'react';
import { ShieldCheck, Lock, KeyRound, CheckCheck, FolderLock, FileCheck2, UserCheck, Server } from 'lucide-react';

const DataSecurity = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Confidential Handling',
      description: 'Strict non-disclosure agreements (NDAs) signed prior to project kickoff. All project workflows remain strictly private and proprietary to your business.'
    },
    {
      icon: KeyRound,
      title: 'Controlled Access',
      description: 'Restricted system access adhering strictly to the principle of least privilege. Only authorized data specialists assigned to your project access your records.'
    },
    {
      icon: CheckCheck,
      title: 'Quality Verification',
      description: 'Multi-layer double-key data entry and independent supervisory audits ensure accurate outputs and prevent unintended data leaks or mistakes.'
    },
    {
      icon: FolderLock,
      title: 'Secure File Management',
      description: 'Encrypted transfer pipelines, password-protected deliverables, and permanent file purging protocols following project acceptance.'
    }
  ];

  return (
    <section id="security" className="py-24 relative bg-white border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-sky-100/50 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-sky-700 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Uncompromising Data Protection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Your Data Deserves the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              Highest Level of Care
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Data security is not an afterthought at DataGalactic—it is engineered into every stage of our daily operational workflow.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Checklist Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
            <UserCheck className="w-4 h-4 text-sky-600" />
            <span>Dedicated Confidential Workstations</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
            <FileCheck2 className="w-4 h-4 text-sky-600" />
            <span>Encrypted Batch File Transfers</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
            <Server className="w-4 h-4 text-sky-600" />
            <span>Clean Data Purge Upon Sign-off</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DataSecurity;
