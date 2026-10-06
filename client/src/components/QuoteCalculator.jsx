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
    <section className="py-20 relative bg-[#1b2631] overflow-hidden border-y border-[#384959]/80">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#384959]/80 border border-[#88BDF2]/30 text-xs font-semibold text-[#BDDDFC]">
            <Calculator className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Interactive Cost & Time Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Estimate Your Outsourcing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BDDDFC] via-[#88BDF2] to-[#6A89A7]">
              Efficiency & Savings
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#BDDDFC]/80">
            See how much operational budget and time you can save by partnering with DataGalactic.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#2d3e50]/95 to-[#243342]/95 border border-[#88BDF2]/30 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Controls Left */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold text-[#BDDDFC] mb-2">
                  1. Select Target Service Area
                </label>
                <select
                  value={serviceIndex}
                  onChange={(e) => setServiceIndex(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-[#1b2631] border border-[#384959] text-white text-sm focus:outline-none focus:border-[#88BDF2] cursor-pointer"
                >
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={i} className="bg-[#243342] text-white">
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-[#BDDDFC]">
                    2. Estimated Volume ({currentService.unit})
                  </label>
                  <span className="font-mono text-sm font-bold text-[#88BDF2]">
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
                  className="w-full h-2 bg-[#384959] rounded-lg appearance-none cursor-pointer accent-[#88BDF2]"
                />
                <div className="flex justify-between text-[10px] text-[#6A89A7] font-mono mt-1">
                  <span>500</span>
                  <span>10,000</span>
                  <span>25,000</span>
                  <span>50,000+</span>
                </div>
              </div>

              {/* Delivery Speed Radio */}
              <div>
                <label className="block text-xs font-semibold text-[#BDDDFC] mb-2">
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
                          ? 'bg-[#88BDF2]/20 border-[#88BDF2] text-[#BDDDFC]'
                          : 'bg-[#1b2631] border-[#384959] text-[#6A89A7] hover:border-[#6A89A7]'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Output Right Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#1b2631]/90 border border-[#88BDF2]/30 space-y-5 text-center sm:text-left">
              <div className="flex items-center justify-between border-b border-[#384959] pb-3">
                <span className="text-xs font-medium text-[#6A89A7]">Estimated Cost Advantage</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  ~60% Savings
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-[#6A89A7]">Estimated Internal In-House Cost:</p>
                  <p className="text-base font-bold text-slate-400 line-through decoration-red-500/80">
                    \${inHouseEstimatedCost.toLocaleString()} USD
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-[#6A89A7]">DataGalactic Dedicated Solution:</p>
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#BDDDFC] via-[#88BDF2] to-[#6A89A7] font-['Space_Grotesk']">
                    \${outsourcedCost.toLocaleString()} <span className="text-xs text-[#6A89A7] font-normal">USD (est.)</span>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#384959]/50 border border-[#88BDF2]/25 text-[11px] text-[#BDDDFC] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#88BDF2] shrink-0" />
                <span>Includes dedicated QA & Double-Key verification.</span>
              </div>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-semibold text-[#1b2631] bg-gradient-to-r from-[#88BDF2] to-[#BDDDFC] hover:from-[#BDDDFC] hover:to-[#88BDF2] rounded-xl shadow-md transition-all group"
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
