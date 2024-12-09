"use client";

import { useEffect, useState } from "react";
import { getSesiones, deleteSesion } from "@/services/adminService";

interface Sesion {
  id: number;
  paciente_id: number;
  psicologo_id: number;
  estado: string; // fecha y hora
  tipo: string; // "presencial" o "online"
  createdAt: string;
}

export default function SesionesTable() {
  const [sesiones, setSesiones] = useState<Sesion[]>([]);

  useEffect(() => {
    const fetchSesiones = async () => {
      const data = await getSesiones();
      setSesiones(data);
    };
    fetchSesiones();
  }, []);

  const handleDelete = async (idSesion: number) => {
    try {
      await deleteSesion(idSesion);
      setSesiones((prevSesiones) =>
        prevSesiones.filter((sesion) => sesion.id !== idSesion)
      );
    } catch (error) {
      console.error("Error eliminando sesión:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Sesiones</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Paciente ID</th>
            <th className="px-4 py-2 border-b">Psicólogo ID</th>
            <th className="px-4 py-2 border-b">Estado</th>
            <th className="px-4 py-2 border-b">Tipo</th>
            <th className="px-4 py-2 border-b">Creado</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sesiones.map((sesion) => (
            <tr key={sesion.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{sesion.id}</td>
              <td className="px-4 py-2 border-b text-center">{sesion.paciente_id}</td>
              <td className="px-4 py-2 border-b text-center">{sesion.psicologo_id}</td>
              <td className="px-4 py-2 border-b text-center">
                {new Date(sesion.estado).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b text-center">{sesion.tipo}</td>
              <td className="px-4 py-2 border-b text-center">
                {new Date(sesion.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(sesion.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sesiones.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay sesiones para mostrar.
        </p>
      )}
    </div>
  );
}