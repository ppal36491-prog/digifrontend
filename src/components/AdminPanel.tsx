import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import '../styles/admin.css';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate({ to: '/admin' });
  };

  if (loading) {
    return (
      <div className="admin-loader">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
