import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import InnerHero3DBackground from './InnerHero3DBackground';

const TermsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        <InnerHero3DBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#aac7ee] font-semibold">Terms &amp; Conditions</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Last updated: January 2025. Standard terms governing service delivery, scopes of work, and professional cooperation.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing the DataGalactic website or engaging our services, you agree to these Terms and Conditions. Individual project engagements are further governed by formal project proposals, scopes of work (SOW), and bilateral Non-Disclosure Agreements (NDAs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            2. Service Scopes &amp; Quotations
          </h2>
          <p>
            All quotations and turnaround estimates provided by DataGalactic are based on sample batches, documented specifications, and defined volume inputs. Changes in source document quality, schema complexity, or volume will be communicated and agreed upon prior to execution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            3. Quality Verification &amp; Client Review
          </h2>
          <p>
            DataGalactic employs multi-stage human verification checks. Clients are encouraged to review deliverables upon receipt. In the rare event of discrepancies inconsistent with the agreed specifications, we provide prompt corrective revisions within the project warranty window.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            4. Client Intellectual Property
          </h2>
          <p>
            All data, documents, templates, spreadsheets, and deliverables provided to or created by DataGalactic for the client remain the exclusive intellectual property of the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            5. Inquiries &amp; Notices
          </h2>
          <p>
            For legal inquiries or questions regarding our operational agreements, please contact:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
            <p><strong>DataGalactic Legal &amp; Operations Desk</strong></p>
            <p>Email: <a href="mailto:hello@datagalactic.in" className="text-[#0047AB] underline">hello@datagalactic.in</a></p>
            <p>Location: Tamil Nadu, India</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TermsPage;
