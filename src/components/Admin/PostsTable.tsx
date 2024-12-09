"use client";

import { useEffect, useState } from "react";
import { getPosts, deletePost } from "@/services/adminService";

interface Publicacion {
  id: number;
  autor_id: number;
  contenido: string;
  createdAt: string;
  autor: {
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
    usuario: {
      nombre: string;
      foto: string | null;
    };
  };
}

export default function PublicacionesTable() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      const data = await getPosts();
      setPublicaciones(data);
    };
    fetchPublicaciones();
  }, []);

  const handleDelete = async (publicacionId: number) => {
    try {
      await deletePost(publicacionId);
      setPublicaciones((prevPublicaciones) =>
        prevPublicaciones.filter((publicacion) => publicacion.id !== publicacionId)
      );
    } catch (error) {
      console.error("Error eliminando publicación:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Publicaciones</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Autor</th>
            <th className="px-4 py-2 border-b">Contenido</th>
            <th className="px-4 py-2 border-b">Fecha de creación</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {publicaciones.map((publicacion) => (
            <tr key={publicacion.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{publicacion.id}</td>
              <td className="px-4 py-2 border-b flex items-center space-x-2">
                {publicacion.autor.usuario.foto && (
                  <img
                    src={publicacion.autor.usuario.foto}
                    alt={publicacion.autor.usuario.nombre}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{publicacion.autor.usuario.nombre}</span>
              </td>
              <td className="px-4 py-2 border-b">{publicacion.contenido}</td>
              <td className="px-4 py-2 border-b text-center">
                {new Date(publicacion.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(publicacion.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {publicaciones.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay publicaciones para mostrar.
        </p>
      )}
    </div>
  );
}