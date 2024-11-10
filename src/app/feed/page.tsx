"use client";
import NavBar from "@/components/navbar/NavBar";
import { useState } from "react";
// pages/feed-posts.tsx
import React from "react";
import BlogFeed from "@/components/feed/BlogFeed";
import CreatePost from "@/components/feed/CreatePost";

export default function FeedPosts() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos

  return (
    <div>
      <NavBar />
      <div className="px-[15%] py-5 font-semibold text-2xl">
        Feed
        <CreatePost />
        <BlogFeed />
      </div>
    </div>
  );
}

