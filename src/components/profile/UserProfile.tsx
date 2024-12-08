import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";
import "../../app/UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { editUserPhoto, getSessionsByPacientId } from "@/services/apiService";
import dayjs from "dayjs";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

interface UserProfileData {
  email: string;
  name: string;
  sub: string;
  picture: string;
  id: string;
}

const UserProfile: React.FC = () => {
  const [myData, setMyData] = useState<UserProfileData | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    const name = localStorage.getItem("name") || "";
    const sub = localStorage.getItem("sub") || "";
    const picture = localStorage.getItem("picture") || "";
    const id = localStorage.getItem("id") || "";

    setMyData({ email, name, sub, picture, id });
  }, [uploadedPhotoUrl]);

  useEffect(() => {
    const fetchPacientData = async () => {
      if (myData) {
        const response = await getSessionsByPacientId(Number(myData.id));
        setSessions(response);
      }
    };

    fetchPacientData();
  }, [myData]);

  const handleConfirmPhoto = (url: string) => {
    setUploadedPhotoUrl(url);
    setIsSaveButtonEnabled(true);
  };

  const handleSavePhoto = async () => {
    if (uploadedPhotoUrl && myData) {
      try {
        await editUserPhoto(Number(myData.id), uploadedPhotoUrl);

        // Actualizar la URL de la foto en el estado local
        setMyData({ ...myData, picture: uploadedPhotoUrl });

        alert("Foto guardada correctamente en el backend");
        localStorage.setItem("picture", uploadedPhotoUrl);
        setIsPhotoModalOpen(false);
        setIsSaveButtonEnabled(false); // Desactivar el botón después de guardar
      } catch (error) {
        console.error("Error al guardar la foto:", error);
        alert("Hubo un error al guardar la foto.");
      }
    }
  };

  const upcomingSessions = sessions.filter((session) =>
    dayjs(session.estado).isAfter(dayjs())
  );
  const pastSessions = sessions.filter((session) =>
    dayjs(session.estado).isBefore(dayjs())
  );

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <section className="profile-header">
          <Image
            src={myData?.picture || "/images/default-profile.jpg"}
            alt="Foto de perfil"
            className="rounded-full p-5"
            width={150}
            height={150}
          />
          <div className="profile-info">
            <h2>{myData?.name}</h2>
            <h2 className="font-light text-s">{myData?.email}</h2>
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit Profile Picture"
            >
              <FontAwesomeIcon icon={faEdit} className="h-5 w-5" />
            </button>
          </div>
          
        </section>

        {/* Modal para cambiar foto de perfil */}
        {isPhotoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <ProfilePhotoUpload onUploadComplete={handleConfirmPhoto} />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePhoto}
                  disabled={!isSaveButtonEnabled}
                  className={`px-4 py-2 ${
                    isSaveButtonEnabled
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } font-medium rounded-lg`}
                >
                  Guardar Foto
                </button>
              </div>
            </div>
          </div>
        )}


        <section className="appointments">
          <h3 className="font-bold">Mis citas</h3>
          {upcomingSessions.length === 0 ? (
            <p>No tienes citas con este psicólogo.</p>
          ) : (
            <>
              <h3 className="font-light">Próximas sesiones</h3>
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-blue-400 text-white p-3 m-1 rounded-lg hover:bg-blue-300 hover:cursor-pointer"
                >
                  {dayjs(session.estado).format("D [de] MMMM, HH:mm")}
                </div>
              ))}
              <h3>Sesiones pasadas</h3>
              {pastSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-blue-100 text-blue-300 p-3 m-1 rounded-lg hover:bg-blue-200 hover:cursor-pointer"
                >
                  {dayjs(session.estado).format("D [de] MMMM, HH:mm")}
                </div>
              ))}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
