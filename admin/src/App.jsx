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
      if (adminToken === 'offline-admin-token') return;
      axios
        .get('/api/admin/verify', {
          headers: { Authorization: `Bearer ${adminToken}` },
          withCredentials: true
        })
        .then((res) => {
          if (!res.data.success) {
            handleLogout();
          }
        })
        .catch((err) => {
          // Only log out if specifically 401 Unauthorized (invalid/expired token)
          // Do NOT log out on network error or server wake up delays
          if (err.response && err.response.status === 401) {
            handleLogout();
          }
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
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    window.location.href = isLocal ? 'http://localhost:5173' : (import.meta.env.VITE_CLIENT_URL || '/');
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
