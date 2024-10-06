import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const [data, setData] = useState<any[]>([]);
  const { username } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=5'
        );
        const apiData = response.data;

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
        {`Bienvenido, ${username || 'Usuario'}`}
      </Typography>
      <Typography variant='body1'>Aquí están los datos disponibles:</Typography>

      <List>
        {data.length > 0 ? (
          data.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} secondary={item.body} />
            </ListItem>
          ))
        ) : (
          <Typography>No hay datos disponibles.</Typography>
        )}
      </List>
    </Box>
  );
};

export default UserPage;
