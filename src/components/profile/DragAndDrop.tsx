import React, { useState } from "react";

interface DragAndDropUploadProps {
  onUpload: (file: File) => void;
  progressVal: number;
}

const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({
  onUpload,
  progressVal,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onUpload(file); // Notificar al componente padre
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onUpload(file); // Notificar al componente padre
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`w-80 h-40 border-2 ${
          isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"
        } border-dashed rounded-lg flex items-center justify-center text-gray-600`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-center">
          {isDragging
            ? "Suelta el archivo aquí"
            : "Arrastra y suelta un archivo aquí o haz clic para seleccionar"}
        </p>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-4 py-2 bg-blue-800 text-white font-medium rounded-sm hover:bg-blue-700"
      >
        Elegir Archivo
      </label>
      <div className="h-2 my-4 w-40 overflow-hidden rounded border">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${progressVal}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DragAndDropUpload;
