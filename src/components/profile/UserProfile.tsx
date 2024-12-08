import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";
import "../../app/UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getSessionsByPacientId } from "@/services/apiService";
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
  const [myData, setMyData] = useState<UserProfileData>();
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    const name = localStorage.getItem("name") || "";
    const sub = localStorage.getItem("sub") || "";
    const picture = localStorage.getItem("picture") || "";
    const id = localStorage.getItem("id") || "";
  
    setMyData({ email, name, sub, picture, id });
  }, []); // Solo se ejecuta una vez

  useEffect(() => {
    const fetchPacientData = async () => {
      if (myData && myData.id) {
        setLoadingSessions(true)
        const response = await getSessionsByPacientId(Number(myData.id));
        setSessions(response);
        setLoadingSessions(false)
      }
    };
  
    fetchPacientData();
  }, [myData]);

  const handleConfirmPhoto = (url: string) => {
    setIsPhotoModalOpen(false);
    localStorage.setItem("picture", url);
    window.location.reload();
  };

  const upcomingSessions = sessions.filter((session) =>
    dayjs(session.estado).isAfter(dayjs())
  );
  const pastSessions = sessions.filter((session) =>
    dayjs(session.estado).isBefore(dayjs())
  );

  if (!myData) {
    return <div>Cargando perfil...</div>;
  }

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
            <p className="font-light text-base text-gray-400">{myData?.email}</p>
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
              <ProfilePhotoUpload onUploadComplete={handleConfirmPhoto} id={myData ? myData.id : null}/>
              <button onClick={() => {setIsPhotoModalOpen(false)}} >Cancelar</button>
            </div>
          </div>
        )}

        <section className="appointments">
          <h3 className="font-bold">Mis citas</h3>
          {loadingSessions && (
            <div className="text-center mt-10">
              <div className="relative inline-block">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-6xl text-gray-400 mb-4 animate-spin"
                />
              </div>
              <p className="text-gray-500">Cargando...</p>
            </div>
          )}
          {upcomingSessions.length === 0 && !loadingSessions ? (
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
