import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Database,
  ArrowRight,
  Filter,
  Layers,
  Sparkles,
  Globe2,
  Clock,
  Lock
} from 'lucide-react';

const DataOpsVisualizer = () => {
  const [activeTab, setActiveTab] = useState(0); // 0: Spreadsheet Hygiene, 1: Web & Company Research, 2: Operational QA
  const [processedRows, setProcessedRows] = useState(14820);

  // Gentle real-time record count tick
  useEffect(() => {
    const timer = setInterval(() => {
      setProcessedRows(prev => prev + 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const sampleSpreadsheetRows = [
    {
      id: 'DG-1042',
      raw: 'Acme Corp Inc. | +1(555)019-281 | NY',
      cleaned: 'Acme Corporation | +1-555-019-2810 | New York, NY',
      status: 'Standardized',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'DG-1043',
      raw: 'global logistics ltd | duplicate record',
      cleaned: 'Global Logistics Ltd | Master Consolidated',
      status: 'Deduplicated',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'DG-1044',
      raw: 'Dr. Sarah Jenkins | clinic intake pdf',
      cleaned: 'Sarah Jenkins, MD | Chart Digitized (100% Match)',
      status: 'Verified',
      statusColor: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30'
    }
  ];

  const sampleResearchRows = [
    {
      company: 'Apex Cloud Solutions',
      domain: 'apexcloud.io',
      location: 'New York, US',
      verifiedData: 'Headcount: 240+ | Industry: Cloud Infrastructure',
      status: 'Verified Profile'
    },
    {
      company: 'Horizon Global Logistics',
      domain: 'horizonlog.com',
      location: 'London, UK',
      verifiedData: 'Fleet: 1,800 Units | Compliance: ISO 9001',
      status: 'Verified Profile'
    },
    {
      company: 'Summit Health Network',
      domain: 'summithealth.org',
      location: 'Toronto, CA',
      verifiedData: 'Facilities: 18 Clinics | Accreditation: JCI',
      status: 'Verified Profile'
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

      {/* Floating Badge Top Right - responsive positioned to never overflow */}
      <div className="hidden xs:flex sm:flex absolute -top-3 right-1 sm:-right-3 z-20 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#07132b]/95 border border-cyan-400/60 shadow-[0_4px_20px_rgba(6,182,212,0.25)] backdrop-blur-md items-center gap-1.5 sm:gap-2 text-white text-[11px] sm:text-xs font-semibold max-w-[90%]">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="truncate">Multi-Stage Quality Audits</span>
      </div>

      {/* Main Console Box */}
      <div className="relative rounded-2xl overflow-hidden bg-[#081836]/95 border border-[#1e3f73] shadow-2xl backdrop-blur-xl">
        
        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#061229] border-b border-[#142d57]">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shrink-0" />
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">
              datagalactic://ops-pipeline.preview
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-medium text-emerald-400 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Active Shift</span>
          </div>
        </div>

        {/* Global Delivery Hubs Indicator */}
        <div className="px-3 sm:px-4 py-2 bg-[#091b3d] border-b border-[#142d57] flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs text-slate-300">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
            <Globe2 className="w-3.5 h-3.5 text-[#4c8df7]" />
            Serving Clients In:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs font-medium text-[#aac7ee]">
            <span>🇺🇸 US</span>
            <span>•</span>
            <span>🇬🇧 UK</span>
            <span>•</span>
            <span>🇨🇦 CA</span>
            <span>•</span>
            <span>🇦🇺 AU</span>
            <span>•</span>
            <span>🇦🇪 UAE</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="grid grid-cols-3 p-1 sm:p-1.5 bg-[#06142e] border-b border-[#142d57] gap-1">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 0
                ? 'bg-[#122f5c] text-white shadow-sm border border-[#4c8df7]/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c2246]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#4c8df7] shrink-0" />
            <span className="truncate">Data Cleaning</span>
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 1
                ? 'bg-[#122f5c] text-white shadow-sm border border-[#4c8df7]/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c2246]'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">Web Research</span>
          </button>

          <button
            onClick={() => setActiveTab(2)}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 2
                ? 'bg-[#122f5c] text-white shadow-sm border border-[#4c8df7]/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c2246]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Quality SLA</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="p-4 sm:p-5">

          {/* Tab 0: Data Cleaning & Normalization */}
          {activeTab === 0 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#142d57]">
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Spreadsheet Standardization</p>
                  <h4 className="text-sm font-bold text-white mt-0.5">Automated Deduplication &amp; Field Formatting</h4>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Batch In-Sync
                </span>
              </div>

              {/* Transformation Rows */}
              <div className="space-y-2">
                {sampleSpreadsheetRows.map((row, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#0c234a]/75 border border-[#1a3a6b] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-400">{row.id}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${row.statusColor}`}>
                        ✓ {row.status}
                      </span>
                    </div>
                    <div className="text-slate-400 line-through text-[11px] truncate">
                      {row.raw}
                    </div>
                    <div className="text-white font-medium text-[11px] truncate flex items-center gap-1.5">
                      <span className="text-[#4c8df7]">→</span>
                      <span>{row.cleaned}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="pt-2 border-t border-[#142d57] flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Records Processed Today</span>
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  {processedRows.toLocaleString()} rows
                </span>
              </div>
            </div>
          )}

          {/* Tab 1: Web & Company Research */}
          {activeTab === 1 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#142d57]">
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Commercial Intelligence</p>
                  <h4 className="text-sm font-bold text-white mt-0.5">Verified Corporate Directory &amp; Market Research</h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Registry Verified
                </span>
              </div>

              <div className="space-y-2">
                {sampleResearchRows.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#0c234a]/75 border border-[#1a3a6b] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{item.company}</span>
                      <span className="text-[10px] font-mono text-emerald-400">● {item.status}</span>
                    </div>
                    <div className="text-[11px] text-[#aac7ee]">{item.domain} • {item.location}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">{item.verifiedData}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#142d57] flex items-center justify-between text-xs text-slate-300">
                <span>Multi-Source Public Verification</span>
                <span className="font-mono text-cyan-300 font-bold">100% Human Curated</span>
              </div>
            </div>
          )}

          {/* Tab 2: Operational Quality SLA */}
          {activeTab === 2 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#142d57]">
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Quality Framework</p>
                  <h4 className="text-sm font-bold text-white mt-0.5">Confidentiality &amp; Delivery SLA</h4>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Active NDA
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-[#0c234a]/70 border border-[#1a3a6b] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Turnaround</span>
                  </div>
                  <p className="text-[11px] text-slate-300">24-48h predictable batch delivery on recurring tasks</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0c234a]/70 border border-[#1a3a6b] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Confidentiality</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Strict non-disclosure agreements &amp; role-based access</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0c234a]/70 border border-[#1a3a6b] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4c8df7]" />
                    <span>Supervision</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Lead QA verification before any file handover</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0c234a]/70 border border-[#1a3a6b] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Custom Schema</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Work directly inside your spreadsheets or portals</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#142d57] flex items-center justify-between text-xs text-slate-300">
                <span>Trial Sample Batch</span>
                <span className="font-mono text-emerald-400 font-bold">Available on Request</span>
              </div>
            </div>
          )}

        </div>

        {/* Console Bottom Ribbon */}
        <div className="px-4 py-2.5 bg-[#050f24] border-t border-[#142d57] flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate">Standardized Operating Procedures (SOPs) for every project</span>
          <span className="font-mono text-cyan-400 shrink-0 font-semibold ml-2">Secure Transfer</span>
        </div>

      </div>

      {/* Floating Badge Bottom Left - responsive positioned */}
      <div className="hidden xs:flex sm:flex absolute -bottom-3 left-1 sm:-left-3 z-20 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#07132b]/95 border border-[#4c8df7]/60 shadow-[0_4px_20px_rgba(76,141,247,0.25)] backdrop-blur-md items-center gap-1.5 sm:gap-2 text-white text-[11px] sm:text-xs font-semibold max-w-[90%]">
        <Lock className="w-3.5 h-3.5 text-[#4c8df7] shrink-0" />
        <span className="truncate">100% Strict NDA Protection</span>
      </div>
    </div>
  );
};

export default DataOpsVisualizer;
