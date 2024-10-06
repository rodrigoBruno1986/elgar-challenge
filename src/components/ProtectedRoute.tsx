import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  roleRequired: 'admin' | 'user';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roleRequired,
  children,
}) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (roleRequired === 'user' && userRole !== 'user' && userRole !== 'admin') {
    return <Navigate to='/unauthorized' />;
  }

  if (roleRequired !== 'user' && userRole !== roleRequired) {
    return <Navigate to='/unauthorized' />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
