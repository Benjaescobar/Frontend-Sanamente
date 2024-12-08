import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { getComments, createComments, getUserPhoto } from '@/services/apiService';
import { CommentProps } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

dayjs.extend(relativeTime);

interface ProfessionalBlogPostProps {
  id: number;
  contenido: string;
  createdAt: string;
  color: string;
  nombre: string;
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
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [authorPhoto, setAuthorPhoto] = useState<string>('images/default-profile.jpg');
  const [showComments, setShowComments] = useState(false);

  const router = useRouter();
  const timeSincePost = dayjs(createdAt).fromNow();

  useEffect(() => {
    const fetchAuthorPhoto = async () => {
      const photo = await getUserPhoto(autorId);
      console.log(photo);
      setAuthorPhoto(photo || 'images/default-profile.jpg');
    };

    fetchAuthorPhoto();
  }, [autorId]);

  useEffect(() => {
    try {
      getComments(id).then((result) => {
        setComments(result);
      });
    } catch (error) {
      console.error('Error fetching comments.');
      console.log(error);
    }
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const contenido = formData.get('contenido') as string;
    const userId = localStorage.getItem('id');

    try {
      await createComments(id, userId, contenido);
      setComments((prevComments) => [
        ...prevComments,
        { id: Date.now(), contenido, usuario: { nombre: 'Tú' } } as CommentProps,
      ]);
      form.reset();
    } catch (error) {
      alert('Ha habido un error al crear tu comentario. Asegúrate de iniciar sesión antes de comentar.');
      console.log(error);
    }
  };

  const toggleComments = () => setShowComments(!showComments);

  return (
    <div className={`flex flex-col justify-around space-y-3 px-8 py-4 pb-10 m-5 rounded-xl ${color}`}>
      <div className="flex items-center space-x-3">
        <img
          src={authorPhoto}
          alt="Foto del autor"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          {redirect ? (
            <h1
              className="text-red-500 text-2xl font-bold cursor-pointer"
              onClick={() => router.push(`profile/${autorId}`)}
            >
              {nombre}
            </h1>
          ) : (
            <h1 className="text-red-500 text-2xl font-bold">{nombre}</h1>
          )}
          <p className='font-light text-sm text-gray-400' >{timeSincePost}</p>
        </div>
      </div>
      <div className="text-lg font-normal whitespace-pre-line">{contenido}</div>
      <button
        onClick={toggleComments}
        className="flex items-center justify-between w-fit text-lg"
      >
        <FontAwesomeIcon icon={faComment} size="lg" className='text-gray-600 font-light'/>
        <span className='text-gray-600 font-light text-md'>({comments.length})</span>
      </button>
      {showComments && (
        <div className="flex flex-col px-5 space-y-4">
          {comments.length === 0 && (
            <div className="font-light text-sm">
              <i>No hay comentarios aún. Sé el primero:</i>
            </div>
          )}
          {comments.map((comment, index) => (
            <div key={comment.id || index} className="flex items-start space-x-3">
              <img
                src={comment.usuario.foto || 'images/default-profile.jpg'}
                alt="Foto del usuario"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h3 className="font-regular text-base">{comment.usuario?.nombre || 'Anónimo:'}</h3>
                <p className="font-light text-sm">{comment.contenido}</p>
              </div>
            </div>
          ))}
          <form
            method="post"
            onSubmit={handleCommentSubmit}
            className="flex flex-row items-center space-x-3"
          >
            <textarea
              name="contenido"
              className="text-sm font-light rounded-xl border-gray-300 p-2 pb-4 w-[85%] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              placeholder="Escribe un comentario..."
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
            >
              Publicar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
