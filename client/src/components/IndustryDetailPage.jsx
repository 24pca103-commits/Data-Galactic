import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ShoppingBag,
  HeartPulse,
  Building2,
  BadgeDollarSign,
  Truck,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { industriesData } from '../data/siteData';
import InnerHero3DBackground from './InnerHero3DBackground';
import QuoteContactSection from './QuoteContactSection';

const industryIconMap = {
  ShoppingBag,
  HeartPulse,
  Building2,
  BadgeDollarSign,
  Truck,
  GraduationCap
};

const IndustryDetailPage = () => {
  const { industryId } = useParams();
  const industry = industriesData[industryId];

  if (!industry) {
    return <Navigate to="/" replace />;
  }

  const IconComponent = industryIconMap[industry.iconName] || ShoppingBag;

  return (
    <div className="bg-white min-h-screen">
      {/* Sector Banner: Standardized height, 3D animated bg, exact navbar logo alignment */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        {/* Interactive 3D Canvas Background */}
        <InnerHero3DBackground />

        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4c8df7]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/industries" className="hover:text-white transition-colors">Industries</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#aac7ee] font-semibold">{industry.name}</span>
          </nav>

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span>{industry.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              {industry.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-normal font-normal">
              {industry.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Industry Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Tailored Solutions for {industry.name}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-normal">
              {industry.overview}
            </p>
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-900">Proven Operational Efficiency</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{industry.impact}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#aac7ee] font-['Space_Grotesk']">
              Sector Compliance &amp; Standards
            </h3>
            <div className="space-y-3">
              {industry.standards.map((std, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#4c8df7] shrink-0" />
                  <span>{std}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
              All work conducted under strict non-disclosure terms with dedicated project supervisors.
            </p>
          </div>
        </div>

        {/* Specialized Tasks Grid with Task Numbers */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Specialized Tasks We Handle
            </h2>
            <p className="text-slate-600 text-sm">
              Customized data processing workflows tuned specifically for {industry.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industry.tasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-white transition-all shadow-xs group"
              >
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-[#0047AB] shrink-0 shadow-xs font-mono font-bold text-xs">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Operational Task {idx + 1}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-normal">
                    {task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded Quote Section */}
      <div className="border-t border-slate-200">
        <QuoteContactSection defaultDescription={`Industry requirement for ${industry.name}: `} />
      </div>
    </div>
  );
};

export default IndustryDetailPage;
