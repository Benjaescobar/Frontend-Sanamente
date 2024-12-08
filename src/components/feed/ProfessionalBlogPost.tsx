// components/ProfessionalBlogPost.tsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { getComments, createComments } from '@/services/apiService';
import { CommentProps } from '@/types/types';

dayjs.extend(relativeTime);

interface ProfessionalBlogPostProps {
  id: number;
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

export default function ProfessionalBlogPost({
  id,
  contenido,
  createdAt,
  color,
  nombre,
  autorId,
  redirect
}: ProfessionalBlogPostProps) {

  const router = useRouter();
  const timeSincePost = dayjs(createdAt).fromNow();
  const [comments, setComments] = useState<CommentProps[]>([])

  useEffect(() => {
    try {
      getComments(id).then((result) => {
        setComments(result);
        console.log('result:', result);
      });
    } catch(error) {
      console.error('Error fetching comments.')
    }
  }, [id]);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //   try {
  //     const data = await getComments(id);
  //     setComments(data);
  //   } catch (error) {
  //     console.error("Error fetching Therapist:", error);
  //   }
  //   };

  //   fetchComments();
  // }, [id]);

  
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
        <div className='text-lg font-normal whitespace-pre-line'>{contenido}</div>
        <h1 className="text-xl font-semibold">Comentarios ({comments.length}):</h1>
        {comments.length === 0 && (<div className='font-light text-lg'>no hay comentarios aún. Sé el primero:</div>)}
        {comments.map((comment) => 
          <div className='font-medium text-xl'>{comment.contenido}</div>
        )}
        
          
    </div>
  );
}
