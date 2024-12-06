"use client";
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/profile/Content";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "next/navigation";
import {
  createSession,
  getTherapistById,
  getSessionsByPacientIdAndPsychologistId,
} from "@/services/apiService";
import ReviewCard from "@/components/profile/Review";
import ProfessionalBlogPost from "@/components/feed/ProfessionalBlogPost";
import { TherapistData } from "@/types/types";
import BookingModal from "@/components/profile/BookingModal";
import ReviewModal from "@/components/profile/ReviewModal";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function PsychologistProfile() {
  const params = useParams();
  const { id } = params;

  const [therapistData, setTherapistData] = useState<TherapistData | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const fetchTherapist = async () => {
      if (typeof id !== "string") {
        console.error("Invalid ID format");
        return;
      }

      try {
        const data = await getTherapistById(id);
        setTherapistData(data);
      } catch (error) {
        console.error("Error fetching Therapist:", error);
      }
    };

    fetchTherapist();
  }, [id]);

  useEffect(() => {
    const fetchSessions = async () => {
      const paciente_id = Number(localStorage.getItem("id"));
      if (!paciente_id || !id) return;

      try {
        const data = await getSessionsByPacientIdAndPsychologistId(
          paciente_id,
          Number(id)
        );
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setSessions([]);
      }
    };

    fetchSessions();
  }, [id]);

  useEffect(() => {
    // Disable scroll on body when any modal is open
    if (isReviewModalOpen || isWriteReviewModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isReviewModalOpen, isWriteReviewModalOpen]);

  const handleBookingClose = () => {
    setIsBookingOpen(false);
  };

  const handleCreateSessionSubmit = () => {
    const paciente_id = Number(localStorage.getItem("id"));
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const horafinal = dayjs(`${formattedDate} ${selectedTime}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
    if (paciente_id) {
      createSession(paciente_id, Number(id), horafinal);
    } else {
      console.log("No se pudo crear la sesión");
    }

    setIsBookingOpen(false);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    const paciente_id = localStorage.getItem("id");
    console.log("Enviar review:", { paciente_id, id, rating, comment });
    setIsWriteReviewModalOpen(false);
    setRating(0);
    setComment("");
  };

  const upcomingSessions = sessions.filter((session) =>
    dayjs(session.estado).isAfter(dayjs())
  );
  const pastSessions = sessions.filter((session) =>
    dayjs(session.estado).isBefore(dayjs())
  );

  if (!therapistData) {
    return <div>Loading...</div>;
  }

  const { therapist, valoraciones_recibidas, publicaciones } = therapistData;
  const fullTherapist = {
    ...therapist,
    id_psicologo: Number(id),
  };

  const averageRating =
    valoraciones_recibidas.reduce((acc, review) => acc + review.puntuacion, 0) /
    valoraciones_recibidas.length || 0;

  return (
    <div>
      <NavBar />
      <div className="flex pt-10 px-4 space-x-4">
        <div className="flex-1">
          <Content {...fullTherapist} />
          <div className="flex gap-2 mt-4 ml-10">
            {valoraciones_recibidas.slice(0, 3).map((review, key) => (
              <ReviewCard key={key} reviewData={review} />
            ))}
            {valoraciones_recibidas.length > 3 && (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <FontAwesomeIcon icon={faPlus} className="text-lg" />
              </button>
            )}
            {valoraciones_recibidas.length === 0 && (
              <p>Este usuario aún no tiene ninguna valoración</p>
            )}
          </div>
          <h1 className="text-xl font-bold mb-4 ml-10 mt-5">
            Publicaciones de {therapist.nombre}
          </h1>
          <div className="min-w-3/4">
            {publicaciones.map((post, index) => (
              <ProfessionalBlogPost
                content=""
                nombre={therapist.nombre}
                imageUrl="/images/foto.png"
                timeSincePost=""
                key={index}
                color={index % 2 === 0 ? "bg-celeste" : "bg-amarillo"}
                {...post}
              />
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 w-1/3">
          <div className="max-w-sm mx-auto p-4 bg-white rounded-lg">
            <button
              className="w-full flex items-center border justify-between px-4 py-3 bg-white rounded-2xl text-blue-1000 font-medium hover:bg-gray-50 transition"
              onClick={() => {
                setIsBookingOpen(true);
              }}
            >
              <span>Agendar hora</span>
            </button>

            {/* Historial de citas */}
            <div className="mt-4">
              <div
                className={`w-full px-4 py-3 bg-white border transition-all duration-300 hover:bg-gray-50 ${
                  isOpen ? "rounded-t-2xl hover:bg-white" : "rounded-2xl"
                } text-gray-700 font-medium`}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <div className="flex items-center justify-between">
                  <span>Historial de citas</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Contenido del historial */}
              <div
                className={`overflow-hidden transition-all duration-500 bg-white border border-t-0 rounded-b-2xl ${
                  isOpen ? "max-h-screen p-4" : "max-h-0 hidden"
                }`}
              >
                {isOpen && (
                  <div className="space-y-2">
                    {upcomingSessions.length === 0 && pastSessions.length === 0 ? (
                      <p>No tienes citas con este psicólogo.</p>
                    ) : (
                      <>
                        <h3>Próximas sesiones</h3>
                        {upcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-300 hover:cursor-pointer"
                          >
                            {dayjs(session.estado).format(
                              "D [de] MMMM, HH:mm"
                            )}
                          </div>
                        ))}
                        <h3>Sesiones pasadas</h3>
                        {pastSessions.map((session) => (
                          <div
                            key={session.id}
                            className="bg-blue-100 text-blue-300 p-3 rounded-lg hover:bg-blue-200 hover:cursor-pointer"
                          >
                            {dayjs(session.estado).format(
                              "D [de] MMMM, HH:mm"
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingOpen}
        psicologoId={id}
        onClose={handleBookingClose}
        onSubmit={handleCreateSessionSubmit}
        onDateSelect={(date) => setSelectedDate(date)}
        onTimeSelect={(time) => setSelectedTime(time)}
      />
      <ReviewModal
        isOpen={isWriteReviewModalOpen}
        onClose={() => setIsWriteReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
}
