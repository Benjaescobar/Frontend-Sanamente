// components/ProfessionalBlogPost.tsx
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);

interface SimplerProfessionalBlogPostProps {
  contenido: string;
  createdAt: string;
  content: string;
  nombre: string;
  imageUrl: string;
  timeSincePost: string;
  color: string;
  autorId: string;
  redirect: boolean;
}

export default function SimplerProfessionalBlogPost({
  contenido,
  createdAt,
  color,
  nombre,
  autorId,
  redirect
}: SimplerProfessionalBlogPostProps) {

  const router = useRouter();
  const timeSincePost = dayjs(createdAt).fromNow();

  return (
    <div className={'flex flex-col justify-around space-y-3 px-8 py-4 pb-10 m-5 rounded-xl ' + color}>
        <div className='flex space-x-1'>
            <div className='flex flex-col justify-center space-y-2'>
              {redirect ? 
                (<h1 className='text-red-500 text-2xl font-bold cursor-pointer' onClick={() => {router.push(`profile/${autorId}`)}}>{nombre}</h1>) 
                : (
                <h1 className='text-red-500 text-2xl font-bold'>{nombre}</h1>
                )}
                <span className='font-light text-xs'>{timeSincePost}</span>
            </div>
        </div>
        {/* <div>{title}</div> */}
        <div className='text-lg font-normal whitespace-pre-line'>{contenido}</div>
    </div>
  );
}