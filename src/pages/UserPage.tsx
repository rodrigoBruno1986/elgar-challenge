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
import { DataItem } from '../types/data';
import styles from './styles/UserPage.module.css';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';
import Preloader from '../components/Preloader';

const ITEMS_PER_PAGE = 2;

const UserPage = () => {
  const [apiData, setApiData] = useState<DataItem[]>([]);
  const [filteredApiData, setFilteredApiData] = useState<DataItem[]>([]);
  const [localData, setLocalData] = useState<DataItem[]>([]);
  const [filteredLocalData, setFilteredLocalData] = useState<DataItem[]>([]);
  const { username } = useAuth();
  const [currentPageApi, setCurrentPageApi] = useState(1);
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [loading, setLoading] = useState(true);

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

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    fetchData();
    fetchLocalData();

    return () => clearTimeout(timeoutId);
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

  if (loading) {
    return <Preloader />;
  }

  return (
    <Box className={styles.container}>
      <Typography variant='h5' gutterBottom className={styles.header}>
        {`Bienvenido, ${username || 'Usuario'}`}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} mt={5}>
          <Typography variant='h6' gutterBottom>
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

        <Grid item xs={12} md={6} mt={5}>
          <Typography variant='h6' gutterBottom>
            Datos agregados por el administrador:
          </Typography>

          {localData.length > 0 && (
            <SearchBar
              onSearch={handleSearchLocal}
              placeholder='Buscar en datos'
            />
          )}

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

              {localData.length > 2 && (
                <Paginator
                  currentPage={currentPageLocal}
                  totalPages={totalPagesLocal}
                  onPageChange={setCurrentPageLocal}
                />
              )}
            </>
          ) : (
            <Typography fontSize={12} color='grey' mt={10} textAlign='center'>
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
