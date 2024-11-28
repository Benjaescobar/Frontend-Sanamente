"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, user, getIdTokenClaims, error } = useAuth0();

  useEffect(() => {
    const saveUser = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
              auth0Id: user.sub, // ID único de Auth0
              name: user.name,
              email: user.email,
            }),
          });

          if (!response.ok) {
            console.error("Error al guardar el usuario en el backend:", await response.text());
          }
        } catch (error) {
          console.error("Error durante el guardado del usuario:", error);
        }
      }
    };

    saveUser();
  }, [isAuthenticated, user, getIdTokenClaims]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (err) {
      console.error("Error durante el inicio de sesión:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        {error && <p className="text-red-600 text-sm">Error: {error.message}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Iniciar Sesión con Auth0
        </button>
      </div>
    </div>
  );
}
