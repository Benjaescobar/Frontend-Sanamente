// components/Review.tsx
import React from "react";
import Image from "next/image";

const reviews = [
  {
    username: "Juliana Rodríguez",
    date: "2024-09-16",
    rating: 4,
    review:
      "Ana María es una profesional empática y cercana, que brinda un espacio seguro para comprender y trabajar las emociones, ofreciendo herramientas prácticas para el bienestar diario.",
  },
  {
    username: "Carlos Pérez",
    date: "2024-08-10",
    rating: 5,
    review:
      "Ana es una excelente profesional que siempre está dispuesto a escuchar y ofrecer soluciones prácticas.",
  },
  // Agrega más reseñas si es necesario
];

interface ReviewData {
  username: string;
  date: string;
  rating: number;
  review: string;
}

function ReviewCard({ reviewData }: { reviewData: ReviewData }) {
  const { username, date, rating, review } = reviewData;
  return (
    <div className="border border-gray-300 rounded-xl p-4 w-full max-w-md shadow-sm">
      <div className="flex items-start">
        <div className="mr-3">
          <Image
            src="/images/user-placeholder.png" // Ruta de la imagen del usuario
            alt="Usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{username}</p>
              <p className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={
                    i < rating
                      ? "text-yellow-400 text-lg"
                      : "text-gray-300 text-lg"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mt-2">{review}</p>
        </div>
      </div>
    </div>
  );
}

export default function Review() {
  return (
    <div className="flex gap-2 mt-4 ml-10">
      {reviews.map((review, index) => (
        <ReviewCard key={index} reviewData={review} />
      ))}
    </div>
  );
}
