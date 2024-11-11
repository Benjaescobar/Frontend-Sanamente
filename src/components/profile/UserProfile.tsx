// src/UserProfile.tsx
import React from 'react';
import NavBar from "@/components/navbar/NavBar";
import '../../app/UserProfile.css';

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
  const user: User = {
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

  return (
    <div>
      <NavBar />
    
    <div className="profile-container">
      <header className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>Edad: {user.personalInfo.age}</p>
          <p>Email: {user.personalInfo.email}</p>
          <p>Especialidad: {user.personalInfo.specialty}</p>
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
