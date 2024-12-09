import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-sanamente-d7ej.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
    try {
      const response = await api.get(`/usuarios/`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error updating user photo:", error);
      throw error;
    }
  };

  export const deleteUsers = async (usuario_id: number) => {
    const admin_id = localStorage.getItem('id');
    try {
      const response = await api.delete(`/usuarios/${usuario_id}/${admin_id}`);
      console.log("Usuario eliminado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      throw error;
    }
  };

export const getPsicologos = async () => {
    try {
      const response = await api.get(`/psicologos/`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error updating user photo:", error);
      throw error;
    }
  };

  export const getSesiones = async () => {
    try {
      const response = await api.get(`/sesiones/`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error updating user photo:", error);
      throw error;
    }
  };

  export const deleteSesion = async (id_sesion: number) => {
    const admin_id = localStorage.getItem('id');
    try {
        const response = await api.delete(`/sesiones/${id_sesion}/${admin_id}`);
        console.log(response);
    } catch (error) {
        console.log("Error al borrar una sesión", error)
    }
  };

  export const getPosts = async () => {
    try {
      const response = await api.get("/publicaciones");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo publicaciones:", error);
      throw error;
    }
  };

  export const deletePost = async (publicacion_id: number) => {
    const admin_id = localStorage.getItem('id');
    try {
      const response = await api.delete(`/publicaciones/${publicacion_id}/${admin_id}`);
      console.log("Publicación eliminada", response.data);
      return response.data;
    } catch (error) {
      console.error("Error eliminando publicación:", error);
      throw error;
    }
  };

  export const getAllReportes = async () => {
    // const admin_id = localStorage.getItem('id');
    const admin_id = 16;
    try {
      const response = await api.get(`/reportes/todos/${admin_id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error updating user photo:", error);
      throw error;
    }
  };

  export const deleteReporte = async (id_reporte: number) => {
    // const admin_id = localStorage.getItem('id');
    const admin_id = 16;
    try {
        console.log(`/reportes/resolver/${id_reporte}/${admin_id}`);
        const response = await api.delete(`/reportes/resolver/${String(id_reporte)}/${String(admin_id)}`);
        console.log(response);
        return response.data;
    } catch (error) {
      console.error("Error deleting report", error);
      throw error;
    }
  };

  export const getValoraciones = async () => {
    try {
      const response = await api.get(`/valoraciones/`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error updating user photo:", error);
      throw error;
    }
  };

  export const deleteValoraciones = async (valoracion_id: number) => {
    const admin_id = localStorage.getItem('id');
    try {
      const response = await api.delete(`/sesiones/${valoracion_id}/${admin_id}`);
      console.log("Valoración eliminada", response.data);
      return response.data;
    } catch (error) {
      console.error("Error eliminando valoración:", error);
      throw error;
    }
  };