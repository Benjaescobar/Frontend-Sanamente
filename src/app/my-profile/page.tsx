// app/my-profile/page.tsx
"use client"
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import UserProfile from "@/components/profile/UserProfile";  // Asegúrate de que la ruta sea correcta

const MyProfile = () => {
  const { user } = useAuth0();  // Obtener datos del usuario
  const [role, setRole] = useState<string | null>(null);
  const [authStatus, setAuthStatus] =  useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('email')) {
      setAuthStatus(true);
      const fetchUserRole = async () => {
        const sub = (localStorage.getItem('sub'));
        const userRole = sub ? await getUserRole(sub) : null;
        setRole(userRole);
      };

      fetchUserRole();
    } else {
      router.push("/auth/login");  // Si no está autenticado, redirige al login
    }
  }, [authStatus, user, router]);

  // Simulación de función para obtener el rol del usuario desde una API o base de datos
  const getUserRole = async (userId: string) => {
    // Llamada a la API o lógica para obtener el rol
    return userId === "psicologoId" ? "psicologo" : "paciente"; // Aquí deberías usar tu lógica real
  };

  return (
    <div>
      {role === null ? (
        <p>Cargando...</p>  // Mientras no se haya obtenido el rol
      ) : role === "psicologo" ? (
        <h1>Hola Psicologo</h1>
      ) : (
        <UserProfile />  // Renderizar UserProfile si el rol es "paciente"
      )}
    </div>
  );
};

export default MyProfile;
