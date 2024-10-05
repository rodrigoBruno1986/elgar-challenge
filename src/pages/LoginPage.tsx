import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      const storedRole = sessionStorage.getItem('role');
      if (storedRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <h2>Iniciar Sesión</h2>
      <TextField
        label='Nombre de Usuario'
        variant='outlined'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin='normal'
      />
      <TextField
        label='Contraseña'
        variant='outlined'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin='normal'
      />
      <Button variant='contained' color='primary' onClick={handleLogin}>
        INICIAR SESIÓN
      </Button>

      <Button
        variant='text'
        color='secondary'
        onClick={handleRegisterRedirect}
        sx={{ mt: 2 }}
      >
        ¿No tienes una cuenta? Registrarse
      </Button>
    </Box>
  );
};

export default LoginPage;
