import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  roleRequired: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleRequired }) => {
  const { isAuthenticated, userRole, token } = useAuth();

  if (!isAuthenticated || !token) {
    return <Navigate to='/login' />;
  }

  if (userRole !== roleRequired) {
    return <Navigate to='/unauthorized' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
