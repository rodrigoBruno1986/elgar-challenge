import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import { getData } from '../services/api';
import { useAuth } from '../context/AuthContext';
import styles from './styles/UserPage.module.css';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';

const ITEMS_PER_PAGE = 3;

const UserPage = () => {
  const [apiData, setApiData] = useState<any[]>([]);
  const [filteredApiData, setFilteredApiData] = useState<any[]>([]);
  const [localData, setLocalData] = useState<any[]>([]);
  const [filteredLocalData, setFilteredLocalData] = useState<any[]>([]);
  const { username } = useAuth();
  const [currentPageApi, setCurrentPageApi] = useState(1);
  const [currentPageLocal, setCurrentPageLocal] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getData();
        setApiData(apiData);
        setFilteredApiData(apiData);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    const fetchLocalData = () => {
      const storedData = localStorage.getItem('adminData');
      const localData = storedData ? JSON.parse(storedData) : [];
      setLocalData(localData);
      setFilteredLocalData(localData);
    };

    fetchData();
    fetchLocalData();
  }, []);

  const totalPagesApi = Math.ceil(filteredApiData.length / ITEMS_PER_PAGE);
  const startIndexApi = (currentPageApi - 1) * ITEMS_PER_PAGE;
  const paginatedApiData = filteredApiData.slice(
    startIndexApi,
    startIndexApi + ITEMS_PER_PAGE
  );

  const totalPagesLocal = Math.ceil(filteredLocalData.length / ITEMS_PER_PAGE);
  const startIndexLocal = (currentPageLocal - 1) * ITEMS_PER_PAGE;
  const paginatedLocalData = filteredLocalData.slice(
    startIndexLocal,
    startIndexLocal + ITEMS_PER_PAGE
  );

  const handleSearchApi = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredApi = apiData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.body.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredApiData(filteredApi);
  };

  const handleSearchLocal = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredLocal = localData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.body.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredLocalData(filteredLocal);
  };

  return (
    <Box className={styles.container}>
      <Typography variant='h5' gutterBottom className={styles.header}>
        {`Bienvenido, ${username || 'Usuario'}`}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>
            Datos de la API:
          </Typography>

          <SearchBar
            onSearch={handleSearchApi}
            placeholder='Buscar en la API'
          />

          {paginatedApiData.length > 0 ? (
            <List>
              {paginatedApiData.map((item) => (
                <ListItem key={item.id} className={styles.listItem}>
                  <ListItemText
                    primary={
                      <Typography variant='h6' className={styles.listItemTitle}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant='body2'
                        className={styles.listItemBody}
                      >
                        {item.body}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No hay datos disponibles.</Typography>
          )}

          {totalPagesApi > 1 && (
            <Paginator
              currentPage={currentPageApi}
              totalPages={totalPagesApi}
              onPageChange={setCurrentPageApi}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>
            Datos agregados por el administrador:
          </Typography>

          <SearchBar
            onSearch={handleSearchLocal}
            placeholder='Buscar en datos'
          />

          {paginatedLocalData.length > 0 ? (
            <>
              <List>
                {paginatedLocalData.map((item) => (
                  <ListItem key={item.id} className={styles.listItem}>
                    <ListItemText
                      primary={
                        <Typography
                          variant='h6'
                          className={styles.listItemTitle}
                        >
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant='body2'
                          className={styles.listItemBody}
                        >
                          {item.body}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {localData.length > 4 && (
                <Paginator
                  currentPage={currentPageLocal}
                  totalPages={totalPagesLocal}
                  onPageChange={setCurrentPageLocal}
                />
              )}
            </>
          ) : (
            <Typography>
              No hay datos creados por el administrador. Por favor, ingresa al
              panel de administración con el rol de administrador para agregar
              datos.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPage;
