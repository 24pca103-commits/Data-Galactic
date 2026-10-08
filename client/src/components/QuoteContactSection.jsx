import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  Globe2,
  Sparkles
} from 'lucide-react';

const QuoteContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    country: '',
    service: 'Data Entry Services',
    projectType: 'One-time Project',
    estimatedVolume: '',
    description: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  const servicesList = [
    'Data Entry Services',
    'Data Processing & Cleaning',
    'Data Conversion (PDF / OCR / Excel)',
    'Web Research & Data Mining',
    'E-commerce Catalog & Product Listing',
    'Back Office & Administrative Support',
    'Other / Custom Enterprise Requirement'
  ];

  const projectTypes = [
    'One-time Project',
    'Ongoing / Dedicated Team',
    'Trial / Pilot Project',
    'Custom Consultation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.country.trim() || !formData.description.trim()) {
      setErrorMsg('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        country: formData.country.trim(),
        service: formData.service,
        projectType: formData.projectType,
        estimatedVolume: formData.estimatedVolume.trim() || 'Not specified',
        description: formData.description.trim(),
        phone: formData.phone.trim()
      };

      const response = await axios.post('/api/contact', payload);

      if (response.data.success) {
        setSuccessData(response.data);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors.map(e => e.message).join(', ')) ||
        'Unable to submit project details. Please email us directly at hello@datagalactic.in';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccessData(null);
    setFormData({
      name: '',
      companyName: '',
      email: '',
      country: '',
      service: 'Data Entry Services',
      projectType: 'One-time Project',
      estimatedVolume: '',
      description: '',
      phone: ''
    });
    setErrorMsg('');
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50 border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-100/60 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-blue-100/40 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Free Project Estimation & Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Request a Free Project{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              Quote & Proposal
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Tell us about your data workload, timelines, or format requirements. We will analyze your specifications and respond with a customized proposal within 12–24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                Direct Communication
              </h3>
              
              <div className="space-y-4 text-sm text-slate-600">
                <a
                  href="mailto:hello@datagalactic.in"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Business Inquiries</p>
                    <p className="font-semibold text-slate-800">hello@datagalactic.in</p>
                  </div>
                </a>

                <a
                  href="mailto:datagalactic2@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-slate-200 text-slate-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Secondary Inquiries</p>
                    <p className="font-semibold text-slate-800">datagalactic2@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919363164608"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Direct Contact / WhatsApp</p>
                    <p className="font-semibold text-slate-800">+91 9363164608</p>
                  </div>
                </a>
              </div>

              {/* Office Details */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Founder & CEO: <strong className="text-slate-900">Risona R</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Tamil Nadu, India (Worldwide Delivery)</span>
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-sky-700 text-sm font-semibold">
                <Lock className="w-4 h-4" />
                <span>NDA & Confidentiality</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All requirements, schemas, and project descriptions submitted are strictly protected under our client confidentiality policy. We never share or sell client data.
              </p>
            </div>

          </div>

          {/* Right Column: Lead Generation & Quote Form */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              
              {successData ? (
                /* Success Screen */
                <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Space_Grotesk']">
                      Project Received!
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Thank you, <strong className="text-slate-900">{successData.data?.name}</strong>. Your enquiry for <strong className="text-sky-700">{successData.data?.companyName}</strong> has been logged in our queue.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left space-y-2 text-xs sm:text-sm text-slate-700">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Service:</span>
                      <span className="font-semibold text-sky-700">{successData.data?.service}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Turnaround Notice:</span>
                      <span className="text-slate-700">Quote sent within 12–24 hours</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Direct Inquiries:</span>
                      <span className="text-sky-700">hello@datagalactic.in</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-sky-700 rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Screen */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Full Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. John Miller"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Company Name <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Apex Global Logistics Ltd."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Business Email <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. j.miller@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Country <span className="text-sky-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. United States, UK, Germany, etc."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Service Required <span className="text-sky-600">*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                      >
                        {servicesList.map((s, idx) => (
                          <option key={idx} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Project Type <span className="text-sky-600">*</span>
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                      >
                        {projectTypes.map((t, idx) => (
                          <option key={idx} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Estimated Data Volume (Optional)
                      </label>
                      <input
                        type="text"
                        name="estimatedVolume"
                        value={formData.estimatedVolume}
                        onChange={handleInputChange}
                        placeholder="e.g. 5,000 PDF invoices, 20 hrs/week"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +1 (555) 019-2834"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Project Description & Requirements <span className="text-sky-600">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Please outline the nature of your data, source file formats, required deliverables, expected accuracy guidelines, and turnaround timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                    />
                  </div>



                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-bold text-white text-base bg-slate-900 hover:bg-sky-700 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Your Project...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Your Project</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      100% Secure &amp; Confidential. We will never share your information.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default QuoteContactSection;
