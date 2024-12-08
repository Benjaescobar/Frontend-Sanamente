import React, { useState, ChangeEvent } from "react";
import { useEdgeStore } from "../../lib/edgestore";

interface ProfilePhotoUploadProps {
  onUploadComplete: (url: string) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onUploadComplete,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progressVal, setProgressVal] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setProgressVal(0); // Reset progress for new file
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const uploadResult = await edgestore.myPublicImages.upload({
          file,
          onProgressChange: (progress) => {
            setProgressVal(progress);
          },
        });
        onUploadComplete(uploadResult.url); // Notificar al componente padre
      } catch (error) {
        console.error("Error al subir la foto:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-4 py-2 bg-blue-800 text-white font-medium rounded-sm hover:bg-blue-700"
      >
        Elegir Archivo
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="h-2 my-4 w-40 overflow-hidden rounded border">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${progressVal}%` }}
        ></div>
      </div>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-800 text-white font-medium rounded-sm"
      >
        Subir Foto
      </button>
    </div>
  );
};

export default ProfilePhotoUpload;
