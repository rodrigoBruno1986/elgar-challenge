import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

const UserPage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    axios
      .get(`${API_URL}/posts`)
      .then((response) => {
        setData(response.data.slice(0, 5));
        console.log('Datos de la API:', response.data);
      })
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        Bienvenido, Usuarioa
      </Typography>
      <LogoutButton />
      <Typography variant='body1'>Aquí están tus datos simulados:</Typography>

      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={item.body} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserPage;
