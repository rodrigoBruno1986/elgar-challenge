// src/components/Preloader.tsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Preloader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Preloader;
