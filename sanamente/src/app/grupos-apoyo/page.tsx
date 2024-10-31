"use client"
import NavBar from "@/components/navbar/NavBar";
import { useState } from 'react';

export default function GroupChat() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos
 
  return (
    <div>
      <NavBar />
    </div>
  );
}
