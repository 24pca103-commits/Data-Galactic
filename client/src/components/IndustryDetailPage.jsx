import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Cpu,
  Megaphone,
  Target,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Building2,
  Factory,
  Ship,
  UserCheck,
  BadgeDollarSign,
  Truck,
  Briefcase,
  Store,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock,
  Lock
} from 'lucide-react';
import { industriesData } from '../data/siteData';
import InnerHero3DBackground from './InnerHero3DBackground';
import QuoteContactSection from './QuoteContactSection';

const industryIconMap = {
  Cpu,
  Megaphone,
  Target,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Building2,
  Factory,
  Ship,
  UserCheck,
  BadgeDollarSign,
  Truck,
  Briefcase,
  Store,
  Building
};

const IndustryDetailPage = () => {
  const { industryId } = useParams();
  const industry = industriesData[industryId];

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const IconComponent = industryIconMap[industry.iconName] || Building2;

  return (
    <div className="bg-white min-h-screen">
      {/* Sector Banner */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        <InnerHero3DBackground />

        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4c8df7]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/industries" className="hover:text-white transition-colors">Industries</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#aac7ee] font-semibold">{industry.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span>Target Industry Sector</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              {industry.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {industry.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Industry Overview & Value */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0047AB]">
              <span>Sector Overview &amp; Operational Needs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Tailored Data &amp; Operational Support for {industry.name}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {industry.overview}
            </p>
            <p className="text-slate-700 text-base font-medium leading-relaxed">
              {industry.supportDetails}
            </p>
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3.5">
              <TrendingUp className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-900">Key Operational Benefit</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{industry.benefits}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#05142f] to-[#0a234f] text-white p-7 sm:p-8 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-xl font-bold text-[#aac7ee] font-['Space_Grotesk']">
              Why Partner With DataGalactic?
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#4c8df7] shrink-0 mt-0.5" />
                <span>Strict non-disclosure agreements &amp; secure data handling</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Predictable turnaround aligned with international business shifts</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero data retention protocol upon project acceptance</span>
              </div>
            </div>
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-[#0047AB] hover:bg-[#1258c7] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Request Quote for {industry.name}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Specialized Tasks Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
              Specialized Tasks We Support
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Standard operating workflows tuned specifically for {industry.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industry.keyTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0047AB] hover:bg-white transition-all shadow-xs group"
              >
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-[#0047AB] shrink-0 shadow-xs font-mono font-bold text-xs">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Operational Task {idx + 1}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded Quote Section */}
      <div id="quote-form" className="border-t border-slate-200">
        <QuoteContactSection defaultDescription={`Industry requirement for ${industry.name}: `} />
      </div>
    </div>
  );
};

export default IndustryDetailPage;
