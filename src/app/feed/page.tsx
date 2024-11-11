"use client"
import NavBar from "@/components/navbar/NavBar";
import React, { useEffect, useState } from "react";
import ProfessionalBlogPost from "@/components/feed/ProfessionalBlogPost";
import { getPosts } from "@/services/apiService";
import { ProfessionalBlogPostProps } from "@/types/types"; // Importa el tipo

export default function FeedPosts() {
  // Asegura que `publicaciones` sea del tipo `ProfessionalBlogPostProps[]`
  const [publicaciones, setPublicaciones] = useState<ProfessionalBlogPostProps[]>([]);
  const colorClass: string[] = ["bg-celeste", "bg-amarillo"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPublicaciones(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="px-[15%] py-5 font-semibold text-2xl">
        Feed
        <div className="min-w-3/4">
          {publicaciones.map((post, index) => (
            <ProfessionalBlogPost
              content={""} timeSincePost={""} key={index}
              color={colorClass[index % 2]}
              {...post}            />
          ))}
        </div>
      </div>
    </div>
  );
}
