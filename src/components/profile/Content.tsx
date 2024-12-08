// components/ProfessionalCard.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  createReview,
  getSessionsByPacientIdAndPsychologistId,
} from "@/services/apiService";
import dayjs from "dayjs";
import ReviewModal from "@/components/profile/ReviewModal";

interface ContentProps {
  nombre: string;
  descripcion: string;
  especialidades: string;
  precio_min: number;
  precio_max: number;
  experiencia: number;
  ubicacion: string;
  foto: string | null;
  id_psicologo: number;
}

function Content({
  nombre,
  descripcion,
  especialidades,
  precio_min,
  precio_max,
  experiencia,
  ubicacion,
  foto,
  id_psicologo,
}: ContentProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hasSessionsWith, setHadSessionsWith] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      const myId = Number(localStorage.getItem("id"));
      const sessions = await getSessionsByPacientIdAndPsychologistId(
        myId,
        id_psicologo
      );
      const filteredSessions = sessions.filter((sesion: any) =>
        dayjs(sesion.estado).isBefore(dayjs(new Date()))
      );
      setHadSessionsWith(filteredSessions.length > 0);
    };
    fetchSessions();
  }, [id_psicologo]);

  const handleReviewSubmit = async (rating: number, comment: string) => {
    const myId = localStorage.getItem("id");
    await createReview(myId, id_psicologo, rating, comment);
    setIsReviewModalOpen(false);
    setRating(0);
    setComment("");
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
            {hasSessionsWith && (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="text-gray-400 hover:text-gray-500 text-l items-center flex justify-between"
              >
                <FontAwesomeIcon icon={faStar} /> Deja tu valoración!
              </button>
            )}
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
              <p className="font-bold text-sm text-gray-800">
                Rango de precios💰
              </p>
              <span className="font-normal text-gray-800">
                ${precio_min} a ${precio_max}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-sm text-gray-800">Ubicación📍</p>
              <span className="font-normal text-gray-800">{ubicacion}</span>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">Experiencia🧠</p>
              <span className="font-normal text-gray-800">
                {experiencia} años
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Usar el componente ReviewModal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
}

export default Content;
