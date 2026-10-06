import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ServicesSection from './components/ServicesSection';
import QuoteCalculator from './components/QuoteCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import IndustriesSection from './components/IndustriesSection';
import HowItWorks from './components/HowItWorks';
import DataSecurity from './components/DataSecurity';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import QuoteContactSection from './components/QuoteContactSection';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col font-sans relative selection:bg-sky-500 selection:text-white">
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      {/* Main Page Flow strictly structured in exact Navbar order */}
      <main className="flex-grow">
        
        {/* NAV LINK 1: HOME */}
        <Hero />

        {/* NAV LINK 2: ABOUT US */}
        <AboutUs />

        {/* NAV LINK 3: SERVICES */}
        <ServicesSection />
        <QuoteCalculator />
        <WhyChooseUs />

        {/* NAV LINK 4: INDUSTRIES */}
        <IndustriesSection />

        {/* NAV LINK 5: HOW IT WORKS */}
        <HowItWorks />

        {/* NAV LINK 6: DATA SECURITY */}
        <DataSecurity />

        {/* Proof, Trust & Final CTA */}
        <Testimonials />
        <FinalCTA />

        {/* NAV LINK 7: CONTACT / GET A QUOTE */}
        <QuoteContactSection />
      </main>

      {/* Floating Action Buttons (WhatsApp + Scroll to Top) */}
      <FloatingActions />

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}

export default App;
