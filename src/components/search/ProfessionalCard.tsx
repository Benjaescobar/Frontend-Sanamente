// components/ProfessionalCard.tsx
import React from "react";
import Image from "next/image";

interface ProfessionalCardProps {
  id: number;
  nombre: string;
  descripcion: string;
  especialidades: string;
  precio_min: number;
  precio_max: number;
  experiencia: number;
  ubicacion: string;
  url_calendly: string;
  foto: string | null;
}

export default function ProfessionalCard({
  id,
  nombre,
  descripcion,
  especialidades,
  precio_min,
  precio_max,
  experiencia,
  ubicacion,
  foto,
}: ProfessionalCardProps) {

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };
  

  return (
    <div className="p-8 mb-4 bg-white rounded-xl shadow-md border border-gray-200 w-full">
      <div className="flex">
        <Image
          src={foto || "/images/default-profile.jpg"} // Imagen por defecto si `foto` es null
          alt={nombre}
          width={96} // Puedes ajustar el ancho según tus necesidades
          height={96} // Puedes ajustar la altura según tus necesidades
          className="rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{nombre}</h3>
          <div className="border-b border-gray-300 my-2"></div>
          <p className="text-gray-600">{descripcion}</p>
          <div className="flex flex-wrap mt-2">
            {especialidades.split(", ").map((specialty) => (
              <span
                key={specialty}
                className="text-xs border border-red-500 rounded-xl mx-1 my-1 p-1 py-1 text-red-500 inline-flex"
              >
                {specialty
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Detalles del profesional */}
      <div className="mt-4">
        <div className="flex justify-between mb-4">
          <div className="flex flex-col items-center">
            <p className="font-bold text-sm text-gray-800">
              Rango de precios💰
            </p>
            <span className="font-normal text-gray-800">
              {formatCLP(precio_min)} a {formatCLP(precio_max)}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-sm text-gray-800">Ubicación📍</p>
            <span className="font-normal text-gray-800">{ubicacion}</span>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-sm text-gray-800">Experiencia 🧠</p>
            <span className="font-normal text-gray-800">
              {experiencia} años
            </span>
          </div>
        </div>
        {/* Botón alineado debajo */}
        <a href={`/profile/${id}`} target="_blank" rel="noopener noreferrer">
          <button className="bg-red-500 text-white w-full py-2 rounded-2xl text-center text-m font-light">
            Reserva ahora con {nombre.split(" ")[0]}
          </button>
        </a>
      </div>
    </div>
  );
}

