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