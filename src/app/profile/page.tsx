"use client";
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/profile/Content";
import Review from "@/components/profile/Review";
import BlogFeed from "@/components/feed/BlogFeed";
import { InlineWidget } from "react-calendly";
import { useState } from "react";
import React from "react";

export default function FeedPosts() {
  return (
    <div>
      <NavBar />
      {/* Contenedor de Content y CalendlyEmbed en la misma fila */}
      <div className="flex pt-10 px-4 space-x-4">
        {/* Contenedor de Content */}
        <div className="flex-1">
          <Content />
          <Review />
          <h1 className="text-xl font-bold mb-4 ml-10 mt-5">
            Publicaciones de Ana María
          </h1>
          <div className="ml-5">
            <BlogFeed />
          </div>
        </div>
        <div className="flex-shrink-0 w-1/3">
          <h1 className="text-xl font-bold mb-4">Schedule an Appointment</h1>
          <InlineWidget url="https://calendly.com/renate-uc" />
        </div>
      </div>
    </div>
  );
}
