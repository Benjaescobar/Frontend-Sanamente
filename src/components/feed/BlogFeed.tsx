// components/BlogFeed.tsx
import React from 'react';
import ProfessionalBlogPost from './ProfessionalBlogPost';

const posts = [
  {
    name: 'Ana María Pereira López',
    timeSincePost: 'Hace 2 horas',
    title: 'La Paciencia en el Proceso Terapéutico',
    content: `A veces, las personas esperan soluciones rápidas en terapia, pero es mucho más que \"arreglar\" algo roto. Es un espacio para descubrirnos, entender nuestros patrones y crecer ☘️.

    Como psicóloga, acompaño a mis pacientes a encontrar sus propias respuestas 🔍. Las preguntas en terapia generan reflexión y, con el tiempo, cambios profundos 💭.

    La vulnerabilidad es clave para sanar 🖤🩹. El éxito no es la ausencia de problemas, sino aprender a enfrentarlos con resiliencia. El cambio toma tiempo, pero es profundo y real ⏳.`,
    imageUrl: "/images/foto.png",
  },
  {
    name: 'Sergio Saavedra Zúñiga',
    timeSincePost: 'Hace 1 día',
    title: 'Cómo Construir Límites Saludables en Nuestras Relaciones',
    content: 'Uno de los temas que más abordo en consulta es la importancia de establecer límites claros en nuestras relaciones. Muchas veces, las personas se sienten culpables o incómodas al decir \'no\', \
    ya sea por miedo al rechazo o a la confrontación. Sin embargo, los límites son esenciales para mantener relaciones salas y equilibradas ⚖️.',
    imageUrl: '/images/sergio.png',
  },
];

export default function BlogFeed() {

  const colorClass : string[] = ["bg-celeste", "bg-amarillo"]

  return (
    <div className="min-w-3/4">
      {posts.map((post, index) => (
        <ProfessionalBlogPost key={index} color={colorClass[index % 2]} {...post} />
      ))}
    </div>
  );
}