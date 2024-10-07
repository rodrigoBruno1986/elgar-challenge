import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <Box mb={4}>
        <img
          src='/acceso-denegado.png'
          alt='Acceso Denegado'
          style={{ maxWidth: '40%', height: 'auto', margin: 'auto' }}
        />
      </Box>

      <Typography variant='h3' color='error' gutterBottom>
        Acceso Denegado
      </Typography>
      <Typography variant='h6' gutterBottom>
        No tienes permiso para acceder a esta página.
      </Typography>
      <Button variant='contained' color='primary' onClick={goBack}>
        Volver
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
