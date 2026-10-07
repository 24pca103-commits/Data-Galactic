import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

const QuoteCalculator = () => {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [recordCount, setRecordCount] = useState(2500);
  const [deliverySpeed, setDeliverySpeed] = useState('Standard (48-72h)');

  const serviceOptions = [
    { name: 'Data Entry (Online/Offline/Excel)', baseRatePer1000: 25, unit: 'Records' },
    { name: 'Data Cleansing & Verification', baseRatePer1000: 30, unit: 'Rows' },
    { name: 'PDF / Document Conversion', baseRatePer1000: 35, unit: 'Pages/Files' },
    { name: 'E-commerce SKU Product Listing', baseRatePer1000: 50, unit: 'SKUs' },
    { name: 'Web Research & Contact Mining', baseRatePer1000: 45, unit: 'Leads' },
    { name: 'Dedicated Back-Office Assistant', baseRatePer1000: 20, unit: 'Hours' }
  ];

  const currentService = serviceOptions[serviceIndex];

  // Calculate approximate savings
  const inHouseEstimatedCost = Math.round(((recordCount / 1000) * currentService.baseRatePer1000) * 2.8);
  const outsourcedCost = Math.round((recordCount / 1000) * currentService.baseRatePer1000);

  return (
    <section className="py-20 relative bg-white overflow-hidden border-b border-slate-200">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Cost & Time Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Estimate Your Outsourcing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700">
              Efficiency & Savings
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            See how much operational budget and time you can save by partnering with DataGalactic.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Controls Left */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  1. Select Target Service Area
                </label>
                <select
                  value={serviceIndex}
                  onChange={(e) => setServiceIndex(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-sky-500 cursor-pointer shadow-sm"
                >
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={i} className="bg-white text-slate-800">
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-700">
                    2. Estimated Volume ({currentService.unit})
                  </label>
                  <span className="font-mono text-sm font-bold text-sky-600">
                    {recordCount.toLocaleString()} {currentService.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={recordCount}
                  onChange={(e) => setRecordCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>500</span>
                  <span>10,000</span>
                  <span>25,000</span>
                  <span>50,000+</span>
                </div>
              </div>

              {/* Delivery Speed Radio */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  3. Turnaround SLA Requirement
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Standard (48-72h)', 'Priority Express (24h)'].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setDeliverySpeed(speed)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        deliverySpeed === speed
                          ? 'bg-sky-100 border-sky-500 text-sky-900 font-bold shadow-sm'
                          : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Output Right Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-5 text-center sm:text-left shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-medium text-slate-500">Estimated Cost Advantage</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  ~60% Savings
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-slate-500">Estimated Internal In-House Cost:</p>
                  <p className="text-base font-bold text-slate-400 line-through decoration-red-500">
                    ${inHouseEstimatedCost.toLocaleString()} USD
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500">DataGalactic Dedicated Solution:</p>
                  <p className="text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                    ${outsourcedCost.toLocaleString()} <span className="text-xs text-slate-500 font-normal">USD (est.)</span>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-sky-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Includes dedicated QA & Double-Key verification.</span>
              </div>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 rounded-xl shadow-md transition-all group"
              >
                <span>Lock In This Custom Quote</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default QuoteCalculator;
