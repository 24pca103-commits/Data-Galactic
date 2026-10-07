import React, { useState } from 'react';
import {
  ShoppingBag,
  HeartPulse,
  Building2,
  BadgeDollarSign,
  Store,
  Truck,
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';

const IndustriesSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      id: 'ecommerce',
      name: 'E-commerce & Marketplaces',
      short: 'E-commerce',
      icon: ShoppingBag,
      tagline: 'High-speed SKU population, inventory feeds, and multi-channel catalog syncing.',
      tasks: [
        'Shopify, Amazon & WooCommerce product uploads',
        'Variant attribute mapping (size, color, weight, MPN)',
        'Competitor price monitoring and feed updates',
        'Image categorization and asset tagging'
      ],
      impact: 'Up to 3,000+ SKUs updated weekly with 99.9% catalog accuracy.'
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Medical Support',
      short: 'Healthcare',
      icon: HeartPulse,
      tagline: 'Accurate digitization of patient intake records, insurance claims, and clinical charts.',
      tasks: [
        'Medical claim data entry and verification',
        'Patient records digitization and OCR correction',
        'Physician credential records maintenance',
        'Billing ledger formatting and reconciliation'
      ],
      impact: 'Compliant and confidential handling of medical information.'
    },
    {
      id: 'real-estate',
      name: 'Real Estate & Property Portals',
      short: 'Real Estate',
      icon: Building2,
      tagline: 'MLS listing management, property records extraction, and deeds data indexing.',
      tasks: [
        'MLS and portal listing creation with floorplans',
        'Tax records and deed document extraction',
        'Tenant application parsing and verification',
        'Broker contact prospecting and CRM entry'
      ],
      impact: '24-hour turnaround on new property listings and market feeds.'
    },
    {
      id: 'finance',
      name: 'Finance, Banking & Accounting',
      short: 'Finance',
      icon: BadgeDollarSign,
      tagline: 'Invoice parsing, receipts reconciliation, ledger updates, and financial conversion.',
      tasks: [
        'PDF invoices to QuickBooks / Xero Excel ledger formatting',
        'Bank statement digitization and transaction tagging',
        'Expense audit and receipts classification',
        'Loan application data extraction'
      ],
      impact: 'Zero-tolerance numeric accuracy with double-key verification.'
    },
    {
      id: 'retail',
      name: 'Retail & Multi-Branch Networks',
      short: 'Retail',
      icon: Store,
      tagline: 'Point-of-sale audits, supplier catalogue management, and coupon code maintenance.',
      tasks: [
        'Supplier price-list normalization',
        'Barcode / UPC registry maintenance',
        'Promotional campaign data validation',
        'Branch inventory reconciliation'
      ],
      impact: 'Streamlined supply chain and catalog consistency across store branches.'
    },
    {
      id: 'logistics',
      name: 'Logistics, Freight & Supply Chain',
      short: 'Logistics',
      icon: Truck,
      tagline: 'Bills of lading indexing, customs paperwork digitizing, and freight dispatch tracking.',
      tasks: [
        'Bill of Lading (BOL) and airway bill digitization',
        'Delivery receipt confirmation data logging',
        'Fleet maintenance logs and fuel invoice tracking',
        'Driver logbook entry and compliance recording'
      ],
      impact: 'Rapid same-day dispatch and tracking document processing.'
    },
    {
      id: 'education',
      name: 'Education & Academic Institutions',
      short: 'Education',
      icon: GraduationCap,
      tagline: 'Student admissions digitizing, grading records archiving, and survey extraction.',
      tasks: [
        'Student application forms indexing',
        'Historical grading card data conversion',
        'Alumni directory research and contact enrichment',
        'Research dataset survey transcription'
      ],
      impact: 'Secure academic archiving and rapid admissions data entry.'
    },
    {
      id: 'professional-services',
      name: 'Professional & Legal Services',
      short: 'Professional Services',
      icon: Briefcase,
      tagline: 'Legal brief OCR parsing, contract cataloging, and corporate client directory indexing.',
      tasks: [
        'Court filing document OCR cleanup and redaction prep',
        'Contract metadata extraction and clause indexing',
        'Corporate client registry updating',
        'Litigation document indexing and bates numbering'
      ],
      impact: 'Strict NDA compliance with structured file indexing.'
    }
  ];

  return (
    <section id="industries" className="py-24 relative bg-white overflow-hidden border-b border-slate-200">
      
      {/* Glow */}
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-sky-200/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Cross-Sector Domain Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Supporting Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700">
              Across Industries
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every sector has unique data schemas, regulatory demands, and processing standards. We adapt our operations to fit your industry's exact specifications.
          </p>
        </div>

        {/* Interactive Industry Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Vertical Industry Selector Tabs */}
          <div className="lg:col-span-4 space-y-2.5">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              const isSelected = selectedIndustry === idx;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{ind.short}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{ind.name}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-sky-600 translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Selected Industry Showcase Panel */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-10 bg-slate-50 border border-slate-200 shadow-md flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 shadow-sm">
                    {React.createElement(industries[selectedIndustry].icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                      {industries[selectedIndustry].name}
                    </h3>
                    <p className="text-xs text-sky-700 mt-0.5 font-medium">Specialized Data Operations</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white border border-slate-200 text-slate-600 self-start sm:self-auto shadow-sm">
                  Tailored Workflows
                </span>
              </div>

              {/* Tagline */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {industries[selectedIndustry].tagline}
              </p>

              {/* Specialized Tasks List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Common Outsourced Workloads:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {industries[selectedIndustry].tasks.map((task, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Impact Box */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-800 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0 animate-pulse" />
                <span><strong>Demonstrated Impact:</strong> {industries[selectedIndustry].impact}</span>
              </div>

            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">Ready to streamline your {industries[selectedIndustry].short} data?</span>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 rounded-xl shadow-md transition-all group"
              >
                <span>Discuss {industries[selectedIndustry].short} Requirements</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
