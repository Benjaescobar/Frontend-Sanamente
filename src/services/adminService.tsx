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

