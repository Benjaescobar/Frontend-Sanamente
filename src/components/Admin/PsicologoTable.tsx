"use client";

import { useEffect, useState } from "react";
import { getPsicologos } from "@/services/adminService";

interface Psicologo {
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
    email: string;
    foto: string | null;
  };
}

export default function PsicologosTable() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);

  useEffect(() => {
    const fetchPsicologos = async () => {
      const data = await getPsicologos();
      setPsicologos(data);
    };
    fetchPsicologos();
  }, []);

  const handleDelete = (psicologoId: number) => {
    setPsicologos((prevPsicologos) =>
      prevPsicologos.filter((psicologo) => psicologo.id !== psicologoId)
    );
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Psicólogos</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Especialidades</th>
            <th className="px-4 py-2 border-b">Experiencia</th>
            <th className="px-4 py-2 border-b">Precio</th>
            <th className="px-4 py-2 border-b">Ubicación</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {psicologos.map((psicologo) => (
            <tr key={psicologo.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{psicologo.id}</td>
              <td className="px-4 py-2 border-b flex items-center space-x-2">
                {psicologo.usuario.foto && (
                  <img
                    src={psicologo.usuario.foto}
                    alt={psicologo.usuario.nombre}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{psicologo.usuario.nombre}</span>
              </td>
              <td className="px-4 py-2 border-b">{psicologo.usuario.email}</td>
              <td className="px-4 py-2 border-b">{psicologo.especialidades}</td>
              <td className="px-4 py-2 border-b text-center">
                {psicologo.experiencia} años
              </td>
              <td className="px-4 py-2 border-b text-center">
                ${psicologo.precio_min} - ${psicologo.precio_max}
              </td>
              <td className="px-4 py-2 border-b">{psicologo.ubicacion}</td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(psicologo.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {psicologos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay psicólogos para mostrar.
        </p>
      )}
    </div>
  );
}
