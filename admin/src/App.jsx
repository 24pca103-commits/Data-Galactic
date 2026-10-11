import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('dg_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dg_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Verify stored token with backend
  useEffect(() => {
    if (adminToken) {
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
  }, [adminToken]);

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
    window.location.href = 'http://localhost:5173';
  };

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
      initialTab="overview"
      onLogout={handleLogout}
      onBackToSite={handleBackToSite}
    />
  );
}

export default App;
