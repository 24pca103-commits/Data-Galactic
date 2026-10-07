import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('dg_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dg_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Check URL / hash to see if admin route is requested
  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#admin' || hash.startsWith('#/admin') || path === '/admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  // Verify stored token on load if in admin view
  useEffect(() => {
    if (adminToken && isAdminView) {
      axios
        .get('/api/admin/verify', {
          headers: { Authorization: `Bearer ${adminToken}` }
        })
        .then((res) => {
          if (!res.data.success) {
            handleLogout();
          }
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [adminToken, isAdminView]);

  const handleLoginSuccess = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('dg_admin_token', token);
    localStorage.setItem('dg_admin_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAdminToken('');
    setAdminUser(null);
    localStorage.removeItem('dg_admin_token');
    localStorage.removeItem('dg_admin_user');
  };

  const handleBackToSite = () => {
    window.location.hash = '#home';
    setIsAdminView(false);
  };

  // If viewing admin route
  if (isAdminView) {
    if (!adminToken) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToSite={handleBackToSite}
        />
      );
    }

    return (
      <AdminDashboard
        token={adminToken}
        adminUser={adminUser}
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Public User-Facing Website
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans relative selection:bg-sky-500 selection:text-white">
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

        {/* Proof, Trust & Final CTA with Dynamic Published Testimonials */}
        <Testimonials />
        <FinalCTA />

        {/* NAV LINK 7: CONTACT / GET A QUOTE */}
        <QuoteContactSection />
      </main>

      {/* Floating Action Buttons (WhatsApp + Scroll to Top) */}
      <FloatingActions />

      {/* Corporate Footer with Admin Portal Link */}
      <Footer />
    </div>
  );
}

export default App;
