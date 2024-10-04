// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <Typography variant='h3' color='error' gutterBottom>
        Acceso Denegado
      </Typography>
      <Typography variant='h6' gutterBottom>
        No tienes permiso para acceder a esta página.
      </Typography>
      <Button variant='contained' color='primary' onClick={goToLogin}>
        Volver al Login
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
