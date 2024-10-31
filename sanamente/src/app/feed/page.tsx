"use client"
import NavBar from "@/components/navbar/NavBar";
import { useState } from 'react';
// pages/feed-posts.tsx
import React from 'react';




export default function FeedPosts() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos
 
  return (
    <div>
      <NavBar />
    </div>
  );
}
