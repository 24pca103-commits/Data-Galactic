import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  Filter,
  Database,
  FolderKanban,
  CheckCheck,
  Target,
  Search,
  TrendingUp,
  ShoppingCart,
  FileCode,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Layers,
  AlertCircle
} from 'lucide-react';
import { servicesData } from '../data/siteData';
import InnerHero3DBackground from './InnerHero3DBackground';
import QuoteContactSection from './QuoteContactSection';

const iconMap = {
  FileSpreadsheet,
  Filter,
  DatabaseZap: Database,
  FolderKanban,
  CheckCheck,
  Target,
  Search,
  TrendingUp,
  ShoppingCart,
  FileCode,
  Briefcase
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId] || (serviceId === 'b2b-lead-generation' ? servicesData['company-research'] : null);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = iconMap[service.iconName] || FileSpreadsheet;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Banner */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        <InnerHero3DBackground />

        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4c8df7]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400 mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-300">{service.categoryName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-[#aac7ee] font-semibold">{service.title}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span>{service.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {service.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Section 1: Overview & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0047AB]">
              <span>Service Overview &amp; Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Dependable Execution Built for Accurate Business Operations
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {service.overview}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Delivery Turnaround</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{service.turnaround}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Quality Assurance</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{service.accuracy}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#05142f] to-[#0a234f] text-white p-7 sm:p-8 rounded-3xl shadow-xl space-y-5">
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#aac7ee]">
              Why Outsource This to DataGalactic?
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0 mt-0.5" />
                <span>Save substantial administrative hours while eliminating domestic hiring overhead</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0 mt-0.5" />
                <span>Disciplined multi-stage verification to ensure pristine data integrity</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0 mt-0.5" />
                <span>Comprehensive Non-Disclosure Agreements (NDA) and secure data handling</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0 mt-0.5" />
                <span>Flexible project scope: from one-time trial batches to dedicated ongoing shifts</span>
              </li>
            </ul>
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-[#0047AB] hover:bg-[#1258c7] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Section 2: Business Problems Solved & Key Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problems Solved */}
          <div className="p-7 sm:p-8 rounded-3xl bg-amber-50/40 border border-amber-200/70 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wider font-mono">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Business Problems It Solves</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              Challenges We Eliminate
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {service.businessProblems.map((prob, pi) => (
                <li key={pi} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Tasks Included */}
          <div className="p-7 sm:p-8 rounded-3xl bg-blue-50/40 border border-blue-200/70 space-y-4">
            <div className="flex items-center gap-2 text-[#0047AB] font-bold text-sm uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#0047AB]" />
              <span>Key Tasks Included</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              Operational Scope Handled
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {service.keyTasks.map((task, ti) => (
                <li key={ti} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Suitable Industries */}
        <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                Suitable Client Industries
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Organizations that frequently utilize this service to streamline operations.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {service.suitableIndustries.map((ind, ii) => (
              <span
                key={ii}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: Multi-Stage Workflow */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Standard Operating Execution Workflow
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              How we manage tasks systematically from initial intake through final verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.workflow.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0047AB] border border-blue-100">
                    Step {item.step}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk'] flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0047AB]" />
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">Clarifications regarding specifications, sample tests, and turnarounds.</p>
            </div>

            <div className="space-y-3.5">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
                  <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Embedded Quote Section */}
      <div id="quote-form" className="border-t border-slate-200">
        <QuoteContactSection defaultService={service.title} />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
