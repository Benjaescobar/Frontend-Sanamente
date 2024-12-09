"use client";

import UserTable from "@/components/Admin/UserTable"; // Tabla de usuarios
import CommentsTable from "./CommentsTable";
// Importa otras tablas aquí según sea necesario, por ejemplo:
// import PsicologosTable from "@/components/Admin/PsicologosTable";
// import OrdersTable from "@/components/Admin/OrdersTable";

interface EntityTableProps {
  entityName: string; // Nombre de la entidad seleccionada
}

export default function EntityTable({ entityName }: EntityTableProps) {
  return (
    <div className="overflow-x-auto">
      {entityName === "users" && <UserTable />}
      {entityName === "psicologos" && <p>Tabla de Psicólogos (Por implementar)</p>}
      {entityName === "orders" && <p>Tabla de Órdenes (Por implementar)</p>}
      {entityName === "comentarios" && <CommentsTable />}
      {entityName === "publicaciones" && <p>Tabla de Publicaciones (Por implementar)</p>}
      {entityName === "sesiones" && <p>Tabla de Sesiones (Por implementar)</p>}
      {entityName === "reportes" && <p>Tabla de Reportes (Por implementar)</p>}
      {entityName === "valoraciones" && <p>Tabla de Valoraciones (Por implementar)</p>}
      {![
        "users",
        "psicologos",
        "orders",
        "comentarios",
        "publicaciones",
        "sesiones",
        "reportes",
        "valoraciones",
      ].includes(entityName) && (
        <p className="text-gray-500">Entidad no reconocida.</p>
      )}
    </div>
  );
}
