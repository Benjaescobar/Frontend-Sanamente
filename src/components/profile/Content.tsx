import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { getSessionsByPacientIdAndPsychologistId } from "@/services/apiService";
import dayjs from "dayjs";

interface ContentProps {
  nombre: string;
  descripcion: string;
  especialidades: string;
  precio_min: number;
  experiencia: number;
  foto: string | null;
  id_psicologo: number;
}

function Content({
  nombre,
  descripcion,
  especialidades,
  precio_min,
  experiencia,
  foto,
  id_psicologo,
}: ContentProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [hasSessionsWith, setHadSessionsWith] = useState(false);
  const [reportReason, setReportReason] = useState<string>("");

  useEffect(() => {
    const fetchSessions = async () => {
      const myId = Number(localStorage.getItem("id"));
      const sessions = await getSessionsByPacientIdAndPsychologistId(myId, id_psicologo);
      const filteredSessions = sessions.filter((sesion: any) =>
        dayjs(sesion.estado).isBefore(dayjs(new Date()))
      );
      setHadSessionsWith(filteredSessions.length > 0);
    };
    fetchSessions();
  }, [id_psicologo]);

  const handleReportSubmit = () => {
    console.log(`Report submitted for psychologist ${id_psicologo} with reason: ${reportReason}`);
    setIsReportModalOpen(false);
    setReportReason("");
    // Aquí puedes agregar la lógica para enviar el reporte a la API.
  };

  return (
    <div className="mb-4 w-full max-w-4xl ml-10">
      <div className="flex">
        <Image
          src={foto || "/images/sergio.png"}
          alt={nombre}
          width={170}
          height={120}
          className="rounded-lg mr-6 object-cover"
        />
        <div>
          <div className="justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-gray-400 hover:text-gray-500 text-l items-center flex justify-between"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="ml-1">Reportar</span>
            </button>
          </div>
          <p className="text-gray-600 mt-2">{descripcion}</p>
          <div className="flex flex-wrap mt-4">
            {especialidades.split(", ").map((specialty) => (
              <span
                key={specialty}
                className="text-xs border border-red-500 rounded-xl mx-1 my-1 p-1 py-1 text-red-500 inline-flex"
              >
                {specialty
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="font-bold text-sm text-gray-800">Precio</p>
              <span className="font-normal text-gray-800">${precio_min}</span>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">Años de experiencia</p>
              <span className="font-normal text-gray-800">{experiencia}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Reportar */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Reportar psicólogo</h3>
            <p className="mb-4">Selecciona un motivo para reportar:</p>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            >
              <option value="" disabled>
                Seleccionar motivo...
              </option>
              <option value="Comportamiento inapropiado">Comportamiento inapropiado</option>
              <option value="Información falsa">Información falsa</option>
              <option value="Problemas con la sesión">Problemas con la sesión</option>
              <option value="Otro">Otro</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="mr-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={!reportReason}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:bg-red-300"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
