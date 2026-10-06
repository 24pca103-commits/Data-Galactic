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
    <section id="industries" className="py-24 relative bg-gradient-to-b from-[#1b2631] via-[#243342] to-[#1b2631] overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-[#88BDF2]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#384959]/80 border border-[#88BDF2]/30 text-xs font-semibold text-[#BDDDFC]">
            <Layers className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Cross-Sector Domain Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Supporting Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BDDDFC] via-[#88BDF2] to-[#6A89A7]">
              Across Industries
            </span>
          </h2>
          <p className="text-[#BDDDFC]/80 text-base sm:text-lg leading-relaxed">
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
                      ? 'bg-gradient-to-r from-[#2d3e50] to-[#243342] border-[#88BDF2] text-white shadow-lg shadow-[#1b2631]/80'
                      : 'bg-[#1b2631]/80 border-[#384959] text-[#BDDDFC]/80 hover:bg-[#2d3e50]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#88BDF2]/25 text-[#88BDF2]' : 'bg-[#384959] text-[#6A89A7]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{ind.short}</p>
                      <p className="text-[11px] text-[#6A89A7] line-clamp-1">{ind.name}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#88BDF2] translate-x-1' : 'text-[#6A89A7]'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Selected Industry Showcase Panel */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#2d3e50]/95 to-[#243342]/95 border border-[#88BDF2]/30 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#384959] pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#88BDF2]/20 border border-[#88BDF2]/40 flex items-center justify-center text-[#88BDF2] shadow-lg shadow-[#88BDF2]/20">
                    {React.createElement(industries[selectedIndustry].icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                      {industries[selectedIndustry].name}
                    </h3>
                    <p className="text-xs text-[#BDDDFC] mt-0.5 font-medium">Specialized Data Operations</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1b2631] border border-[#384959] text-[#BDDDFC] self-start sm:self-auto">
                  Tailored Workflows
                </span>
              </div>

              {/* Tagline */}
              <p className="text-[#BDDDFC]/80 text-sm sm:text-base leading-relaxed">
                {industries[selectedIndustry].tagline}
              </p>

              {/* Specialized Tasks List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#6A89A7] font-mono font-semibold">
                  Common Outsourced Workloads:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {industries[selectedIndustry].tasks.map((task, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#1b2631]/80 border border-[#384959] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#88BDF2] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Impact Box */}
              <div className="p-4 rounded-2xl bg-[#384959]/50 border border-[#88BDF2]/30 text-xs text-[#BDDDFC] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#88BDF2] shrink-0 animate-pulse" />
                <span><strong>Demonstrated Impact:</strong> {industries[selectedIndustry].impact}</span>
              </div>

            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-[#384959] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#6A89A7]">Ready to streamline your {industries[selectedIndustry].short} data?</span>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-[#1b2631] bg-gradient-to-r from-[#88BDF2] to-[#BDDDFC] hover:from-[#BDDDFC] hover:to-[#88BDF2] rounded-xl shadow-lg shadow-[#1b2631]/80 transition-all group"
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
