export interface Professional {
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

export interface BlogPost {
  contenido: string;
  createdAt: string;
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

export interface TherapistData {
  therapist: Therapist;
  valoraciones_recibidas: Review[];
  publicaciones: BlogPost[];
}

export interface ProfessionalBlogPostProps {
  contenido: string;
  createdAt: string;
  nombre: string;
  imageUrl: string;
  color?: string;
}