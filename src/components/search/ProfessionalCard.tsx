// components/ProfessionalCard.tsx
import React from 'react';
import Image from 'next/image';

interface ProfessionalCardProps {
  name: string;
  description: string;
  specialties: string[];
  price: number;
  modality: string;
  method: string;
  experience: string;
  imageUrl: string;
}

export default function ProfessionalCard({
  name,
  description,
  specialties,
  price,
  modality,
  method,
  experience,
  imageUrl,
}: ProfessionalCardProps) {
  return (
    <div className="p-8 mb-4 bg-white rounded-xl shadow-md border border-gray-200 w-full">
        <div className="flex">
            <Image 
            src={imageUrl} 
            alt={name} 
            width={96} // Puedes ajustar el ancho (en píxeles) según tus necesidades
            height={96} // Puedes ajustar la altura (en píxeles) según tus necesidades
            className="rounded-full mr-4 object-cover"
            />
            <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="border-b border-gray-300 my-2"></div>
            <p className="text-gray-600">{description}</p>
            <div className="flex flex-wrap mt-2">
                {specialties.map((specialty) => (
                <span key={specialty} className="text-xs border border-red-500 rounded-xl mx-1 my-1 p-1 py-1 text-red-500 inline-flex">
                    {specialty}
                </span>
                ))}
            </div>
            </div>
        </div>
        {/* Detalles del profesional */}
        <div className="mt-4">
            <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-sm text-gray-800">Precio</p>
                    <span className="font-normal text-gray-800">${price}</span>
                </div>

                <div className="flex flex-col items-center">
                    <p className="font-bold text-sm text-gray-800">Modalidad</p>
                    <span className="font-normal text-gray-800">{modality}</span>
                </div>

                <div className="flex flex-col items-center">
                    <p className="font-bold text-sm text-gray-800">Método</p>
                    <span className="font-normal text-gray-800">{method}</span>
                </div>

                <div className="flex flex-col items-center">
                    <p className="font-bold text-sm text-gray-800">Años de experiencia</p>
                    <span className="font-normal text-gray-800">{experience}</span>
                </div>
            </div>
            {/* Botón alineado debajo */}
            <button className="bg-red-500 text-white w-full py-2 rounded-2xl text-center text-m font-light">
            Reserva ahora con {name.split(" ")[0]}
            </button>
        </div>
    </div>
  );
}
