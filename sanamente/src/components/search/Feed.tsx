// components/Feed.tsx
import React from 'react';
import ProfessionalCard from './ProfessionalCard';

const professionals = [
  {
    name: 'Ana María Pereira López',
    description: 'Especialista en terapia individual y manejo de estrés...',
    specialties: ['Ansiedad', 'Apego', 'Depresión', 'Manejo de la ira', 'Fobias', 'Relaciones tóxicas'],
    price: 60000,
    modality: 'Presencial',
    method: 'Orientación Psicoanalítica',
    experience: '10 años',
    imageUrl: "/images/foto.png",
  },
  {
    name: 'Sergio Saavedra Zúñiga',
    description: 'Especialista en terapia cognitivo-conductual...',
    specialties: ['Trastorno Obsesivo Compulsivo', 'Problemas de pareja', 'Estrés postraumático'],
    price: 50000,
    modality: 'Remoto',
    method: 'Terapia Cognitivo-Conductual',
    experience: '8 años',
    imageUrl: '/images/sergio.png',
  },
];

export default function Feed() {
  return (
    <div className="min-w-3/4">
      {professionals.map((professional, index) => (
        <ProfessionalCard key={index} {...professional} />
      ))}
    </div>
  );
}
