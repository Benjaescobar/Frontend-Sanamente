// components/ProfessionalCard.tsx
import React from "react";
import Image from "next/image";

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
}: ContentProps) {
  return (
    <div className="mb-4 w-full max-w-4xl ml-20">
      <div className="flex">
        <Image
          src={imageUrl}
          alt={name}
          width={170} // Tamaño ajustado
          height={120} // Tamaño ajustado
          className="rounded-lg mr-6 object-cover"
        />
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
          <div className="flex flex-wrap mt-4">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-sm border border-red-500 rounded-full px-3 py-1 mx-1 my-1 text-red-500 font-medium" // Ajuste del padding y aumento del border-radius
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
              <p className="font-bold text-sm text-gray-800">
                Años de experiencia
              </p>
              <span className="font-normal text-gray-800">{experience}</span>
            </div>
          </div>
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
