import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServiceDetailPage from './components/ServiceDetailPage';
import IndustryDetailPage from './components/IndustryDetailPage';
import ServicesPage from './components/ServicesPage';
import IndustriesPage from './components/IndustriesPage';
import AboutPage from './components/AboutPage';
import HowItWorksPage from './components/HowItWorksPage';
import SecurityPage from './components/SecurityPage';
import TestimonialsPage from './components/TestimonialsPage';
import ContactPage from './components/ContactPage';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans relative selection:bg-sky-500 selection:text-white">
        
        {/* Navigation Bar with Sub-menus */}
        <Navbar />

        {/* Dynamic Route View */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:industryId" element={<IndustryDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        {/* Floating Actions (WhatsApp + Scroll to Top) */}
        <FloatingActions />

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
