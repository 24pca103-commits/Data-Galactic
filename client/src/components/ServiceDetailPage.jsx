import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  Filter,
  FileCode,
  Search,
  ShoppingCart,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Layers
} from 'lucide-react';
import { servicesData } from '../data/siteData';
import InnerHero3DBackground from './InnerHero3DBackground';
import QuoteContactSection from './QuoteContactSection';

const iconMap = {
  FileSpreadsheet,
  Filter,
  FileCode,
  Search,
  ShoppingCart,
  Briefcase
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const IconComponent = iconMap[service.iconName] || FileSpreadsheet;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Banner: Standardized height, 3D animated bg, exact navbar logo alignment */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        {/* Interactive 3D Canvas Background */}
        <InnerHero3DBackground />

        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4c8df7]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#aac7ee] font-semibold">{service.title}</span>
          </nav>

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span>{service.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              {service.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-normal font-normal">
              {service.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Section 1: Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Enterprise Overview &amp; Capabilities
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-normal">
              {service.overview}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Swift Turnaround</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{service.turnaround}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Dual QA Verification</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{service.accuracy}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#05142f] text-white p-8 rounded-3xl shadow-xl space-y-4">
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#aac7ee]">
              Why Outsource This to DataGalactic?
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>Save up to 60% on operational back-office labor</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>Zero software licensing fees or infrastructure overhead</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>Strict Tier-1 Non-Disclosure Agreements (NDA)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4c8df7] shrink-0" />
                <span>Flexible on-demand scale without long-term lock-in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: Comprehensive Sub-Services Grid (NO NUMBERS) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              What We Handle Under {service.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Specialized execution capabilities fine-tuned for high accuracy and rapid delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map((sub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors font-['Space_Grotesk']">
                  {sub.name}
                </h3>
                <p className="text-sm text-slate-600 leading-normal">
                  {sub.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Execution Workflow with Stage Numbers */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Our Multi-Stage Precision Workflow
            </h2>
            <p className="text-slate-600 text-sm">
              How we guarantee zero error tolerances from raw ingestion to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.workflow.map((item, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 group hover:border-[#0047AB] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500" />
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-sky-50 text-[#0047AB] border border-sky-200">
                    Step {idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk'] flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">Clarifications regarding specifications, pilots, and timelines.</p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Embedded Quote Section with preselected service */}
      <div className="border-t border-slate-200">
        <QuoteContactSection defaultService={service.title} />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
