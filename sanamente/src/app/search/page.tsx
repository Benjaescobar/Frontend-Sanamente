"use client"
import NavBar from "@/components/navbar/NavBar";
import Header from "@/components/feed/Header";
import Filters from "@/components/feed/Filters";
import Feed from "@/components/feed/Feed";
import { useState } from 'react';
// pages/feed-posts.tsx
import React from 'react';




export default function Search() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos
 
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-[#F6F8FB] p-8">
            <Header />
            <div className="max-w-7xl mx-auto mt-4 flex space-x-6">
                {/* Filters ocupando 1/4 del espacio */}
                <div className="w-1/4 pt-10">
                <Filters />
                </div>

                {/* Feed ocupando 3/4 del espacio con contenido centrado */}
                <div className="w-3/4 flex justify-center">
                <div className="max-w-3xl w-full">
                    <Feed />
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}
