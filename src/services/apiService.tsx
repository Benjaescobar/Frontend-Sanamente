// src/services/apiService.ts
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://backend-sanamente-d7ej.onrender.com',
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

export const getAllTherapist = async () => {
  try {
    const response = await api.get(`/psicologos`);

    console.log(response);
    
    return response.data.map((item: any) => ({
      ...item,
      nombre: item.usuario.nombre,
      email: item.usuario.email,
      foto: item.usuario.foto,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


