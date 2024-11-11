"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, error } = useAuth0();

  // Redirige al usuario si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Cambia la ruta según tu preferencia, por ejemplo, a '/sanamente/feed'
      window.location.replace("/home");
    }
  }, [isAuthenticated]);

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
