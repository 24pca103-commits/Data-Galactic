import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { MessageSquareQuote, Star, Building, Globe, Sparkles, PlusCircle } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const initialTestimonials = [
  {
    quote: 'DataGalactic simplified our monthly catalog updating cycle. The turnaround was prompt, and the double-key verification caught discrepancies our internal team previously missed.',
    clientType: 'International E-commerce Brand',
    region: 'United States',
    serviceType: 'Catalog Management & SKU Data Entry',
    rating: 5
  },
  {
    quote: 'Handling thousands of monthly invoice extractions became seamless once we outsourced to DataGalactic. Clean spreadsheets delivered on schedule without supervision overhead.',
    clientType: 'Logistics & Supply Chain Firm',
    region: 'United Kingdom',
    serviceType: 'Invoice Processing & Document Conversion',
    rating: 5
  },
  {
    quote: 'The team adhered strictly to our data security SOPs and confidentiality guidelines. A reliable and responsive back-office partner for ongoing data maintenance.',
    clientType: 'Commercial Real Estate Agency',
    region: 'Europe',
    serviceType: 'Property Records & Lead Research',
    rating: 5
  },
  {
    quote: 'Exceptional accuracy and speed. DataGalactic handled our entire patient data migration with zero errors and maintained all compliance protocols throughout the project.',
    clientType: 'Healthcare Technology Company',
    region: 'Canada',
    serviceType: 'Healthcare Data Entry & Compliance',
    rating: 5
  },
  {
    quote: "We scaled from 5,000 to 50,000 product listings in just two months. DataGalactic's team was professional, accurate, and incredibly responsive to our changing requirements.",
    clientType: 'Retail & Consumer Goods Brand',
    region: 'Australia',
    serviceType: 'E-commerce Catalog & Data Entry',
    rating: 5
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic feedback list
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  // Fetch published testimonials from the backend
  const fetchPublishedFeedbacks = async () => {
    try {
      const res = await axios.get('/api/feedback/published');
      if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        const dynamicList = res.data.data.map(item => ({
          quote: item.quote,
          clientType: item.clientType || 'Corporate Client',
          region: item.region || 'Global',
          serviceType: item.serviceType || 'B2B Data Services',
          rating: item.rating || 5,
          name: item.name
        }));
        setTestimonials(dynamicList);
      }
    } catch (e) {
      // Fallback stays on initialTestimonials
    }
  };

  useEffect(() => {
    fetchPublishedFeedbacks();

    // Auto-refresh testimonials every 10 seconds
    const interval = setInterval(fetchPublishedFeedbacks, 10000);

    // Live Server-Sent Events listener for instant updates when admin publishes
    let eventSource;
    try {
      eventSource = new EventSource('/api/feedback/events');
      eventSource.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === 'feedback_updated') {
            fetchPublishedFeedbacks();
          }
        } catch (err) {
          // Ignored
        }
      };
    } catch (err) {
      // Ignored
    }

    return () => {
      clearInterval(interval);
      if (eventSource) eventSource.close();
    };
  }, []);

  // Guarantee smooth continuous looping
  const repeatCount = testimonials.length > 6 ? 2 : 4;
  const allItems = Array(repeatCount).fill(testimonials).flat();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId;
    const speed = 0.85;

    const step = () => {
      if (!isInteractingRef.current && container) {
        container.scrollLeft += speed;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [allItems.length]);

  // Infinite seamless wrap-around handler
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const half = container.scrollWidth / 2;
    if (container.scrollLeft >= half) {
      container.scrollLeft -= half;
      if (isDraggingRef.current) {
        startScrollLeftRef.current -= half;
      }
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += half;
      if (isDraggingRef.current) {
        startScrollLeftRef.current += half;
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    isInteractingRef.current = true;
    setIsCursorGrabbing(true);
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    container.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsCursorGrabbing(false);
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 1200);
    }
  };

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
  };

  const handleContainerMouseLeave = () => {
    handleMouseUpOrLeave();
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 600);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = () => {
    isInteractingRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1500);
  };

  const handleWheel = () => {
    isInteractingRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-24 relative bg-slate-50 border-b border-slate-200/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-100/60 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-700 shadow-sm">
            <MessageSquareQuote className="w-3.5 h-3.5 text-sky-600" />
            <span>Client Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            What Our Clients{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              Say
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            See how international businesses leverage our precision data processing and back-office support to scale operations smoothly.
          </p>

          {/* User Review Submission Button */}
          <div className="pt-2">
            <a
              href="#feedback"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-sky-700 hover:text-sky-800 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-sky-600" />
              <span>Leave Client Feedback / Review</span>
            </a>
          </div>
        </div>

      </div>

      {/* Full-width continuous even auto-scroller container */}
      <div className="relative w-full">
        {/* Soft edge fade masks on left and right */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20" />

        {/* Scrollable Track */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`flex gap-6 overflow-x-auto py-4 px-8 no-scrollbar select-none transition-colors ${
            isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {allItems.map((item, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[400px] flex-shrink-0 p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-400 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info Block */}
              <div className="pt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                  <Building className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate">{item.name ? `${item.name} • ${item.clientType}` : item.clientType}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="flex items-center gap-1 text-sky-700 font-medium">
                    <Globe className="w-3 h-3 text-sky-600" />
                    {item.region}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {item.serviceType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle indicator hint */}
      <div className="text-center mt-6">
        <span className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Real-time dynamic feed • Click &amp; drag or swipe to explore manually</span>
        </span>
      </div>

      {/* Feedback Submission Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFeedbackSubmitted={() => {
          fetchPublishedFeedbacks();
        }}
      />

    </section>
  );
};

export default Testimonials;
