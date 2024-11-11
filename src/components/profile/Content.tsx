
// components/ProfessionalCard.tsx
import React from "react";
import Image from "next/image";

interface ContentProps {
  nombre: string;
  descripcion: string;
  especialidades: string;
  precio_min: number;
  experiencia: number;
  foto: string | null;
}

function Content( {
  nombre,
  descripcion,
  especialidades,
  precio_min,
  experiencia,
  foto,
}: ContentProps) {
  return (
    <div className="mb-4 w-full max-w-4xl ml-10">
      <div className="flex">
        <Image
          src={foto || '/images/sergio.png'}
          alt={nombre}
          width={170} // Tamaño ajustado
          height={120} // Tamaño ajustado
          className="rounded-lg mr-6 object-cover"
        />
        <div>
          <h3 className="text-2xl font-bold">{nombre}</h3>
          <p className="text-gray-600 mt-2">{descripcion}</p>
          <div className="flex flex-wrap mt-4">
            {especialidades.split(', ').map((specialty) => (
                <span
                key={specialty}
                className="text-xs border border-red-500 rounded-xl mx-1 my-1 p-1 py-1 text-red-500 inline-flex"
                >
                {specialty
                    .toLowerCase()
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="font-bold text-sm text-gray-800">Precio</p>
              <span className="font-normal text-gray-800">${precio_min}</span>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">
                Años de experiencia
              </p>
              <span className="font-normal text-gray-800">{experiencia}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function ProfessionalCardList( therapists ) {
//   return (
//     <div>
//       {professionals.map((professional, index) => (
//         <Content key={index} {...professional} />
//       ))}
//     </div>
//   );
// }

export default Content;