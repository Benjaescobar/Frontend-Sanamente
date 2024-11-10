// components/ProfessionalCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import { InlineWidget } from 'react-calendly';

const professionals = [
  {
    name: "Ana María Pereira López",
    description:
      "Ana María se especializa en terapia individual y manejo de estrés, ayudando a sus pacientes a enfrentar la ansiedad y mejorar su bienestar emocional. ¡Reserva tu sesión y empieza tu camino hacia el equilibrio!",
    specialties: [
      "Ansiedad",
      "Apego",
      "Depresión",
      "Manejo de la ira",
      "Fobias",
      "Relaciones tóxicas",
    ],
    price: 60000,
    modality: "Presencial",
    method: "Orientación Psicoanalítica",
    experience: "10 años",
    imageUrl: "/images/foto.png",
    calendlyUrl: "https://calendly.com/ana-maria" // URL de Calendly del psicólogo
  },
  // Agrega más profesionales si es necesario
];

interface ContentProps {
  name: string;
  description: string;
  specialties: string[];
  price: number;
  modality: string;
  method: string;
  experience: string;
  imageUrl: string;
  calendlyUrl: string;
}

function Content({
  name,
  description,
  specialties,
  price,
  modality,
  method,
  experience,
  imageUrl,
  calendlyUrl
}: ContentProps) {
  const [showCalendar, setShowCalendar] = useState(false); 

  return (
    <div className="mb-4 w-full max-w-4xl ml-10">
      <div className="flex">
        <div className="w-1/3">
          <Image
            src={imageUrl}
            alt={name}
            width={170} 
            height={120} 
            className="rounded-lg mr-6 object-cover"
          />
        </div>
        <div className="w-2/3">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
          <div className="flex flex-wrap mt-4">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-sm border border-red-500 rounded-full px-3 py-1 mx-1 my-1 text-red-500 font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="font-bold text-sm text-gray-800">Precio</p>
              <span className="font-normal text-gray-800">${price}</span>
            </div>

            <div>
              <p className="font-bold text-sm text-gray-800">Modalidad</p>
              <span className="font-normal text-gray-800">{modality}</span>
            </div>

            <div>
              <p className="font-bold text-sm text-gray-800">Método</p>
              <span className="font-normal text-gray-800">{method}</span>
            </div>

            <div>
              <p className="font-bold text-sm text-gray-800">Años de experiencia</p>
              <span className="font-normal text-gray-800">{experience}</span>
            </div>
          </div>

          {/* Botón para alternar la visibilidad del calendario */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 mt-4"
          >
            {showCalendar ? 'Ocultar Calendario' : 'Ver Calendario y Reservar'}
          </button>

          {/* Si showCalendar es true, mostramos el widget de Calendly */}
          {showCalendar && (
            <div className="mt-8" style={{ height: '600px', width: '100%', overflow: 'auto' }}>
              <InlineWidget url={calendlyUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfessionalCardList() {
  return (
    <div>
      {professionals.map((professional, index) => (
        <Content key={index} {...professional} />
      ))}
    </div>
  );
}
