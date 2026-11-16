import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircleQuestion, ArrowRight } from 'lucide-react';
import { faqsData } from '../data/siteData';

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0); // Open first item by default

  const toggleFAQ = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-24 lg:scroll-mt-28 py-14 sm:py-20 relative bg-slate-50/70 border-b border-slate-200/90 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-100/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0047AB] shadow-sm">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Common Inquiries &amp; Answers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] via-blue-600 to-cyan-600">
              Questions
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Find clear, honest answers to common questions about our services, project turnaround times, data accuracy protocols, and confidentiality practices.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white border-[#0047AB] shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0047AB] shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                      {faq.question}
                    </span>
                  </div>
                  <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#0047AB]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Have a specific question not covered here?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Contact our project team directly at <a href="mailto:hello@datagalactic.in" className="text-[#0047AB] font-semibold underline">hello@datagalactic.in</a> or submit a quote inquiry.
            </p>
          </div>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-[#002b66] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shrink-0 text-center"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
