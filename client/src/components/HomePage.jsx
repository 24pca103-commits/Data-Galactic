import React from 'react';
import Hero from './Hero';
import AboutUs from './AboutUs';
import ServicesSection from './ServicesSection';
import QuoteCalculator from './QuoteCalculator';
import WhyChooseUs from './WhyChooseUs';
import IndustriesSection from './IndustriesSection';
import HowItWorks from './HowItWorks';
import DataSecurity from './DataSecurity';
import Testimonials from './Testimonials';
import FeedbackSection from './FeedbackSection';
import FinalCTA from './FinalCTA';
import QuoteContactSection from './QuoteContactSection';

const HomePage = () => {
  return (
    <main className="flex-grow">
      {/* 1. HERO */}
      <Hero />

      {/* 2. ABOUT US */}
      <AboutUs />

      {/* 3. SERVICES */}
      <ServicesSection />
      <QuoteCalculator />
      <WhyChooseUs />

      {/* 4. INDUSTRIES */}
      <IndustriesSection />

      {/* 5. HOW IT WORKS */}
      <HowItWorks />

      {/* 6. DATA SECURITY */}
      <DataSecurity />

      {/* 7. TESTIMONIALS */}
      <Testimonials />

      {/* 8. FINAL CALL TO ACTION */}
      <FinalCTA />

      {/* 10. CONTACT / QUOTE FORM */}
      <QuoteContactSection />
    </main>
  );
};

export default HomePage;
