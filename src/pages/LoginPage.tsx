import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import useFormValidation from '../hooks/useFormValidation';
import loginSchema from '../validation/loginSchema';
import styles from './styles/LoginPage.module.css';

const initialValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    loginSchema
  );

  const { showSuccess, showError } = useToast();

  const onSubmit = async () => {
    try {
      await login(values.username, values.password);
      const storedRole = sessionStorage.getItem('role');

      showSuccess('Login exitoso!');

      if (storedRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      showError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.imageSection}>
        <img src='/image.png' alt='Tech Background' className={styles.image} />
      </Box>

      <Box className={styles.formSection}>
        <h1 className={styles.title}>Challenge Ssr User</h1>
        <Box
          className={styles.form}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            className={styles.inputField}
            name='username'
            label='Usuario'
            variant='outlined'
            fullWidth
            value={values.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            sx={{
              backgroundColor: '#f9f9f9',
              marginTop: '1rem',
            }}
          />
          <TextField
            className={styles.inputField}
            name='password'
            label='Contraseña'
            type='password'
            variant='outlined'
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              backgroundColor: '#f9f9f9',
              marginTop: '1rem',
            }}
          />
          <Button
            variant='contained'
            className={styles.loginButton}
            type='submit'
            sx={{ marginTop: '1rem' }}
          >
            Aceptar
          </Button>
          <Button
            variant='text'
            className={styles.registerButton}
            onClick={() => navigate('/register')}
            sx={{ marginTop: '1rem' }}
          >
            ¿No tienes un usuario? Registrarse
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
