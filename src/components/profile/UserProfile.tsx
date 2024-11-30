// src/UserProfile.tsx
import React, { useState } from 'react';
import NavBar from "@/components/navbar/NavBar";
import '../../app/UserProfile.css';
import { FaEdit, FaSave } from 'react-icons/fa';

interface PersonalInfo {
  age: number;
  email: string;
  specialty: string;
}

interface Appointment {
  id: number;
  psychologist: string;
  date: string;
  review: string;
  rating: number;
}

interface User {
  name: string;
  profilePicture: string;
  personalInfo: PersonalInfo;
  appointments: Appointment[];
}

const UserProfile: React.FC = () => {
  const initialUser: User = {
    name: 'Juan',
    profilePicture: 'https://via.placeholder.com/150',
    personalInfo: {
      age: 30,
      email: 'juan@example.com',
      specialty: 'Psicología clínica',
    },
    appointments: [
      {
        id: 1,
        psychologist: 'Pedro',
        date: '10 de noviembre de 2024',
        review: 'Excelente profesional',
        rating: 5,
      },
      {
        id: 2,
        psychologist: 'Pedro',
        date: '10 de noviembre de 2024',
        review: 'Bien, pero peor que la anterior',
        rating: 4,
      },
      {
        id: 3,
        psychologist: 'Javiera',
        date: '10 de noviembre de 2024',
        review: 'No me gustó, demasiado impuntual.',
        rating: 2,
      },
    ],
  };

  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<User>(initialUser);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditableUser(user); // Restaura la información actual al iniciar la edición
  };

  const handleSave = () => {
    setUser(editableUser); // Actualiza el usuario con la información editada
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser((prevUser) => ({
      ...prevUser,
      personalInfo: {
        ...prevUser.personalInfo,
        [name]: name === 'age' ? Number(value) : value, // Convierte edad a número
      },
      name: name === 'name' ? value : prevUser.name, // Actualiza nombre si es el campo de nombre
    }));
  };

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <header className="profile-header">
          {/* <Image src={user.profilePicture} alt="Profile" className="profile-picture" width={150} height={150} /> */}
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleInputChange}
                className="editable-input"
              />
            ) : (
              <h2>{user.name}</h2>
            )}
            {isEditing ? (
              <button onClick={handleSave} className="save-button">
                <FaSave /> Guardar
              </button>
            ) : (
              <button onClick={handleEditToggle} className="edit-button">
                <FaEdit /> Editar perfil
              </button>
            )}
            <div>
              <p>
                Edad: {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editableUser.personalInfo.age}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                ) : (
                  user.personalInfo.age
                )}
              </p>
              <p>
                Email: {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editableUser.personalInfo.email}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                ) : (
                  user.personalInfo.email
                )}
              </p>
              <p>
                Especialidad: {isEditing ? (
                  <input
                    type="text"
                    name="specialty"
                    value={editableUser.personalInfo.specialty}
                    onChange={handleInputChange}
                    className="editable-input"
                  />
                ) : (
                  user.personalInfo.specialty
                )}
              </p>
            </div>
          </div>
        </header>
        <section className="appointments">
          <h3>Mis Citas</h3>
          {user.appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <p><strong>Psicólogo:</strong> {appointment.psychologist}</p>
              <p><strong>Fecha:</strong> {appointment.date}</p>
              <p><strong>Reseña:</strong> {appointment.review}</p>
              <p><strong>Calificación:</strong> {'⭐'.repeat(appointment.rating)}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
