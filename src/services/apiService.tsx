// src/services/apiService.ts
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://backend-sanamente-d7ej.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getAllTherapist = async () => {
  try {
    const response = await api.get(`/psicologos`);

    console.log(response);
    
    return response.data.map((item: any) => ({
      ...item,
      id: item.usuario_id,
      nombre: item.usuario.nombre,
      email: item.usuario.email,
      foto: item.usuario.foto,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getPosts = async () => {
  const response = await api.get(`publicaciones/`);
  return response.data.map((post: any) => ({
    contenido: post.contenido,
    createdAt: post.createdAt,
    nombre: post.autor.usuario.nombre,
    imageUrl: post.autor.usuario.foto || "/images/default-profile.png", // Valor por defecto si no hay foto
  }));
};

export const getTherapistById = async (id: string) => {
  try {
    const response = await api.get(`/psicologos/${id}`);
    const item = response.data;

    return {
      therapist: {
        id: item.id,
        usuario_id: item.usuario_id,
        url_calendly: item.url_calendly,
        especialidades: item.especialidades,
        experiencia: item.experiencia ? `${item.experiencia} años` : "N/A",
        descripcion: item.descripcion,
        ubicacion: item.ubicacion,
        precio_min: item.precio_min,
        precio_max: item.precio_max,
        createdAt: item.createdAt,
        nombre: item.usuario.nombre,
        email: item.usuario.email,
        foto: item.usuario.foto || "/images/default-profile.jpg",
        modalidad: item.modalidad || "Presencial", // Valor predeterminado si falta
        metodo: item.metodo || "Orientación Psicoanalítica", // Valor predeterminado si falta
      },
      valoraciones_recibidas: item.usuario.valoraciones_recibidas.map((valoracion: any) => ({
        id: valoracion.id,
        autor_id: valoracion.autor_id,
        evaluado_id: valoracion.evaluado_id,
        puntuacion: valoracion.puntuacion,
        comentario: valoracion.comentario,
        createdAt: valoracion.createdAt,
        autor_nombre: valoracion.autor.nombre,
        autor_foto: valoracion.autor.foto,
      })),
      publicaciones: item.publicaciones.map((publicacion: any) => ({
        contenido: publicacion.contenido,
        createdAt: publicacion.createdAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
