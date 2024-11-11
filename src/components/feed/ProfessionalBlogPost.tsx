// components/ProfessionalBlogPost.tsx
import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ProfessionalBlogPostProps {
  contenido: string;
  createdAt: string;
  content: string;
  nombre: string;
  imageUrl: string;
  timeSincePost: string;
  color: string;
}

export default function ProfessionalBlogPost({
  contenido,
  createdAt,
  color,
  nombre
}: ProfessionalBlogPostProps) {

  const timeSincePost = dayjs(createdAt).fromNow();

  return (
    <div className={'flex flex-col justify-around space-y-3 px-8 py-4 pb-10 m-5 rounded-xl ' + color}>
        <div className='flex space-x-1'>
            {/* <Image 
                src={imageUrl} 
                alt={name} 
                width={70} // Puedes ajustar el ancho (en píxeles) según tus necesidades
                height={70} // Puedes ajustar la altura (en píxeles) según tus necesidades
                className="rounded-full mr-4 object-cover"
                /> */}
            <div className='flex flex-col justify-center space-y-2'>
                <h1 className='text-red-500 text-2xl font-bold'>{nombre}</h1>
                <span className='font-light text-xs'>{timeSincePost}</span>
            </div>
        </div>
        {/* <div>{title}</div> */}
        <div className='text-lg font-normal whitespace-pre-line'>{contenido}</div>
    </div>
  );
}
