"use client";

import { deleteComment, getAllComments } from "@/services/apiService";
import { useEffect, useState } from "react";
import { CommentProps } from "@/types/types";

export default function CommentsTable() {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    getAllComments().then((response) => 
      setComments(response)  
    )
  }, []);

  const handleDelete = (id: number, id_autor: number) => {
    deleteComment(id, id_autor).then((response) => 
      console.log(`comentario ${id} eliminado exitosamente.`)  
    ).catch((err) => 
      console.log('no se pudo eliminar el comentario.')  
    )
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Comentarios</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Autor ID</th>
            <th className="px-4 py-2 border-b">Contenido</th>
            <th className="px-4 py-2 border-b">Publicacion ID</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{comment.id}</td>
              <td className="px-4 py-2 border-b text-center">{comment.autor_id}</td>
              <td className="px-4 py-2 border-b text-center">{comment.contenido}</td>
              <td className="px-4 py-2 border-b text-center">{comment.publicacion_id}</td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(comment.id, comment.autor_id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {comments.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay usuarios para mostrar.
        </p>
      )}
    </div>
  );
}
