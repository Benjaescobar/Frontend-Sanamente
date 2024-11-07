// components/ProfessionalBlogPost.tsx
import React from 'react';
import Image from 'next/image';

interface ProfessionalBlogPostProps {
  name: string;
  title: string;
  content: string;
  imageUrl: string;
  timeSincePost: string;
  color: string;
}

export default function ProfessionalBlogPost({
  name,
  timeSincePost,
  title,
  content,
  imageUrl,
  color,
}: ProfessionalBlogPostProps) {

  return (
    <div className={'flex flex-col justify-around space-y-3 px-8 py-4 pb-10 m-5 rounded-xl ' + color}>
        <div className='flex space-x-1'>
            <Image 
                src={imageUrl} 
                alt={name} 
                width={70} // Puedes ajustar el ancho (en píxeles) según tus necesidades
                height={70} // Puedes ajustar la altura (en píxeles) según tus necesidades
                className="rounded-full mr-4 object-cover"
                />
            <div className='flex flex-col justify-center space-y-2'>
                <h1 className='text-red-500 text-2xl font-bold'>{name}</h1>
                <span className='font-light text-xs'>{timeSincePost}</span>
            </div>
        </div>
        <div>{title}</div>
        <div className='text-lg font-normal whitespace-pre-line'>{content}</div>
    </div>
  );
}
