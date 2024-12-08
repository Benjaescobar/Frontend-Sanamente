import React, { useEffect, useState } from 'react';
import NavBar from "@/components/navbar/NavBar";
import Image from 'next/image';
import '../../app/UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { editUserPhoto, getSessionsByPacientId } from '@/services/apiService';
import dayjs from 'dayjs';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

  };

  useEffect(() => {
    const email = localStorage.getItem('email') || '';
    const name = localStorage.getItem('name') || '';
    const sub = localStorage.getItem('sub') || '';
    const picture = localStorage.getItem('picture') || '';
    const id = localStorage.getItem('id') || '';

    setMyData({
      email,
      name,
      sub,
      picture,
      id,
    });
  }, []);

  useEffect(() => {
    const fetchPacientData = async () => {
      if (myData) {
        const response = await getSessionsByPacientId(Number(myData.id));
        setSessions(response);
        // const foto = await getUserPhoto(Number(myData.id));
        // // Crear un Blob a partir de los datos
        // const byteArray = new Uint8Array(foto.data); // Convertir array a Uint8Array
        // const blob = new Blob([byteArray], { type: "image/png" }); 
        // console.log(blob);
        // // Crear una URL utilizable a partir del Blob
        // const url = URL.createObjectURL(blob);
        // console.log(url);
        // setImageUrl(url);
      }
    };

    fetchPacientData();
  }, [myData]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedPhoto(event.target.files[0]);
    }
  };
        
  const handleSavePhoto = async () => {
    if (myData && selectedPhoto) {
      try {
        const photoBlob = new Blob([selectedPhoto], { type: selectedPhoto.type });
        await editUserPhoto(Number(myData.id), photoBlob);

        // Actualizar foto en el estado local
        const photoURL = URL.createObjectURL(photoBlob);
        setMyData({ ...myData, picture: photoURL });

        alert('Foto actualizada correctamente');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error al actualizar la foto:', error);
        alert('Hubo un error al actualizar la foto.');
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
          {/* <Image
            src={myData?.picture ? myData.picture : "/images/default-profile.jpg"}
            alt={''}
            className="rounded-full p-5"
            width={150}
            height={150}
          /> */}
          <Image
            src={"/images/default-profile.jpg"}
            alt={''}
            className="rounded-full p-5"
            width={150}
            height={150}
          />
          <div className="profile-info">
            <h2>{myData?.name} </h2>
            <button
              onClick={toggleModal}
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit Profile"
            >
              <FontAwesomeIcon icon={faEdit} className="h-5 w-5" />
            </button>
            <div>
            </div>
          </div>
        </section>
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
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Editar perfil</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  defaultValue={myData?.name}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={myData?.email}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Foto de perfil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
