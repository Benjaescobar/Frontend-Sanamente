// src/services/apiService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ejemplo de función para obtener datos
export const getHelloWorld = async () => {
  try {
    const response = await api.get('/hello/show');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};