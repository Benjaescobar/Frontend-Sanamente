// components/Review.tsx
import React from "react";
import Image from "next/image";

interface ReviewData {
  autor_nombre: string;
  createdAt: string;
  puntuacion: number;
  comentario: string;
}

function ReviewCard({ reviewData }: { reviewData: ReviewData }) {
  const { autor_nombre, createdAt, puntuacion, comentario } = reviewData;
  return (
    <div className="border border-gray-300 rounded-xl p-4 w-full max-w-md shadow-sm">
      <div className="flex items-start">
        <div className="mr-3">
          <Image
            src="/images/default-profile.jpg" // Ruta de la imagen del usuario
            alt="Usuario"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{autor_nombre}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < puntuacion
                          ? "text-yellow-400 text-lg"
                          : "text-gray-300 text-lg"
                      }
                    >
                      ★
                    </span>
                  ))}
              </div>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            
          </div>
          <p className="text-gray-700 mt-2">{comentario}</p>
        </div>
      </div>
    </div>
  );
}

// export default function Review() {
//   return (
//     <div className="flex gap-2 mt-4 ml-10">
//       {reviews.map((review, index) => (
//         <ReviewCard key={index} reviewData={review} />
//       ))}
//     </div>
//   );
// }
export default ReviewCard;