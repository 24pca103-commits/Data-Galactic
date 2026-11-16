import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import InnerHero3DBackground from './InnerHero3DBackground';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative bg-[#05142f] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 overflow-hidden border-b border-[#122f5c]">
        <InnerHero3DBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400 mb-2.5 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-[#aac7ee] font-semibold">Privacy Policy</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Last updated: January 2025. Transparent policies regarding client data, non-disclosure terms, and information handling.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            1. Introduction &amp; Commitment to Confidentiality
          </h2>
          <p>
            DataGalactic ("we," "our," or "us") provides specialized data management, business research, and back-office outsourcing services. We respect and prioritize the confidentiality of all client data and inquiries. This Privacy Policy details how we collect, handle, protect, and dispose of information provided to us through our website and operational workflows.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            2. Information We Collect
          </h2>
          <p>
            We collect information strictly necessary to provide proposals and execute client projects:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
            <li><strong>Contact &amp; Identity Data:</strong> Full name, business email address, company name, country, and telephone/WhatsApp number.</li>
            <li><strong>Project Specifications:</strong> Required service, project type, estimated data volume, requirements description, and sample files.</li>
            <li><strong>Technical Usage Data:</strong> Standard website analytics (browser type, operating system, anonymous page interactions) to optimize site performance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            3. Use of Project Data &amp; Non-Disclosure
          </h2>
          <p>
            Any project datasets, spreadsheets, documents, or credentials shared with DataGalactic are used exclusively to evaluate scope, provide quotations, and execute agreed operational tasks. We enforce bilateral Non-Disclosure Agreements (NDAs) and never sell, rent, lease, or share client information with external third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            4. Data Security Safeguards
          </h2>
          <p>
            We implement strict procedural, technical, and operational safeguards:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
            <li>Restricted system access based on the principle of least privilege.</li>
            <li>Encrypted file transfer channels for batch uploads and deliverables.</li>
            <li>Clean desk and external storage device restrictions on operational machines.</li>
            <li>Permanent data deletion from working terminals upon project sign-off and acceptance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
            5. Contact Information
          </h2>
          <p>
            For questions regarding this policy or to request data deletion, contact us at:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
            <p><strong>DataGalactic Operations Center</strong></p>
            <p>Email: <a href="mailto:hello@datagalactic.in" className="text-[#0047AB] underline">hello@datagalactic.in</a></p>
            <p>Location: Tamil Nadu, India</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
