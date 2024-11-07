"use client";
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/profile/Content";
import Review from "@/components/profile/Review";
import { InlineWidget } from "react-calendly";
import { useState } from "react";
import React from "react";

export default function FeedPosts() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos

  return (
    <div>
      <NavBar />
      {/* Contenedor de Content y CalendlyEmbed en la misma fila */}
      <div className="flex pt-10 px-4 space-x-4">
        {/* Contenedor de Content */}
        <div className="flex-1">
          <Content />
          <Review />
        </div>
        {/* Componente de CalendlyEmbed ajustado al lado derecho */}
        <div className="flex-shrink-0 w-1/3">
          <h1 className="text-xl font-bold mb-4">Schedule an Appointment</h1>
          <InlineWidget url="https://calendly.com/renate-uc" />
        </div>
      </div>
    </div>
  );
}
