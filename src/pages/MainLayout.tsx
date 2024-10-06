import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />

      <Toolbar />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Container>{children}</Container>{' '}
      </Box>
    </Box>
  );
};

export default MainLayout;
