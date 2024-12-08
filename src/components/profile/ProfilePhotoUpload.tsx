import React, { useState, ChangeEvent, DragEvent } from "react";
import { useEdgeStore } from "../../lib/edgestore";
import { editUserPhoto } from "@/services/apiService";

interface ProfilePhotoUploadProps {
  onUploadComplete: (url: string) => void;
  id: string | null;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onUploadComplete,
  id,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null); // Preview URL
  const [progressVal, setProgressVal] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState<boolean>(false); // Estado para el drag and drop
  const { edgestore } = useEdgeStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelection(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0] || null;
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile: File | null) => {
    setFile(selectedFile);
    setProgressVal(0); // Reset progress for new file
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile)); // Create preview URL
    } else {
      setFilePreview(null); // Clear preview if no file selected
    }
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

        // Notificar al componente padre
        onUploadComplete(uploadResult.url);

        try {
          await editUserPhoto(Number(id), uploadResult.url);
          localStorage.setItem("picture", uploadResult.url);
          alert("Cambiaste tu foto");
        } catch (error) {
          console.error("Error al guardar la foto:", error);
          alert("Hubo un error al guardar la foto.");
        }
      } catch (error) {
        console.error("Error al subir la foto:", error);
        alert("Hubo un error al subir la foto.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Drag and Drop Area */}
      <div
        className={`w-40 h-40 border-2 rounded-md flex flex-col items-center justify-center ${
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {filePreview ? (
          <img
            src={filePreview}
            alt="Vista previa"
            className="object-contain w-full h-full rounded-md"
          />
        ) : (
          <p className="text-gray-500">
            Arrastra y suelta una imagen aquí, o selecciona un archivo.
          </p>
        )}
      </div>

      {/* Input para seleccionar archivo manualmente */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-4 py-2 bg-blue-800 text-white font-medium rounded-sm hover:bg-blue-700"
      >
        Seleccionar Archivo
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Barra de progreso */}
      <div className="h-2 my-4 w-40 overflow-hidden rounded border">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${progressVal}%` }}
        ></div>
      </div>

      {/* Botón de subir */}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-800 text-white font-medium rounded-sm hover:bg-blue-700"
        disabled={!file} // Deshabilitar si no hay archivo seleccionado
      >
        Subir Foto
      </button>
    </div>
  );
};

export default ProfilePhotoUpload;
