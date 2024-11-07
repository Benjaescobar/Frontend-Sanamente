"use client";
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/profile/Content";
import Review from "@/components/profile/Review";
import React from "react";

export default function FeedPosts() {
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
