import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import InnerHero3DBackground from './InnerHero3DBackground';
import HowItWorks from './HowItWorks';
import QuoteCalculator from './QuoteCalculator';
import QuoteContactSection from './QuoteContactSection';

const HowItWorksPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header: Standardized height, 3D animated bg, exact navbar logo alignment */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        {/* Interactive 3D Canvas Background */}
        <InnerHero3DBackground />

        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4c8df7]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#aac7ee] font-semibold">How It Works</span>
          </nav>

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4c8df7]" />
              <span>Workflow &amp; SLA Transparency</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              Our Proven 4-Stage Process
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-normal font-normal">
              From initial ingestion to double-key quality audits and encrypted delivery, discover how we guarantee 99.9% accuracy.
            </p>
          </div>
        </div>
      </div>

      <div>
        <HowItWorks />
        <QuoteCalculator />
        <div className="border-t border-slate-200">
          <QuoteContactSection />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
