import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { Star, X, CheckCircle2, AlertCircle, Loader2, MessageSquareQuote, Sparkles } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose, onFeedbackSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    clientType: '',
    region: '',
    serviceType: 'Data Entry Services',
    rating: 5,
    quote: '',
    email: '',
    company: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const servicesList = [
    'Data Entry Services',
    'Catalog Management & SKU Data Entry',
    'Data Processing & Cleaning',
    'Invoice Processing & Document Conversion',
    'PDF to Excel / Word Conversion',
    'Web Research & Data Mining',
    'Healthcare Data Entry & Compliance',
    'Property Records & Lead Research',
    'Back Office & Administrative Support',
    'Other Custom Service'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.quote.trim()) {
      setErrorMsg('Please provide your name and feedback description.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/feedback', {
        name: formData.name.trim(),
        clientType: formData.clientType.trim() || 'Corporate Client',
        region: formData.region.trim() || 'Global',
        serviceType: formData.serviceType,
        rating: formData.rating,
        quote: formData.quote.trim(),
        email: formData.email.trim(),
        company: formData.company.trim()
      });

      if (response.data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
        if (onFeedbackSubmitted) onFeedbackSubmitted();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit review. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      clientType: '',
      region: '',
      serviceType: 'Data Entry Services',
      rating: 5,
      quote: '',
      email: '',
      company: ''
    });
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Thank You for Your Feedback!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              Your testimonial has been submitted. Our team reviews all client submissions, and it will be published to the live testimonials carousel shortly!
            </p>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-semibold text-xs shadow-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21262d] border border-[#38bdf8]/30 text-xs font-semibold text-[#7dd3fc] mb-3">
                <MessageSquareQuote className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Client Experience</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
                Share Your Experience
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Help international businesses discover the quality of DataGalactic's back-office services.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Rating (1 to 5 Stars) *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || formData.rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            active ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-semibold text-amber-400 ml-2">
                    {formData.rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full px-3.5 py-2 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Role / Client Type
                  </label>
                  <input
                    type="text"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    placeholder="e.g. International E-commerce Brand"
                    className="w-full px-3.5 py-2 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              {/* Region & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder="e.g. United States / Europe"
                    className="w-full px-3.5 py-2 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Service Received
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                  >
                    {servicesList.map((svc, idx) => (
                      <option key={idx} value={svc} className="bg-[#161b22]">
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feedback Quote */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Review / Testimonial *
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Share details regarding accuracy, turnaround speed, and communication..."
                  className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#38bdf8] text-white font-semibold text-xs shadow-lg hover:shadow-[#38bdf8]/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting review...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Client Review</span>
                  </>
                )}
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};

export default FeedbackModal;
