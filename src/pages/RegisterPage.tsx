import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      alert('Por favor ingresa un nombre de usuario y contraseña');
      return;
    }

    const storedUsers = sessionStorage.getItem('users'); // Cambiado a sessionStorage
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (users[username]) {
      alert('El nombre de usuario ya está registrado. Elige otro.');
      return;
    }

    const newUser = { username, password, role };
    users[username] = newUser;
    sessionStorage.setItem('users', JSON.stringify(users)); // Cambiado a sessionStorage

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
      <h2>Registrarse</h2>
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
      <TextField
        select
        label='Rol'
        variant='outlined'
        value={role}
        onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
        margin='normal'
      >
        <MenuItem value='admin'>Admin</MenuItem>
        <MenuItem value='user'>User</MenuItem>
      </TextField>
      <Button variant='contained' color='primary' onClick={handleRegister}>
        Registrarse
      </Button>
    </Box>
  );
};

export default RegisterPage;
