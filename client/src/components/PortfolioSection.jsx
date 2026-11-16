import React, { useState } from 'react';
import {
  FolderKanban,
  FileSpreadsheet,
  Database,
  ShoppingCart,
  FileCode,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  X,
  Sparkles,
  Layers,
  AlertCircle
} from 'lucide-react';
import { portfolioData } from '../data/siteData';

const iconMap = {
  'data-cleaning-spreadsheet': FileSpreadsheet,
  'market-research-database': Database,
  'ecommerce-product-data-management': ShoppingCart,
  'pdf-to-excel-conversion': FileCode,
  'company-research-market-data': TrendingUp,
  'crm-data-management': Users
};

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-slate-50 border-b border-slate-200 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[350px] bg-blue-100/50 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <FolderKanban className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Demonstration Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Sample Projects &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Capabilities
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Review these demonstration workflows showcasing our data transformation, verification, and formatting standards across six core operational domains.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-slate-600">
            <AlertCircle className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Demonstration showcases with realistic sample datasets to protect client confidentiality.</span>
          </div>
        </div>

        {/* 6 Project Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.map((project) => {
            const Icon = iconMap[project.id] || FileSpreadsheet;

            return (
              <div
                key={project.id}
                className="group p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#0047AB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] text-[#0047AB] flex items-center justify-center transition-all duration-300 shadow-xs shrink-0">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                      {project.badge}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#0047AB] uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors font-['Space_Grotesk'] mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  {/* Input / Output preview pills */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Input: </span>
                      <span className="text-slate-600 text-[11px] line-clamp-1">{project.input.format}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-700 text-[11px] uppercase tracking-wider">Output: </span>
                      <span className="text-slate-600 text-[11px] line-clamp-1">{project.output.format}</span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0047AB] hover:text-[#002b66] transition-colors cursor-pointer"
                  >
                    <span>View Input, Process &amp; Output</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="#contact"
                    className="text-xs font-semibold text-slate-500 hover:text-[#0047AB]"
                  >
                    Request Scope
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Interactive Project Detail View (Input, Process, Output) */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-slate-200 p-4 sm:p-8 space-y-4 sm:space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-200">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono font-bold text-[#0047AB] mb-1.5">
                    <span>{selectedProject.badge}</span>
                    <span>•</span>
                    <span>{selectedProject.category}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk'] leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors shrink-0 cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Scenario */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Business Scenario &amp; Requirement:
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200/80">
                  {selectedProject.clientScenario}
                </p>
              </div>

              {/* 3 Pillars: Input -> Process -> Output */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                
                {/* 1. INPUT */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    <span>1. Input Format</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{selectedProject.input.format}</p>
                  <p className="text-[11px] text-slate-600">{selectedProject.input.issues}</p>
                  <div className="pt-2 border-t border-amber-200/60">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Sample Snippet:</p>
                    <pre className="text-[10px] font-mono bg-white p-2 rounded-lg border border-amber-200/60 mt-1 text-slate-700 whitespace-pre-wrap break-all overflow-x-auto max-h-32">
                      {selectedProject.input.sampleSnippet}
                    </pre>
                  </div>
                </div>

                {/* 2. PROCESS */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0047AB] uppercase tracking-wider font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#0047AB]" />
                    <span>2. Our Process</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-700">
                    {selectedProject.process.map((step, si) => (
                      <li key={si} className="flex items-start gap-1.5">
                        <span className="text-[#0047AB] font-bold mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. OUTPUT */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>3. Clean Output</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{selectedProject.output.format}</p>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{selectedProject.output.deliverable}</p>
                  <div className="pt-2 border-t border-emerald-200/60 text-[11px] font-mono font-medium text-emerald-800">
                    ⏱ {selectedProject.output.turnaround}
                  </div>
                </div>

              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <span className="text-xs text-slate-500">
                  Need a similar workflow or custom dataset processing?
                </span>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer text-center"
                  >
                    <span>Request Similar Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PortfolioSection;
