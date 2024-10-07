import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import styles from './styles/AdminPage.module.css';

const AdminPage = () => {
  const [localData, setLocalData] = useState<any[]>([]);
  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemBody, setNewItemBody] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('adminData');
    const localData = storedData ? JSON.parse(storedData) : [];
    setLocalData(localData);
  }, []);

  const saveDataToLocalStorage = (updatedData: any[]) => {
    localStorage.setItem('adminData', JSON.stringify(updatedData));
  };

  const handleOpenModal = (id: number, title: string, body: string) => {
    setEditedItemId(id);
    setNewTitle(title);
    setNewBody(body);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSaveEdit = () => {
    const updatedData = localData.map((item) =>
      item.id === editedItemId
        ? { ...item, title: newTitle, body: newBody }
        : item
    );
    setLocalData(updatedData);
    saveDataToLocalStorage(updatedData);
    handleCloseModal();
  };

  const handleCreate = () => {
    const newItem = {
      id: localData.length + 1,
      title: newItemTitle,
      body: newItemBody,
    };
    const updatedData = [...localData, newItem];
    setLocalData(updatedData);
    saveDataToLocalStorage(updatedData);
    setNewItemTitle('');
    setNewItemBody('');
  };

  const handleDelete = (id: number) => {
    const updatedData = localData.filter((item) => item.id !== id);
    setLocalData(updatedData);
    saveDataToLocalStorage(updatedData);
  };

  return (
    <Box className={styles.container}>
      <Typography variant='h4' gutterBottom className={styles.header}>
        Panel de Administrador
      </Typography>
      <Typography variant='body1' className={styles.subheader}>
        Aquí puedes crear, editar y eliminar datos:
      </Typography>

      <List>
        {localData.map((item) => (
          <Card key={item.id} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <Typography variant='h6' className={styles.cardTitle}>
                {item.title}
              </Typography>
              <Typography variant='body2' className={styles.cardText}>
                {item.body}
              </Typography>
              <Box display='flex' gap={2}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() =>
                    handleOpenModal(item.id, item.title, item.body)
                  }
                >
                  Editar
                </Button>
                <Button
                  variant='contained'
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </List>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Editar Item</DialogTitle>
        <DialogContent>
          <TextField
            label='Título'
            variant='outlined'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contenido'
            variant='outlined'
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='secondary'>
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color='primary'>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt={4}>
        <Typography variant='h6'>Crear un nuevo dato:</Typography>
        <TextField
          label='Título'
          variant='outlined'
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          margin='normal'
          fullWidth
          className={styles.textField}
        />
        <TextField
          label='Body'
          variant='outlined'
          value={newItemBody}
          onChange={(e) => setNewItemBody(e.target.value)}
          margin='normal'
          fullWidth
          className={styles.textField}
        />
        <Button
          variant='contained'
          color='secondary'
          onClick={handleCreate}
          className={styles.createButton}
        >
          Crear
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPage;
