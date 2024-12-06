import React, { useEffect, useState } from "react";
import ProfessionalCard from "./ProfessionalCard";
import { filterTherapist } from "@/services/apiService";
import { Professional } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

interface FeedProps {
  especialidad: string;
  experiencia: string;
  lugar: string;
  precio_min: string;
  precio_max: string;
}

export default function Feed({
  especialidad,
  experiencia,
  lugar,
  precio_min,
  precio_max,
}: FeedProps) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await filterTherapist(
          especialidad,
          experiencia,
          lugar,
          precio_min,
          precio_max
        );
        console.log("Filtered Data:", data);
        setProfessionals(data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchData();
  }, [especialidad, experiencia, lugar, precio_min, precio_max]);

  return (
    <div className="min-w-3/4">
      {professionals.length === 0 ? (
        <div className="text-center mt-10">
          <div className="relative inline-block">
            <FontAwesomeIcon
              icon={faFrown}
              className="text-6xl text-gray-400 mb-4 animate-eyes"
            />
          </div>
          <p className="text-lg text-gray-600">
            No se encontraron psicólogos que cumplan con los criterios seleccionados.
          </p>
          <p className="text-gray-500">
            Intenta ajustar tus filtros o intenta con otras opciones.
          </p>
        </div>
      ) : (
        professionals.map((professional) => (
          <ProfessionalCard key={professional.id} {...professional} />
        ))
      )}
    </div>
  );
}
