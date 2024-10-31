// components/Review.tsx
import React from "react";
import Image from "next/image";

function ReviewCard() {
  return (
    <div className="border border-gray-300 rounded-xl p-4 w-full max-w-md shadow-sm">
      <div className="flex items-start">
        <div className="mr-3">
          <Image
            src="/images/user-placeholder.png" // Ruta de la imagen del usuario
            alt="Usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Nombre de usuario</p>
              <p className="text-sm text-gray-500">16 de Septiembre del 2024</p>
            </div>
            <div className="flex items-center">
              {/* Estrellas de calificación */}
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-300 text-lg">★</span>
            </div>
          </div>
          <p className="text-gray-700 mt-2">
            Ana María es una profesional empática y cercana, que brinda un
            espacio seguro para comprender y trabajar las emociones, ofreciendo
            herramientas prácticas para el bienestar diario.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Review() {
  return (
    <div className="flex gap-2 mt-4 ml-20">
      {" "}
      {/* Margen de 20 al contenedor principal */}
      <ReviewCard />
      <ReviewCard />
    </div>
  );
}
