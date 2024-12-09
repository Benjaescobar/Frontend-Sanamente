"use client";

import { deleteUsers, getUsers } from "@/services/adminService";
import { useEffect, useState } from "react";

interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  tipo: string;
  foto: string | null;
  is_deleted: boolean;
  createdAt: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    deleteUsers(userId);
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Usuarios</h1>
      <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Tipo</th>
            <th className="px-4 py-2 border-b">Fecha de Creación</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-center">{user.id}</td>
              <td className="px-4 py-2 border-b">{user.nombre}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.tipo}</td>
              <td className="px-4 py-2 border-b">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay usuarios para mostrar.
        </p>
      )}
    </div>
  );
}
