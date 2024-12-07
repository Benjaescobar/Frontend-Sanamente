// components/CreatePost.tsx
import React, { useEffect, useState } from "react";
import { createPost, getTherapistById } from "@/services/apiService"
import Image from "next/image";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [urlFoto, setUrlFoto] = useState<string | null>("");
  const [psicologoId, setTherapistId] = useState<any | null>(0)

  useEffect(()=>{
    const foto = localStorage.getItem('picture');
    if (foto != ""){
      setUrlFoto(foto);
    } else {
      setUrlFoto(null);
    }
    console.log(foto);
    const id = localStorage.getItem('id');
    const fetchTherapist = async () => {
      if (typeof id !== "string") {
        console.error("Invalid ID format");
        return;
      }

      try {
        const data = await getTherapistById(id);
        setTherapistId(data.therapist.id);
      } catch (error) {
        console.error("Error fetching Therapist:", error);
      }
    };
    fetchTherapist();
  })

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    if (postContent.trim() === "") {
      alert("Por favor, escribe algo antes de publicar");
      return;
    }
    // Aquí podrías agregar lógica para enviar el post a la API

    createPost(psicologoId, postContent);
    window.location.reload();
    console.log("Post publicado:", postContent);
    setPostContent("");
  };

  return (
    <div className="flex flex-col justify-around space-y-2 px-6 py-3 pb-4 m-4 rounded-xl border bg-white mx-auto">
      <div className="flex items-center mb-4">
        {urlFoto ? (
        <Image src={urlFoto} alt="Foto de perfil"
        className="w-10 h-10 rounded-full mr-3" width={10} height={10}></Image>
        ) :
        (
          <Image src="/images/default-profile.jpg"  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full mr-3" width={10} height={10}></Image>

        )}
        
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