import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  const pathname = usePathname(); // Obtener la ruta actual
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(isAuthenticated);

  useEffect(() => {
    setAuthStatus(isAuthenticated); // Actualiza el estado cada vez que isAuthenticated cambie
  }, [isAuthenticated]);

  // Función para determinar si una ruta está activa
  const isActive = (route: string) => pathname === route;

  // Función de manejo para redirigir a /my-profile
  const handleProfileClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
    router.push("/my-profile"); // Redirige a la nueva ruta
  };

  return (
    <nav className="flex justify-between p-5 bg-[#E7F0FF] items-center">
      {/* Sección izquierda: Mostrar cuando el usuario esté autenticado */}
      {authStatus && (
        <div className="flex items-center space-x-4">
          <Link href="/home" className="text-xl font-bold text-[#213554]">
            <span className="text-[#213554]">SANA </span>
            <span className="text-red-500">MENTE</span>
          </Link>
          <Link
            href="/search"
            className={`px-3 py-1 text-gray-700 rounded-md ${
              isActive("/search") ? "bg-red-500 text-white hover:bg-red-400" : ""
            }`}
          >
            Buscar profesional
          </Link>
          <Link
            href="/feed"
            className={`px-3 py-1 text-gray-700 rounded-md ${
              isActive("/feed") ? "bg-red-500 text-white hover:bg-red-400" : ""
            }`}
          >
            Feed Posts
          </Link>
          {/* <Link
            href="/grupos-apoyo"
            className={`px-3 py-1 text-gray-700 rounded-md ${
              isActive("/grupos-apoyo") ? "bg-red-500 text-white hover:bg-red-400" : ""
            }`}
          >
            Grupos de apoyo
          </Link> */}
        </div>
      )}

      {/* Sección derecha */}
      <div className="flex items-center">
        <Link href="" className="mx-4 rounded-xl px-3 py-1 text-gray-700">
          Contacto
        </Link>
        {authStatus ? (
          <a
            href="my-profile"
            onClick={handleProfileClick} // Llama a la función de redirección
            className="mx-4 flex items-center space-x-2"
          >
            {/* Ícono de perfil */}
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="text-gray-700"
            />
            <span className="text-gray-700">Perfil</span>
          </a>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="mx-4 rounded-xl px-3 py-1 text-[#213554] bg-blue-200 hover:bg-blue-300"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/soy-profesional"
              className="mx-4 rounded-xl px-3 py-1 text-white bg-red-500 hover:bg-red-400"
            >
              Soy profesional
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
