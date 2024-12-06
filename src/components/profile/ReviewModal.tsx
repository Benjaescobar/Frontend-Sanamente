// components/ReviewModal.tsx
import React from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  rating: number;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  rating,
  setRating,
  comment,
  setComment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl text-gray-600 font-bold mb-4">Dejar valoración</h2>
        <p className="text-m text-gray-500 font-regular mb-4">
          Tu opinión es muy importante para seguir mejorando nuestro servicio y darle feedback a nuestros psicólogos.
        </p>
        <label className="block text-sm font-medium mb-2 text-gray-600">Calificación:</label>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
        <label className="block text-sm text-gray-600 font-medium mb-2">Comentario:</label>
        <textarea
          className="w-full border rounded-lg p-2 mb-4"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => onSubmit(rating, comment)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
