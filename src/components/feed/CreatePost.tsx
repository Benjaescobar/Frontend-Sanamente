import React, { useEffect, useState } from "react";
import { createPost, getTherapistById } from "@/services/apiService";
import Image from "next/image";

interface CreatePostProps {
  onPostCreated: () => void; // Prop para notificar al padre
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [postContent, setPostContent] = useState("");
  const [urlFoto, setUrlFoto] = useState<string | null>("");
  const [psicologoId, setTherapistId] = useState<any | null>(0);

  useEffect(() => {
    const foto = localStorage.getItem("picture");
    setUrlFoto(foto || null);

    const id = localStorage.getItem("id");
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
  }, []);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (postContent.trim() === "") {
      alert("Por favor, escribe algo antes de publicar");
      return;
    }
    try {
      await createPost(psicologoId, postContent);
      setPostContent("");
      onPostCreated(); // Notificar al componente padre
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around space-y-2 px-6 py-3 pb-4 m-4 rounded-xl border bg-white mx-auto">
      <div className="flex items-center mb-4">
        {urlFoto ? (
          <Image
            src={urlFoto}
            alt="Foto de perfil"
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
        ) : (
          <Image
            src="/images/default-profile.jpg"
            alt="Foto de perfil"
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
        )}
        <textarea
          className="flex-1 p-2 border rounded-lg resize-none placeholder-gray-500 font-normal"
          placeholder="Comparte con la comunidad..."
          value={postContent}
          onChange={handlePostChange}
          rows={3}
        />
      </div>
      <div className="flex items-center justify-between border-t pt-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm ml-auto"
          onClick={handlePostSubmit}
        >
          Publicar
        </button>
      </div>
    </div>  
  );
}
