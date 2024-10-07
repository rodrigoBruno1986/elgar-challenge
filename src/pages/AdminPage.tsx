import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Divider,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import dataSchema from '../validation/dataSchema';
import useToast from '../hooks/useToast';
import styles from './styles/AdminPage.module.css';

const AdminPage = () => {
  const [localData, setLocalData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const { showSuccess } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('adminData');
    const localData = storedData ? JSON.parse(storedData) : [];
    setLocalData(localData);
  }, []);

  const saveDataToLocalStorage = (updatedData: any[]) => {
    localStorage.setItem('adminData', JSON.stringify(updatedData));
  };

  const formikEdit = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema: dataSchema,
    onSubmit: (values) => {
      const updatedData = localData.map((item) =>
        item.id === editedItemId ? { ...item, ...values } : item
      );
      setLocalData(updatedData);
      saveDataToLocalStorage(updatedData);
      handleCloseModal();
      showSuccess('Dato actualizado correctamente');
    },
  });

  const formikCreate = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema: dataSchema,
    onSubmit: (values) => {
      const newItem = {
        id: localData.length + 1,
        ...values,
      };
      const updatedData = [newItem, ...localData];
      setLocalData(updatedData);
      saveDataToLocalStorage(updatedData);
      setDrawerOpen(false);
      formikCreate.resetForm();
      showSuccess('Dato creado exitosamente');
    },
  });

  const handleOpenModal = (id: number, title: string, body: string) => {
    setEditedItemId(id);
    formikEdit.setValues({ title, body });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    formikEdit.resetForm();
  };

  const handleOpenDeleteDialog = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDelete = () => {
    const updatedData = localData.filter((item) => item.id !== itemToDelete);
    setLocalData(updatedData);
    saveDataToLocalStorage(updatedData);
    handleCloseDeleteDialog();
    showSuccess('Dato eliminado correctamente');
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <Box className={styles.container}>
      <Typography variant='h5' gutterBottom className={styles.header}>
        Panel de Administrador
      </Typography>
      <Box className={styles.contentButton}>
        <Typography variant='body1' className={styles.subheader}>
          Aquí puedes crear, editar y eliminar datos:
        </Typography>

        <Button
          variant='contained'
          color='secondary'
          className={styles.createButton}
          onClick={() => toggleDrawer(true)}
        >
          Crear dato
        </Button>
      </Box>

      <List>
        {localData.map((item) => (
          <Card key={item.id} className={styles.card}>
            <CardContent className={styles.cardContent}>
              <Typography variant='h6' className={styles.cardTitle}>
                {item.title}
              </Typography>
              <Typography variant='body2' className={styles.cardText} mt={1}>
                {item.body}
              </Typography>
              <Box display='flex' gap={2} mt={3}>
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
                  onClick={() => handleOpenDeleteDialog(item.id)}
                >
                  Borrar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </List>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Editar Dato</DialogTitle>
        <DialogContent>
          <form onSubmit={formikEdit.handleSubmit}>
            <TextField
              label='Título'
              variant='outlined'
              fullWidth
              margin='normal'
              name='title'
              value={formikEdit.values.title}
              onChange={formikEdit.handleChange}
              error={!!formikEdit.errors.title}
              helperText={formikEdit.errors.title}
            />
            <TextField
              label='Contenido'
              variant='outlined'
              fullWidth
              margin='normal'
              name='body'
              value={formikEdit.values.body}
              onChange={formikEdit.handleChange}
              error={!!formikEdit.errors.body}
              helperText={formikEdit.errors.body}
            />
            <DialogActions>
              <Button onClick={handleCloseModal} color='secondary'>
                Cancelar
              </Button>
              <Button type='submit' color='primary'>
                Guardar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar este dato?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='secondary'>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color='primary'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box className={styles.drawer}>
          <Typography variant='h6' gutterBottom>
            Crear nuevo dato
          </Typography>
          <form onSubmit={formikCreate.handleSubmit}>
            <TextField
              label='Título'
              variant='outlined'
              fullWidth
              margin='normal'
              name='title'
              value={formikCreate.values.title}
              onChange={formikCreate.handleChange}
              error={!!formikCreate.errors.title}
              helperText={formikCreate.errors.title}
            />
            <TextField
              label='Contenido'
              variant='outlined'
              fullWidth
              margin='normal'
              name='body'
              value={formikCreate.values.body}
              onChange={formikCreate.handleChange}
              error={!!formikCreate.errors.body}
              helperText={formikCreate.errors.body}
            />
            <Divider sx={{ my: 2 }} />
            <Button variant='contained' color='primary' type='submit' fullWidth>
              Crear
            </Button>
          </form>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdminPage;
