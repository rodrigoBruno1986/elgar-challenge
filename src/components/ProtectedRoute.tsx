import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  roleRequired: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleRequired }) => {
  const { isAuthenticated, userRole, token, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated || !token) {
    console.log('Redirigiendo a /login porque no está autenticado');
    return <Navigate to='/login' />;
  }

  if (userRole !== roleRequired) {
    console.log(
      `Redirigiendo a /unauthorized, rol requerido: ${roleRequired}, rol actual: ${userRole}`
    );
    return <Navigate to='/unauthorized' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
