import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

const UserPage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        const apiData = response.data.slice(0, 5);

        const storedData = localStorage.getItem('adminData');
        const localData = storedData ? JSON.parse(storedData) : [];

        const combinedData = apiData.map((item: any) => {
          const localItem = localData.find(
            (local: any) => local.id === item.id
          );
          return localItem || item;
        });

        const newItems = localData.filter(
          (local: any) => local.id > apiData.length
        );
        const finalData = [...combinedData, ...newItems];

        setData(finalData);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        Bienvenido, Usuario
      </Typography>
      <LogoutButton />
      <Typography variant='body1'>Aquí están los datos disponibles:</Typography>

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
