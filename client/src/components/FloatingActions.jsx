import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappNumber = '919363164608';
  const whatsappMessage = encodeURIComponent(
    'Hello DataGalactic, I am interested in outsourcing our data processing and back-office requirements.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact DataGalactic on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/50 hover:shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none" />

        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#1b2631]/95 text-[#BDDDFC] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-[#384959]">
          Chat on WhatsApp (+91 9363164608)
        </span>
      </a>

      {/* Scroll to Top Upper Arrow Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#243342]/90 hover:bg-[#88BDF2] text-[#BDDDFC] hover:text-[#1b2631] border border-[#88BDF2]/40 backdrop-blur-md shadow-xl hover:shadow-[#88BDF2]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-3"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-xl bg-[#1b2631]/95 text-[#BDDDFC] text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-[#384959]">
            Back to top
          </span>
        </button>
      )}
    </div>
  );
};

export default FloatingActions;
