"use client";
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/profile/Content";
import Review from "@/components/profile/Review";
import { useState } from "react";
import React from "react";

export default function FeedPosts() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos

  return (
    <div>
      <NavBar />
      {/* Contenedor de Content */}
      <div className="pt-10">
        <Content />
      </div>
      {/* Componente de Review */}
      <Review />
    </div>
  );
}
