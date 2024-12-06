"use client";
import NavBar from "@/components/navbar/NavBar";
import Header from "@/components/search/Header";
import Filters from "@/components/search/Filters";
import Feed from "@/components/search/Feed";
import React, { useState } from "react";

export default function Search() {
  const [especialidad, setEspecialidad] = useState<string>("");
  const [experiencia, setExperiencia] = useState<string>("");
  const [lugar, setLugar] = useState<string>("");
  const [precioMin, setPrecioMin] = useState<string>("");
  const [precioMax, setPrecioMax] = useState<string>("");

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-[#F6F8FB] p-8">
        <Header
          lugar={lugar}
          setLugar={setLugar}
          precioMin={precioMin}
          setPrecioMin={setPrecioMin}
          precioMax={precioMax}
          setPrecioMax={setPrecioMax}
        />
        <div className="max-w-7xl mx-auto mt-4 flex space-x-6">
          {/* Filters ocupando 1/4 del espacio */}
          <div className="w-1/4 pt-10">
            <Filters
              especialidad={especialidad}
              setEspecialidad={setEspecialidad}
              experiencia={experiencia}
              setExperiencia={setExperiencia}
            />
          </div>

          {/* Feed ocupando 3/4 del espacio con contenido centrado */}
          <div className="w-3/4 flex justify-center">
            <div className="max-w-3xl w-full">
              <Feed
                especialidad={especialidad}
                experiencia={experiencia}
                lugar={lugar}
                precio_min={precioMin}
                precio_max={precioMax}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
