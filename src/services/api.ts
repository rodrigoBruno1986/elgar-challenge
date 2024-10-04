import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export const updateData = async (id: number, newTitle: string) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, {
      title: newTitle,
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    throw error;
  }
};
