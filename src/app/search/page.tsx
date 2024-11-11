"use client";
import NavBar from "@/components/navbar/NavBar";
import Header from "@/components/search/Header";
import Filters from "@/components/search/Filters";
import Feed from "@/components/search/Feed";
import React, { useEffect, useState } from "react";

export default function Search() {
  const [filters, setFilters] = useState({
    esp: "",
    exp: 0,
    city: "",
    min_price: 0,
    max_price: 0,
  });

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };


  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-[#F6F8FB] p-8">
        <Header onFiltersChange={handleFiltersChange} />
        <div className="max-w-7xl mx-auto mt-4 flex space-x-6">
          {/* Filters ocupando 1/4 del espacio */}
          <div className="w-1/4 pt-10">
            <Filters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Feed ocupando 3/4 del espacio con contenido centrado */}
          <div className="w-3/4 flex justify-center">
            <div className="max-w-3xl w-full">
              <Feed filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
