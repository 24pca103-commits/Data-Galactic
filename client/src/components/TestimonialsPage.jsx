import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Sparkles } from 'lucide-react';
import Testimonials from './Testimonials';
import FeedbackSection from './FeedbackSection';
import QuoteContactSection from './QuoteContactSection';

const TestimonialsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header with Zero Top White Space, Snug Line Spacing, and Human Photo Mosaic with Dark Gradient Shadow */}
      <div className="relative bg-[#05142f] text-white pt-24 lg:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#122f5c]">
        {/* Right-aligned Background Human Photo Collage with Light Soft Shadow */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 pointer-events-none overflow-hidden">
          <img
            src="/human-banner-collage.jpg"
            alt="DataGalactic Client Partnerships"
            className="w-full h-full object-cover object-center opacity-80"
          />
          {/* Light color shadow gradient fade matching #05142f */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05142f] via-[#05142f]/60 to-transparent" />
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4c8df7]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#aac7ee] font-semibold">Testimonials</span>
          </nav>

          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122f5c]/90 border border-[#4c8df7]/40 text-xs font-semibold text-[#aac7ee] backdrop-blur-md">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Verified Client Endorsements &amp; Reviews</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              Trusted by Global Leaders
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              See what international companies say about our speed, precision, and reliable customer communications.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-16 py-10">
        <Testimonials />
        <FeedbackSection />
        <div className="border-t border-slate-200">
          <QuoteContactSection />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
