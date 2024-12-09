"use client";

import UserTable from "@/components/Admin/UserTable"; // Tabla de usuarios
import PsicologosTable from "./PsicologoTable";
import SesionesTable from "./SessionsTable";
import PublicacionesTable from "./PostsTable";
import ValoracionesTable from "./ReviewsTable";
import ReportesTable from "./ReportesTable";
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

      {entityName === "psicologos" && <PsicologosTable></PsicologosTable>}
      {entityName === "comentarios" && <CommentsTable></CommentsTable>}
      {entityName === "publicaciones" && <PublicacionesTable></PublicacionesTable> }
      {entityName === "sesiones" && <SesionesTable></SesionesTable> }
      {entityName === "reportes" && <ReportesTable></ReportesTable>}
      {entityName === "valoraciones" && <ValoracionesTable></ValoracionesTable> }

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
