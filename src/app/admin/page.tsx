"use client";

import { useEffect, useState } from "react";
import EntityTable from "@/components/Admin/EntityTable"; // Componente genérico para tablas

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Estado para verificar si el usuario es admin
  const [selectedEntity, setSelectedEntity] = useState<string>("users"); // Entidad seleccionada

  // Verificar el rol del usuario en `localStorage`
  useEffect(() => {
    const userType = localStorage.getItem("tipo"); // Supone que `tipo` está almacenado en localStorage
    setIsAdmin(userType === "admin");
  }, []);

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

  if (isAdmin === null) {
    // Mostrar una pantalla de carga mientras se verifica el rol del usuario
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Verificando permisos...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // Mostrar mensaje de acceso denegado si el usuario no es admin
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-bold">
          Acceso denegado: No tienes permisos de administrador.
        </p>
      </div>
    );
  }

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
