import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

const AdminPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [editedTitles, setEditedTitles] = useState<{ [key: number]: string }>(
    {}
  );
  const [editedBodies, setEditedBodies] = useState<{ [key: number]: string }>(
    {}
  );
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemBody, setNewItemBody] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setData(response.data.slice(0, 5)))
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  const handleTitleChange = (id: number, value: string) => {
    setEditedTitles((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleBodyChange = (id: number, value: string) => {
    setEditedBodies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEdit = (id: number) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            title: editedTitles[id] || item.title,
            body: editedBodies[id] || item.body,
          }
        : item
    );
    setData(updatedData);
    setEditedTitles((prev) => ({ ...prev, [id]: '' }));
    setEditedBodies((prev) => ({ ...prev, [id]: '' }));
  };

  const handleCreate = () => {
    const newItem = {
      id: data.length + 1,
      title: newItemTitle,
      body: newItemBody,
    };
    setData([...data, newItem]);
    setNewItemTitle('');
    setNewItemBody('');
  };

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        Panel de Administrador
      </Typography>
      <LogoutButton />
      <Typography variant='body1'>
        Aquí puedes ver, editar y crear nuevos datos:
      </Typography>

      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={item.body} />
            <TextField
              label='Nuevo Título'
              variant='outlined'
              value={editedTitles[item.id] || ''}
              onChange={(e) => handleTitleChange(item.id, e.target.value)}
              size='small'
              margin='normal'
            />
            <TextField
              label='Nuevo Body'
              variant='outlined'
              value={editedBodies[item.id] || ''}
              onChange={(e) => handleBodyChange(item.id, e.target.value)}
              size='small'
              margin='normal'
              sx={{ ml: 2 }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleEdit(item.id)}
              sx={{ ml: 2 }}
            >
              Editar
            </Button>
          </ListItem>
        ))}
      </List>

      <Box mt={4}>
        <Typography variant='h6'>Crear un nuevo dato:</Typography>
        <TextField
          label='Título'
          variant='outlined'
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Body'
          variant='outlined'
          value={newItemBody}
          onChange={(e) => setNewItemBody(e.target.value)}
          margin='normal'
          fullWidth
        />
        <Button
          variant='contained'
          color='secondary'
          onClick={handleCreate}
          sx={{ mt: 2 }}
        >
          Crear
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPage;
