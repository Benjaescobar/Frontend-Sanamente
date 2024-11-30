"use client"
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/profile/Content";
import { InlineWidget } from "react-calendly";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "next/navigation";
import { getTherapistById } from "@/services/apiService";
import ReviewCard from "@/components/profile/Review";
import ProfessionalBlogPost from "@/components/feed/ProfessionalBlogPost";
import { TherapistData } from "@/types/types";

export default function PsychologistProfile() {
  const params = useParams();
  const { id } = params;

  const [therapistData, setTherapistData] = useState<TherapistData | null>(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      if (typeof id !== "string") {
        console.error("Invalid ID format");
        return;
      }
  
      try {
        const data = await getTherapistById(id);
        setTherapistData(data);
      } catch (error) {
        console.error("Error fetching Therapist:", error);
      }
    };

    fetchTherapist();
  }, [id]);

  const colorClass : string[] = ["bg-celeste", "bg-amarillo"]

  if (!therapistData) {
    return <div>Loading...</div>;
  }

  const { therapist, valoraciones_recibidas, publicaciones } = therapistData;

  console.log("therapist");
  console.log(therapist);

  return (
    <div>
      <NavBar />
      <div className="flex pt-10 px-4 space-x-4">
        <div className="flex-1">
          <Content {...therapist}/>
          <div className="flex gap-2 mt-4 ml-10">
          {valoraciones_recibidas.map((review, key: React.Key | null | undefined) => (
            <ReviewCard key={key} reviewData={review}/>
          ))}
          </div>
          <h1 className="text-xl font-bold mb-4 ml-10 mt-5">
            Publicaciones de {therapist.nombre}
          </h1>
          <div className="min-w-3/4">
            {publicaciones.map((post, index) => (
              <ProfessionalBlogPost
                content={""} nombre={therapist.nombre} imageUrl={therapist.nombre === "Juan" ? "/images/foto.png" : "/images/foto.png"} timeSincePost={""} key={index}
                color={colorClass[index % 2]}
                {...post}              />
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 w-1/3">
          <h1 className="text-xl font-bold mb-4">Schedule an Appointment</h1>
          <InlineWidget url={therapist.nombre === "Juan" ? "https://calendly.com/eaesquivel-uc" : "https://calendly.com/super-edu-bkn1"} />
        </div>
      </div>
    </div>
  );
}
