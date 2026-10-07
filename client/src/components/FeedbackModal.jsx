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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              Thank You for Your Feedback!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Your testimonial has been submitted. Our team reviews all client submissions, and it will be published to the live testimonials carousel shortly!
            </p>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 mb-3">
                <MessageSquareQuote className="w-3.5 h-3.5 text-sky-600" />
                <span>Client Experience</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                Share Your Experience
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Help international businesses discover the quality of DataGalactic's back-office services.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-600 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                            active ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-semibold text-amber-500 ml-2">
                    {formData.rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Role / Client Type
                  </label>
                  <input
                    type="text"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    placeholder="e.g. International E-commerce Brand"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Region & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder="e.g. United States / Europe"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Service Received
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:bg-white"
                  >
                    {servicesList.map((svc, idx) => (
                      <option key={idx} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feedback Quote */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Review / Testimonial *
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Share details regarding accuracy, turnaround speed, and communication..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-sky-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
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
