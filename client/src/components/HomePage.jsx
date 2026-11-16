import React from 'react';
import Hero from './Hero';
import AboutUs from './AboutUs';
import ServicesSection from './ServicesSection';
import IndustriesSection from './IndustriesSection';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import PortfolioSection from './PortfolioSection';
import DataSecurity from './DataSecurity';
import FAQSection from './FAQSection';
import FinalCTA from './FinalCTA';
import QuoteContactSection from './QuoteContactSection';

const HomePage = () => {
  return (
    <main className="flex-grow">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Company Introduction */}
      <AboutUs />

      {/* 3. Our Core Services */}
      <ServicesSection />

      {/* 4. Industries We Serve */}
      <IndustriesSection />

      {/* 5. Why Choose DataGalactic */}
      <WhyChooseUs />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Sample Projects / Portfolio */}
      <PortfolioSection />

      {/* 8. Data Security & Confidentiality */}
      <DataSecurity />

      {/* 9. Frequently Asked Questions */}
      <FAQSection />

      {/* 10. Final CTA Section */}
      <FinalCTA />

      {/* 11. Lead Generation / Contact Form */}
      <QuoteContactSection />
    </main>
  );
};

export default HomePage;
