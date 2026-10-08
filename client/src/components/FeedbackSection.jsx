import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import {
  Star,
  MessageSquareHeart,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Mail,
  Globe2,
  Sparkles,
  Layers
} from 'lucide-react';

const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    serviceType: 'Data Entry Services',
    clientType: '',
    region: '',
    rating: 5,
    quote: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const servicesList = [
    'Data Entry Services',
    'Data Processing & Cleaning',
    'Data Conversion (PDF / OCR / Excel)',
    'Web Research & Data Mining',
    'E-commerce Catalog & Product Listing',
    'Back Office & Administrative Support',
    'Healthcare & HIPAA Records Data Entry',
    'Real Estate & Property Research',
    'Other Custom Service'
  ];

  const ratingLabels = {
    1: 'Needs Improvement (1/5)',
    2: 'Fair (2/5)',
    3: 'Good (3/5)',
    4: 'Very Good (4/5)',
    5: 'Exceptional Quality (5/5)'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.quote.trim()) {
      setErrorMsg('Please enter both your name and your feedback review.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/feedback', {
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        serviceType: formData.serviceType,
        clientType: formData.clientType.trim() || 'Corporate Partner',
        region: formData.region.trim() || 'Global',
        rating: formData.rating,
        quote: formData.quote.trim()
      });

      if (response.data.success) {
        setSubmittedSuccess(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors.map((e) => e.message).join(', ')) ||
        'Unable to submit your feedback at this time. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedSuccess(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      serviceType: 'Data Entry Services',
      clientType: '',
      region: '',
      rating: 5,
      quote: ''
    });
    setErrorMsg('');
  };

  return (
    <section id="feedback" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-sky-700 shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5 text-sky-600" />
            <span>Client Feedback & Review</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Share Your Experience With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
              DataGalactic
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have you partnered with us on a data processing or back-office project? Let us know how our team performed. Your review helps us continuously elevate our service standards.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 relative">
          
          {submittedSuccess ? (
            /* Success State */
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your review has been successfully submitted to our operations team. Once verified, it will be proudly featured in our client testimonials showcase.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>Submit Another Review</span>
                </button>
              </div>
            </div>
          ) : (
            /* Feedback Form */
            <form onSubmit={handleSubmit} className="space-y-6">

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Star Rating Section */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  How would you rate our service quality? *
                </label>

                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          (hoverRating || formData.rating) >= star
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold text-sky-700">
                  {ratingLabels[hoverRating || formData.rating]}
                </p>
              </div>

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Work Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. j.doe@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Company & Service Outsourced */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Company / Organization Name (Optional)
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Apex Global Logistics"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Service Outsourced *
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    >
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Role / Industry & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Your Role / Industry (Optional)
                  </label>
                  <input
                    type="text"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    placeholder="e.g. VP of Operations / E-Commerce"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Location / Country (Optional)
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      placeholder="e.g. United States, UK, France, Germany"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Your Detailed Feedback / Testimonial *
                </label>
                <textarea
                  name="quote"
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="Share how DataGalactic assisted your workflow, turn-around speed, data accuracy, or team responsiveness..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-white text-base bg-slate-900 hover:bg-sky-700 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Your Feedback...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Client Feedback</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

export default FeedbackSection;
