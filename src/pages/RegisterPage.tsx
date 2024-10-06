import React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import useFormValidation from '../hooks/useFormValidation';
import registerSchema from '../validation/registerSchema';
import styles from './styles/RegisterPage.module.css';

const initialValues = {
  username: '',
  password: '',
  role: '',
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    registerSchema
  );
  const { showSuccess, showError } = useToast();

  const onSubmit = async () => {
    try {
      const storedUsers = sessionStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : {};

      if (users[values.username]) {
        showError('El nombre de usuario ya está registrado. Elige otro.');
        return;
      }

      const newUser = {
        username: values.username,
        password: values.password,
        role: values.role,
      };
      users[values.username] = newUser;
      sessionStorage.setItem('users', JSON.stringify(users));

      showSuccess('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      showError('Hubo un error al registrarse. Intenta de nuevo.');
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.formSection}>
        <h1 className={styles.title}>Creacion de usuario</h1>
        <Box
          className={styles.form}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            className={styles.inputField}
            name='username'
            label='Nombre de Usuario'
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
          <TextField
            className={styles.inputField}
            name='role'
            label='Rol'
            select
            variant='outlined'
            fullWidth
            value={values.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            sx={{
              backgroundColor: '#f9f9f9',
              marginTop: '1rem',
            }}
          >
            <MenuItem value='' disabled>
              <em>Rol</em>
            </MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </TextField>
          <Button
            variant='contained'
            className={styles.registerButton}
            type='submit'
            sx={{ marginTop: '1rem' }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
