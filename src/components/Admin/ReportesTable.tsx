"use client";

import { useEffect, useState } from "react";
import { getAllReportes, deleteReporte } from "@/services/adminService";

interface Reporte {
  id: number;
  reported_id: number;
  motivo: string;
  createdAt: string;
}

export default function ReportesTable() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReportes = async () => {
      const data = await getAllReportes();
      setReportes(data);
    };
    fetchReportes();
  }, []);

  const handleDelete = async () => {
    if (selectedReporte) {
      await deleteReporte(selectedReporte.id);
      setReportes((prevReportes) =>
        prevReportes.filter((reporte) => reporte.id !== selectedReporte.id)
      );
      setShowModal(false); // Cierra el modal
      setSelectedReporte(null); // Resetea el reporte seleccionado
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Reportes</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Reported ID</th>
            <th className="px-4 py-2 border-b">Motivo</th>
            <th className="px-4 py-2 border-b">Fecha</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{reporte.id}</td>
              <td className="px-4 py-2 border-b text-center">
                {reporte.reported_id}
              </td>
              <td className="px-4 py-2 border-b">{reporte.motivo}</td>
              <td className="px-4 py-2 border-b">
                {new Date(reporte.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => {
                    setSelectedReporte(reporte);
                    setShowModal(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Resolver Reporte
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reportes.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay reportes para mostrar.
        </p>
      )}

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Resolver Reporte</h2>
            <p>¿Estás seguro de que deseas marcar este reporte como resuelto?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Resolver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
