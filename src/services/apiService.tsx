// src/services/apiService.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-sanamente-d7ej.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const editUserPhoto = async (user_id: any, foto_url: string) => {
  try {

    const response = await api.patch(`/usuarios/${user_id}/${user_id}`, {
      "foto": foto_url,
    });

    return response.data; 
  } catch (error) {
    console.error('Error updating user photo:', error);
    throw error;
  }
};

export const getUserPhoto = async (user_id: any) => {
  try {
    const response = await api.get(`/usuarios/${user_id}`)
    return response.data.foto
    }
  catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getAllTherapist = async (): Promise<Therapist[]> => {
  try {
    const response = await api.get(`/psicologos`);
    return response.data.map(
      (item: any): Therapist => ({
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
      })
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get(`publicaciones/`);

  console.log("response", response);
  return response.data.map((post: any): Post => ({
    contenido: post.contenido,
    createdAt: post.createdAt,
    nombre: post.autor.usuario.nombre,
    imageUrl: post.autor.usuario.foto || "/images/default-profile.png",
    autorId: post.autor.usuario_id,
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
        autorId: item.usuario.id,
      })),

    };
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await api.get(`/usuarios/login/${email}`);
    const item = response.data;
    return item;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    const item = response.data;
    return item;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createPsychologist = async (data: any) => {
  try {
    console.log("data:", data);
    const response = await api.post(`psicologos/crear`, data);
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const filterTherapist = async (
  especialidad: string,
  experiencia: string,
  lugar: string,
  precio_min: string,
  precio_max: string
) => {
  try {
    const response = await api.post(`/psicologos/search/`, {
      esp: especialidad,
      exp: experiencia,
      ubic: lugar,
      precio_min: precio_min,
      precio_max: precio_max,
    });
    return response.data.map(
      (item: any): Therapist => ({
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
      })
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createSession = async (
  paciente_id: number,
  psicologo_id: number,
  fecha: string
) => {
  const payload = {
    paciente_id,
    psicologo_id,
    fecha,
  };
  console.log("Payload Create Session:", payload);
  try {
    const response = await api.post(`/sesiones/crear`, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSessionsByPacientId = async (id_paciente: any) => {
  try {
    const response = await api.get("/sesiones/");
    const sesiones = response.data;

    // Filtrar sesiones por paciente_id
    const filteredSessions = sesiones.filter(
      (sesion: any) => sesion.paciente_id === id_paciente
    );

    return filteredSessions; // Retorna solo las sesiones del paciente
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSessionsByPacientIdAndPsychologistId = async (
  id_paciente: any,
  id_psicologo: any
) => {
  try {
    const response = await api.get("/sesiones/");
    const sesiones = response.data;

    // Filtrar sesiones por paciente_id y psicologo_id
    const filteredSessions = sesiones.filter(
      (sesion: any) =>
        sesion.paciente_id === id_paciente &&
        sesion.psicologo_id === id_psicologo
    );

    return filteredSessions; // Retorna solo las sesiones que coinciden con ambos criterios
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSessionsByPsychologistId = async (id_psicologo: any) => {
  try {
    const response = await api.get("/sesiones/");
    const sesiones = response.data;

    // Filtrar sesiones por paciente_id y psicologo_id
    const filteredSessions = sesiones.filter(
      (sesion: any) => sesion.psicologo_id === id_psicologo
    );

    return filteredSessions; // Retorna solo las sesiones que coinciden con ambos criterios
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTimeSlotsUsed = async (id_psicologo: any, fecha: any) => {
  try {
    const response = await api.get(
      `/sesiones/ocupadas/${id_psicologo}/${fecha}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createReview = async (
  autor_id: any,
  evaluado_id: any,
  puntuacion: any,
  comentario: any
) => {
  try {
    const response = await api.post(`/valoraciones/crear/`, {
      autor_id,
      evaluado_id,
      puntuacion,
      comentario,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const createPost = async (autor_id: any, contenido: any) => {
  try{
    const response = await api.post(`/publicaciones/publicar/`, {
      contenido,
      autor_id
    })
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}


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
  autorId: string;
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
