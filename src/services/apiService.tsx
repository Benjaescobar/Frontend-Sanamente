// src/services/apiService.ts
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://backend-sanamente-d7ej.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getAllTherapist = async (): Promise<Therapist[]> => {
  try {
    const response = await api.get(`/psicologos`);
    return response.data.map((item: any): Therapist => ({
      id: item.usuario_id,
      usuario_id: item.usuario_id,
      url_calendly: item.url_calendly,
      especialidades: item.especialidades,
      experiencia: item.experiencia,
      descripcion: item.descripcion,
      ubicacion: item.ubicacion,
      precio_min: item.precio_min,
      precio_max: item.precio_max,
      createdAt: item.createdAt,
      nombre: item.usuario.nombre,
      email: item.usuario.email,
      foto: item.usuario.foto,
      modalidad: item.modalidad || "Presencial",
      metodo: item.metodo || "Orientación Psicoanalítica",
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get(`publicaciones/`);
  return response.data.map((post: any): Post => ({
    contenido: post.contenido,
    createdAt: post.createdAt,
    nombre: post.autor.usuario.nombre,
    imageUrl: post.autor.usuario.foto || "/images/default-profile.png",
  }));
};

export const getTherapistById = async (id: string): Promise<TherapistData> => {
  try {
    const response = await api.get(`/psicologos/${id}`);
    const item = response.data;

    return {
      therapist: {
        id: item.id,
        usuario_id: item.usuario_id,
        url_calendly: item.url_calendly,
        especialidades: item.especialidades,
        experiencia: item.experiencia,
        descripcion: item.descripcion,
        ubicacion: item.ubicacion,
        precio_min: item.precio_min,
        precio_max: item.precio_max,
        createdAt: item.createdAt,
        nombre: item.usuario.nombre,
        email: item.usuario.email,
        foto: item.usuario.foto || "/images/default-profile.jpg",
        modalidad: item.modalidad || "Presencial",
        metodo: item.metodo || "Orientación Psicoanalítica",
      },
      valoraciones_recibidas: item.usuario.valoraciones_recibidas.map((valoracion: any): Review => ({
        id: valoracion.id,
        autor_id: valoracion.autor_id,
        evaluado_id: valoracion.evaluado_id,
        puntuacion: valoracion.puntuacion,
        comentario: valoracion.comentario,
        createdAt: valoracion.createdAt,
        autor_nombre: valoracion.autor.nombre,
        autor_foto: valoracion.autor.foto,
      })),
      publicaciones: item.publicaciones.map((publicacion: any): Post => ({
        contenido: publicacion.contenido,
        createdAt: publicacion.createdAt,
        nombre: item.usuario.nombre,
        imageUrl: item.usuario.foto || "/images/default-profile.jpg",
      })),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



export interface Usuario {
  nombre: string;
  foto: string | null;
}

export interface Therapist {
  id: number;
  usuario_id: number;
  url_calendly: string;
  especialidades: string;
  experiencia: number;
  descripcion: string;
  ubicacion: string;
  precio_min: number;
  precio_max: number;
  createdAt: string;
  nombre: string;
  email: string;
  foto: string | null;
  modalidad?: string;
  metodo?: string;
}

export interface Post {
  contenido: string;
  createdAt: string;
  nombre: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  autor_id: number;
  evaluado_id: number;
  puntuacion: number;
  comentario: string;
  createdAt: string;
  autor_nombre: string;
  autor_foto: string | null;
}

export interface TherapistData {
  therapist: Therapist;
  valoraciones_recibidas: Review[];
  publicaciones: Post[];
}
