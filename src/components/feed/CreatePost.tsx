// components/CreatePost.tsx
import React, { useState } from "react";
import Image from "next/image";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    if (postContent.trim() === "") {
      alert("Por favor, escribe algo antes de publicar");
      return;
    }
    // Aquí podrías agregar lógica para enviar el post a la API
    console.log("Post publicado:", postContent);
    setPostContent("");
  };

  return (
    <div className="flex flex-col justify-around space-y-2 px-6 py-3 pb-4 m-4 rounded-xl border bg-white mx-auto">
      <div className="flex items-center mb-4">
        <Image
          src="/images/tu-foto-de-perfil.png" // Cambia esta ruta a la imagen de perfil real
          alt="Foto de perfil"
          className="w-10 h-10 rounded-full mr-3"
        />
        <textarea
          className="flex-1 p-2 border rounded-lg resize-none placeholder-gray-500 font-normal" // Asegura que el texto no esté en negrita
          placeholder="Comparte con la comunidad..."
          value={postContent}
          onChange={handlePostChange}
          rows={3}
        />
      </div>
      <div className="flex items-center justify-between border-t pt-2">
        <div className="flex items-center space-x-4">
          {/* Espacio para otros elementos como íconos */}
        </div>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          onClick={handlePostSubmit}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
