import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSessionsByPsychologistId,
  getTherapistById,
  getUserById,
  TherapistData,
} from "@/services/apiService";
import Content from "./Content";
import ReviewCard from "./Review";
import ProfessionalBlogPost from "../feed/ProfessionalBlogPost";
import dayjs from "dayjs";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

const PsychologistProfile: React.FC = () => {
  const [therapistData, setTherapistData] = useState<TherapistData | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controla la visibilidad del modal
  const [descripcion, setDescripcion] = useState(
    "Descripción del psicólogo..."
  );
  const [especialidades, setEspecialidades] = useState<string[]>([""]);
  const [experiencia, setExperiencia] = useState("5");
  const [ubicacion, setUbicacion] = useState("Santiago, Chile");
  const specialtiesOptions = [
    "Terapia cognitivo-conductual",
    "Psicoanálisis",
    "Terapia familiar",
    "Terapia de pareja",
    "Psicología infantil",
    "Trastorno Obsesivo Compulsivo",
    "Depresión",
    "Dependencia emocional",
    "Problemas de autoestima",
  ];
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // FOTO
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const handleConfirmPhoto = (url: string) => {
    console.log(url);
    setIsPhotoModalOpen(false);
  };

  useEffect(() => {
    if (isEditModalOpen && therapistData) {
      setDescripcion(
        therapistData.therapist.descripcion || "Descripción del psicólogo..."
      );

      // Asegúrate de que `especialidades` sea un array
      const especialidadesArray = Array.isArray(
        therapistData.therapist.especialidades
      )
        ? therapistData.therapist.especialidades
        : therapistData.therapist.especialidades
            ?.split(",")
            .map((item) => item.trim()) || [""];
      setEspecialidades(especialidadesArray);

      // Convierte `experiencia` a string si es un número
      setExperiencia(
        typeof therapistData.therapist.experiencia === "number"
          ? therapistData.therapist.experiencia.toString()
          : therapistData.therapist.experiencia || "5"
      );

      setUbicacion(therapistData.therapist.ubicacion || "Santiago, Chile");

      // Establece los valores de precio mínimo y máximo
      setMinPrice(
        typeof therapistData.therapist.precio_min === "number"
          ? therapistData.therapist.precio_min.toString()
          : therapistData.therapist.precio_min || ""
      );

      setMaxPrice(
        typeof therapistData.therapist.precio_max === "number"
          ? therapistData.therapist.precio_max.toString()
          : therapistData.therapist.precio_max || ""
      );
    }
  }, [isEditModalOpen, therapistData]);

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

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

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
          <div className="flex justify-between items-start">
            <Content {...fullTherapist} />
            <div>
              <button
                onClick={openEditModal}
                className="px-4 py-2 rounded-md bg-blue-500 mb-2 text-white"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  setIsPhotoModalOpen(true);
                }}
                className="px-4 py-2 rounded-md bg-blue-500 text-white"
              >
                Cambiar foto
              </button>
            </div>
         
          </div>

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
                redirect={true}
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

      {/* Modal para cambiar foto de perfil */}
      {isPhotoModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <ProfilePhotoUpload onUploadComplete={handleConfirmPhoto} id={userId}/>
          <button onClick={() => {setIsPhotoModalOpen(false)}} >Cancelar</button>
        </div>
      </div>
      )}

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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              🧠 Editar Perfil Profesional
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={handleInputChange(setDescripcion)}
                className="block w-full rounded-md border-blue-300 placeholder-blue-300 p-2.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400">
                Especialidades
              </label>
              <select
                className="block w-full rounded-md border-blue-300 p-2.5"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !especialidades.includes(value)) {
                    setEspecialidades((prev) => [...prev, value]);
                  }
                }}
              >
                <option value="">Seleccione una especialidad</option>
                {specialtiesOptions.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                {especialidades.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-100 mt-2 px-3 py-1 text-sm font-light text-blue-700 mr-2"
                  >
                    {specialty}
                    <button
                      onClick={() =>
                        setEspecialidades((prev) =>
                          prev.filter((item) => item !== specialty)
                        )
                      }
                      className="ml-2 text-blue-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400">
                Años de Experiencia
              </label>
              <input
                type="text"
                value={experiencia}
                onChange={handleInputChange(setExperiencia)}
                className="block w-full rounded-md border-blue-300 placeholder-blue-300 p-2.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400">
                Ubicación
              </label>
              <input
                type="text"
                value={ubicacion}
                onChange={handleInputChange(setUbicacion)}
                className="block w-full rounded-md border-blue-300 placeholder-blue-300 p-2.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-400 dark:text-white">
                  Precio Mínimo
                </label>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="block w-full rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-400 dark:text-white">
                  Precio Máximo
                </label>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="block w-full rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light p-2.5"
                />
              </div>
            </div>
            <button
              onClick={closeEditModal}
              className="px-4 py-2 mt-4 rounded-md bg-green-500 text-white"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistProfile;
