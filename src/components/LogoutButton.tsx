import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button variant='contained' color='secondary' onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
