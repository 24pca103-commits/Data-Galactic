import React from 'react';
import { Eye, MapPin, Mail, Phone, Globe2, CheckCircle2 } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      title: 'Uncompromising Accuracy',
      desc: 'We operate with the philosophy that one misplaced digit can disrupt downstream analytics. Every record is verified.'
    },
    {
      title: 'Operational Reliability',
      desc: 'Consistent turnaround times, transparent communication, and predictable SLAs you can plan your business around.'
    },
    {
      title: 'Cost & Process Efficiency',
      desc: 'We optimize data ingestion workflows so you get high-throughput execution at a fraction of in-house costs.'
    },
    {
      title: 'Long-Term Business Partnerships',
      desc: 'We do not view projects as transactional tasks. We integrate seamlessly as your dedicated operational data backbone.'
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#0d1117] overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#21262d] border border-[#38bdf8]/25 text-xs font-semibold text-[#7dd3fc]">
              <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>About DataGalactic</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              Your Trusted{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#0284c7]">
                Data Support Partner
              </span>
            </h2>

            <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-white">DataGalactic</strong> is a specialized B2B data and business support services firm established with a clear mandate: to help international enterprises streamline, clean, convert, and manage high-volume data operations with absolute precision.
              </p>
              <p>
                Under the leadership of <strong className="text-white">Founder &amp; CEO Risona R</strong>, our delivery operations based in Tamil Nadu, India collaborate with businesses across the United States, United Kingdom, Europe, and worldwide. We handle repetitive, critical back-office workloads so our clients can focus uninterruptedly on core growth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>datagalactic.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>hello@datagalactic.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>+91 9363164608</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-6 space-y-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] hover:border-[#38bdf8]/40 backdrop-blur-xl transition-all duration-200 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-['Space_Grotesk']">{v.title}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
