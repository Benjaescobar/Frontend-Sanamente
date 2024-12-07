import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import { faPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSessionsByPacientIdAndPsychologistId,
  getSessionsByPsychologistId,
  getTherapistById,
  getUserByEmail,
  getUserById,
  TherapistData,
} from "@/services/apiService";
import Content from "./Content";
import ReviewCard from "./Review";
import ProfessionalBlogPost from "../feed/ProfessionalBlogPost";
import dayjs from "dayjs";
import Link from "../../../node_modules/next/link";

const PsychologistProfile: React.FC = () => {
  const [therapistData, setTherapistData] = useState<TherapistData | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const [userData, setUserData] = useState<{
    nombre: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("id") ? localStorage.getItem("id") : null;
    setUserId(id);
  }, []);

  useEffect(() => {
    const fetchTherapist = async () => {
      if (typeof userId !== "string") {
        return;
      }

      try {
        const data = await getTherapistById(userId);
        setTherapistData(data);
      } catch (error) {
        console.error("Error fetching Therapist:", error);
      }
    };

    fetchTherapist();
  }, [userId]);

  useEffect(() => {
    if (selectedSession) {
      console.log("Selected Session:", selectedSession);
      const fetchUserData = async () => {
        try {
          const user = await getUserById(selectedSession.paciente_id);
          console.log("User Data:", user);
          setUserData({ nombre: user.nombre, email: user.email });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      };

      fetchUserData();
    }
  }, [selectedSession]);

  useEffect(() => {
    const fetchSessions = async () => {
      const myId = Number(localStorage.getItem("id"));
      if (!myId || !userId) return;

      try {
        const data = await getSessionsByPsychologistId(myId);
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setSessions([]);
      }
    };

    fetchSessions();
  }, [userId]);

  useEffect(() => {
    if (selectedSession) {
      getUserById(selectedSession.paciente_id);
    }
  }, [selectedSession]);

  if (!therapistData) {
    return null;
  }

  const { therapist, valoraciones_recibidas, publicaciones } = therapistData;
  const fullTherapist = {
    ...therapist,
    id_psicologo: Number(userId),
  };

  const upcomingSessions = sessions.filter((session) =>
    dayjs(session.estado).isAfter(dayjs())
  );

  const openModal = (session: any) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <div>
      <NavBar />
      <div className="flex pt-10 px-4 space-x-4">
        {/* Columna Izquierda: Contenido Principal */}
        <div className="flex-1">
          <Content {...fullTherapist} />
          <h1 className="text-xl font-bold mb-4 ml-10 mt-5">Mis Reseñas</h1>
          <div className="flex gap-2 mt-4 ml-10">
            <div className="min-w-3/4">
              {valoraciones_recibidas.length === 0 && (
                <p className="text-gray-500 ml-10">Aún no tienes reseñas.</p>
              )}
            </div>
            {valoraciones_recibidas.slice(0, 3).map((review, key) => (
              <ReviewCard key={key} reviewData={review} />
            ))}
            {valoraciones_recibidas.length > 3 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <FontAwesomeIcon icon={faPlus} className="text-lg" />
              </button>
            )}
          </div>
          <h1 className="text-xl font-bold mb-4 ml-10 mt-5">
            Mis publicaciones
          </h1>
          <div className="min-w-3/4">
            {publicaciones.length === 0 && (
              <p className="text-gray-500 ml-10">
                Aún no has publicado. Haz tu primera publicación{" "}
                <a className="text-blue-500 hover:underline" href="/feed">
                  aquí.
                </a>
              </p>
            )}
            {publicaciones.map((post, index) => (
              <ProfessionalBlogPost
                content=""
                timeSincePost=""
                key={index}
                color={index % 2 === 0 ? "bg-celeste" : "bg-amarillo"}
                {...post}
              />
            ))}
          </div>
        </div>

        {/* Columna Derecha: Próximas Sesiones */}
        {/* Columna Derecha: Próximas Sesiones */}
        <div className="w-1/3 mr-36 bg-celeste p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Próximas sesiones</h2>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => openModal(session)}
                  className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-300 hover:cursor-pointer"
                >
                  {dayjs(session.estado).format("D [de] MMMM, HH:mm")}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No tienes próximas sesiones programadas.
            </p>
          )}

          {/* Sesiones Pasadas */}
          <h2 className="text-xl font-bold mb-4 mt-8">Sesiones pasadas</h2>
          {sessions.filter((session) => dayjs(session.estado).isBefore(dayjs()))
            .length > 0 ? (
            <div className="space-y-4">
              {sessions
                .filter((session) => dayjs(session.estado).isBefore(dayjs()))
                .map((session) => (
                  <div
                    key={session.id}
                    onClick={() => openModal(session)}
                    className="bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer"
                  >
                    {dayjs(session.estado).format("D [de] MMMM, HH:mm")}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No tienes sesiones pasadas registradas.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Detalles de la Sesión</h2>
            <p>
              <strong>📅 Fecha:</strong>{" "}
              {dayjs(selectedSession.estado).format("D [de] MMMM, YYYY")}
            </p>
            <p>
              <strong>⏰ Hora:</strong>{" "}
              {dayjs(selectedSession.estado).format("HH:mm")}
            </p>
            {userData ? (
              <>
                <p>
                  <strong>👤 Paciente:</strong> {userData.nombre}
                </p>
                <p>
                  <strong>📬 Email:</strong> {userData.email}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Cargando datos del paciente...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistProfile;
