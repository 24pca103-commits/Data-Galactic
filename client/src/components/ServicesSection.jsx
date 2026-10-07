import React, { useState, useEffect, useRef } from 'react';
import {
  FileSpreadsheet,
  Filter,
  FileCode,
  Search,
  ShoppingCart,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ServicesSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  const services = [
    {
      id: 'data-entry',
      title: 'Data Entry Services',
      tagline: 'High-speed, dual-verified data capture for online and offline records.',
      icon: FileSpreadsheet,
      subServices: [
        { name: 'Online Data Entry', desc: 'Direct portal updates, CRM records, and cloud database indexing.' },
        { name: 'Offline Data Entry', desc: 'Secure high-volume ingestion from physical forms and scanned sheets.' },
        { name: 'Excel Data Entry', desc: 'Advanced spreadsheet population, mathematical audit, and formatting.' },
        { name: 'Form Filling', desc: 'Accurate digitizing of customer intake forms, surveys, claims, and invoices.' }
      ],
      turnaround: '24-48 Hours SLA',
      accuracy: '99.9% Double-Key QA'
    },
    {
      id: 'data-processing',
      title: 'Data Processing',
      tagline: 'Transform messy unorganized datasets into structured, analytics-ready formats.',
      icon: Filter,
      subServices: [
        { name: 'Data Cleaning', desc: 'Deduplication, syntax repair, missing field enrichment, and anomaly removal.' },
        { name: 'Data Verification', desc: 'Cross-checking records against external authoritative registries and archives.' },
        { name: 'Data Formatting', desc: 'Standardizing dates, phone numbers, currencies, units, and nested structures.' },
        { name: 'Data Sorting', desc: 'Logical categorization, tier tagging, and hierarchical grouping for swift queries.' }
      ],
      turnaround: 'Same-Day Batch Processing',
      accuracy: '100% Quality Audited'
    },
    {
      id: 'data-conversion',
      title: 'Data Conversion',
      tagline: 'Seamlessly convert complex documents between legacy formats and structured databases.',
      icon: FileCode,
      subServices: [
        { name: 'PDF to Excel', desc: 'Accurate financial, invoice, and tabular conversion with preserved formulas.' },
        { name: 'PDF to Word', desc: 'Typography-preserved document conversion with editable formatting.' },
        { name: 'Image to Text (OCR)', desc: 'AI-assisted OCR extraction with manual human proofreading of scanned receipts.' },
        { name: 'Document Conversion', desc: 'XML, CSV, JSON, HTML, RTF, and proprietary database format bridging.' }
      ],
      turnaround: 'Rapid Automated + Human QA',
      accuracy: 'Pixel-to-Text Exactness'
    },
    {
      id: 'web-research',
      title: 'Web Research & Intelligence',
      tagline: 'Targeted market intelligence, B2B lead generation, and competitive data aggregation.',
      icon: Search,
      subServices: [
        { name: 'Market Research', desc: 'Industry landscape data aggregation, pricing trends, and competitor benchmarking.' },
        { name: 'Product Research', desc: 'SKU research, vendor pricing comparisons, specification aggregation.' },
        { name: 'Contact Research', desc: 'B2B decision-maker prospecting, verified email discovery, and LinkedIn mining.' },
        { name: 'Data Collection', desc: 'Custom scraping, targeted list compilation, and directory validation.' }
      ],
      turnaround: 'Tailored Daily Feeds',
      accuracy: '100% Verified Contacts'
    },
    {
      id: 'ecommerce-data',
      title: 'E-commerce Data Services',
      tagline: 'End-to-end catalog population, product listings, and SKU inventory management.',
      icon: ShoppingCart,
      subServices: [
        { name: 'Product Listing', desc: 'Listing creation across Shopify, Amazon, eBay, Magento, and WooCommerce.' },
        { name: 'Catalog Management', desc: 'Category mapping, variant attribution (sizes/colors), and SEO keyword tagging.' },
        { name: 'Product Data Entry', desc: 'Accurate feature descriptions, pricing tables, barcodes, and bullet points.' },
        { name: 'Inventory Updates', desc: 'Real-time stock level synchronization, vendor feed ingestion, and out-of-stock audits.' }
      ],
      turnaround: 'High-Volume SKU Updates',
      accuracy: '99.8% Catalog Precision'
    },
    {
      id: 'back-office-support',
      title: 'Back Office Support',
      tagline: 'Reliable administrative, record maintenance, and operational back-office backbone.',
      icon: Briefcase,
      subServices: [
        { name: 'Database Updating', desc: 'Continuous record refreshing, contact deduplication, and CRM hygiene.' },
        { name: 'Record Management', desc: 'Archival compliance, digital filing, indexing, and swift retrieval tagging.' },
        { name: 'Administrative Support', desc: 'Email ticket triage, invoice reconciliation, and recurring routine reporting.' },
        { name: 'File Management', desc: 'Cloud storage reorganization, access-rights tagging, and structured directories.' }
      ],
      turnaround: 'Dedicated Team Options',
      accuracy: 'Enterprise SLA Guaranteed'
    }
  ];

  // Auto-slide every 4 seconds (pauses on hover)
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % services.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, services.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + services.length) % services.length);
  };

  // Get exactly 3 visible icons centered on the active item
  const prevIdx = (activeIdx - 1 + services.length) % services.length;
  const currentIdx = activeIdx;
  const nextIdx = (activeIdx + 1) % services.length;

  const visibleThree = [
    { service: services[prevIdx], index: prevIdx, position: 'side' },
    { service: services[currentIdx], index: currentIdx, position: 'center' },
    { service: services[nextIdx], index: nextIdx, position: 'side' }
  ];

  const currentService = services[currentIdx];

  return (
    <section
      id="services"
      className="py-24 relative bg-slate-50 overflow-hidden border-b border-slate-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-200/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Comprehensive Enterprise Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Data Support Services Built Around{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700">
              Your Business
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From granular spreadsheet data entry to end-to-end e-commerce catalog operations, we deliver accurate, secure, and cost-efficient back-office support tailored for international companies.
          </p>
        </div>

        {/* 3-Visible Round Icon Carousel Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          
          {/* Slider Container with Left/Right Arrows */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous Service"
              className="p-3 rounded-full bg-white border border-slate-200 hover:border-sky-500 hover:bg-sky-500 text-slate-700 hover:text-white transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Exactly 3 Visible Round Icons */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 flex-grow justify-items-center items-center">
              {visibleThree.map(({ service, index, position }) => {
                const Icon = service.icon;
                const isCenter = position === 'center';
                return (
                  <button
                    key={`${service.id}-${index}`}
                    onClick={() => setActiveIdx(index)}
                    className={`group flex flex-col items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                      isCenter ? 'scale-110 z-10' : 'scale-95 opacity-60 hover:opacity-90'
                    }`}
                  >
                    {/* Circular Icon Badge */}
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCenter
                          ? 'bg-gradient-to-br from-sky-500 via-cyan-600 to-blue-700 text-white shadow-xl shadow-sky-500/25 ring-4 ring-sky-200'
                          : 'bg-white border-2 border-slate-200 text-sky-600 group-hover:border-sky-400 shadow-sm'
                      }`}
                    >
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform ${isCenter ? 'scale-110' : 'group-hover:scale-105'}`} />
                      
                      {/* Active indicator dot */}
                      {isCenter && (
                        <span className="absolute -bottom-1 w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                      )}
                    </div>

                    {/* Title under icon */}
                    <span
                      className={`text-xs font-semibold text-center line-clamp-1 max-w-[120px] transition-colors ${
                        isCenter ? 'text-slate-900 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next Service"
              className="p-3 rounded-full bg-white border border-slate-200 hover:border-sky-500 hover:bg-sky-500 text-slate-700 hover:text-white transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Clean Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to service ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === i
                    ? 'w-7 bg-sky-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Detailed Service Showcase Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-white border border-slate-200 shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono tracking-wider text-sky-700 font-medium">
                <span>Featured Data Solution</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 font-['Space_Grotesk']">
                {currentService.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentService.tagline}
              </p>

              {/* Service SLA & Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">Turnaround</p>
                  <p className="text-sm font-bold text-sky-600 mt-1">{currentService.turnaround}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">Quality Standard</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">{currentService.accuracy}</p>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 rounded-xl shadow-md transition-all group"
                >
                  <span>Request Quote for {currentService.title}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Sub-Services Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentService.subServices.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-white transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {sub.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-sky-600 font-medium">
                    <span>100% QA Verified</span>
                    <span className="text-slate-400 group-hover:text-sky-600 transition-colors">→</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
