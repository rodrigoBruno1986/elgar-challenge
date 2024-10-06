import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './styles/LoginPage.module.css';

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
    <Box className={styles.container}>
      <Box className={styles.imageSection}>
        <img src='/image.png' alt='Tech Image' className={styles.image} />
      </Box>

      <Box className={styles.formSection}>
        <h1 className={styles.title}>Challenge Ssr User </h1>
        <Box className={styles.form}>
          <TextField
            className={styles.inputField}
            label='Usuario'
            variant='outlined'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: '#f9f9f9',
              fontFamily: 'Futura PT Light',
              marginTop: '1rem',
            }}
          />
          <TextField
            className={styles.inputField}
            label='Contrasena'
            type='password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: '#f9f9f9',
              fontFamily: 'Futura PT Light',
              marginTop: '1rem',
            }}
          />
          <Button
            variant='contained'
            className={styles.loginButton}
            onClick={handleLogin}
            sx={{
              marginTop: '1rem',
            }}
          >
            Aceptar
          </Button>
          <Button
            variant='text'
            className={styles.registerButton}
            onClick={handleRegisterRedirect}
            sx={{
              marginTop: '1rem',
            }}
          >
            ¿No tienes un usuario? Registrarse
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
