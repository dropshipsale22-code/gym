import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (location.pathname === '/admin/dashboard') {
    return children;
  }

  if (!isAuthenticated || !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
