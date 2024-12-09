"use client";

import { useEffect, useState } from "react";
import { getValoraciones, deleteValoraciones } from "@/services/adminService";

interface Valoracion {
  id: number;
  autor_id: number;
  evaluado_id: number;
  puntuacion: number; // Puntuación de la valoración
  comentario: string; // Comentario asociado a la valoración
  createdAt: string; // Fecha de creación
}

export default function ValoracionesTable() {
  const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);

  useEffect(() => {
    const fetchValoraciones = async () => {
      const data = await getValoraciones();
      setValoraciones(data);
    };
    fetchValoraciones();
  }, []);

  const handleDelete = async (valoracionId: number) => {
    try {
      await deleteValoraciones(valoracionId);
      setValoraciones((prevValoraciones) =>
        prevValoraciones.filter((valoracion) => valoracion.id !== valoracionId)
      );
    } catch (error) {
      console.error("Error eliminando valoración:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Valoraciones</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Autor ID</th>
            <th className="px-4 py-2 border-b">Evaluado ID</th>
            <th className="px-4 py-2 border-b">Puntuación</th>
            <th className="px-4 py-2 border-b">Comentario</th>
            <th className="px-4 py-2 border-b">Fecha de creación</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {valoraciones.map((valoracion) => (
            <tr key={valoracion.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{valoracion.id}</td>
              <td className="px-4 py-2 border-b text-center">{valoracion.autor_id}</td>
              <td className="px-4 py-2 border-b text-center">{valoracion.evaluado_id}</td>
              <td className="px-4 py-2 border-b text-center">{valoracion.puntuacion}</td>
              <td className="px-4 py-2 border-b">{valoracion.comentario}</td>
              <td className="px-4 py-2 border-b text-center">
                {new Date(valoracion.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(valoracion.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {valoraciones.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay valoraciones para mostrar.
        </p>
      )}
    </div>
  );
}