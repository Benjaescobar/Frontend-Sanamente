"use client";
import NavBar from "@/components/navbar/NavBar";
import React, { useEffect, useState } from "react";
import ProfessionalBlogPost from "@/components/feed/ProfessionalBlogPost";
import { getPosts } from "@/services/apiService";
import { ProfessionalBlogPostProps } from "@/types/types"; // Importa el tipo
import CreatePost from "@/components/feed/CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function FeedPosts() {
  const [publicaciones, setPublicaciones] = useState<ProfessionalBlogPostProps[]>([]);
  const [psicologo, setPsicologo] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorClass: string[] = ["bg-celeste", "bg-amarillo"];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPublicaciones(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    setPsicologo(tipo === "psicologo");
    fetchPosts();
  }, []);

  return (
    <div>
      <NavBar />
      {loading ? (
        <div className="text-center mt-10">
          <div className="relative inline-block">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-6xl text-gray-400 mb-4 animate-spin"
            />
          </div>
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : (
        <div className="px-[15%] py-5 font-semibold text-2xl">
          Feed
          <div className="min-w-3/4">
            {psicologo && (
              <CreatePost onPostCreated={fetchPosts} />
            )}
            {publicaciones.map((post, index) => (
              <ProfessionalBlogPost
                key={index}
                redirect={true}
                color={colorClass[index % 2]}
                {...post}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
