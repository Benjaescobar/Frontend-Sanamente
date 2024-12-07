// components/BlogFeed.tsx
import React from "react";
import ProfessionalBlogPost from "./ProfessionalBlogPost";
import { ProfessionalBlogPostProps } from "@/types/types"; // Asegúrate de importar el tipo

interface BlogFeedProps {
  publicaciones: ProfessionalBlogPostProps[];
}

export default function BlogFeed({ publicaciones }: BlogFeedProps) {
  const colorClass: string[] = ["bg-celeste", "bg-amarillo"];

  return (
    <div className="min-w-3/4">
      {publicaciones.map((post, index) => (
        <ProfessionalBlogPost
          content={""} timeSincePost={""} key={index} redirect={true}
          color={colorClass[index % 2]}
          {...post}        />
      ))}
    </div>
  );
}
