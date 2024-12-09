"use client";

import { useState } from "react";
import EntityTable from "@/components/Admin/EntityTable"; // Componente genérico para tablas

export default function AdminDashboard() {
  const [selectedEntity, setSelectedEntity] = useState<string>("users"); // Entidad seleccionada

  // Opciones de entidades
  const entities = [
    { id: "users", name: "Usuarios" },
    { id: "psicologos", name: "Psicólogos" },
    { id: "comentarios", name: "Comentarios" },
    { id: "publicaciones", name: "Publicaciones" },
    { id: "sesiones", name: "Sesiones" },
    { id: "reportes", name: "Reportes" },
    { id: "valoraciones", name: "Valoraciones" },
  ];

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <aside className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
        <ul>
          {entities.map((entity) => (
            <li key={entity.id} className="mb-2">
              <button
                onClick={() => setSelectedEntity(entity.id)}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedEntity === entity.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {entity.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="w-3/4 p-6">
        <EntityTable entityName={selectedEntity} />
      </main>
    </div>
  );
}
