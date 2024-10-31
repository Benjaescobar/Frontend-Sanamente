// components/InformacionAdicional.tsx
import React from "react";

export default function InformacionAdicional() {
  return (
    <div className="mt-6 ml-20 max-w-4xl">
      {" "}
      {/* Limita el ancho y alinea */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Información Detallada
      </h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Soy psicóloga clínica, apasionada por acompañar a mis pacientes en su
        camino hacia el bienestar emocional. Con una formación sólida en terapia
        cognitivo-conductual y gestión de la ansiedad, mi objetivo es brindar un
        espacio seguro y empático donde puedas explorar y comprender tus
        emociones, identificar patrones de comportamiento y construir
        herramientas para el cambio positivo.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Creo que la terapia es un proceso colaborativo en el que cada persona
        tiene un papel activo. Me esfuerzo por adaptarme a tus necesidades,
        respetando siempre tu ritmo y brindando estrategias prácticas para el
        día a día. Estoy aquí para ayudarte a encontrar claridad y a trabajar en
        conjunto hacia una vida con mayor bienestar y equilibrio.
      </p>
    </div>
  );
}
