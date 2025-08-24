import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import Admin from '../pages/Admin';

const ProtectedAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si ya está autenticado
    const authStatus = localStorage.getItem('motorsale_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    localStorage.removeItem('motorsale_admin_auth');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <Admin onLogout={handleLogout} />;
};

export default ProtectedAdmin;
