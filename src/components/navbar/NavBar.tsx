import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail } from "@/services/apiService";

export default function NavBar() {
  const { logout, isAuthenticated, user } = useAuth0();

  const pathname = usePathname(); // Obtener la ruta actual
  const [authStatus, setAuthStatus] = useState(isAuthenticated);
  const [psicologoBool, setPscologoBool] = useState<boolean>(false)

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Usamos un ref para identificar el dropdown


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  }

  useEffect(() => {
    setAuthStatus(isAuthenticated); // Actualiza el estado cada vez que isAuthenticated cambie
    if (user) {
      // Usa valores predeterminados si alguna propiedad es undefined
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('name', user.name || '');
      localStorage.setItem('sub', user.sub || '');
      localStorage.setItem('picture', user.picture || '');
      const saveUser = async () => {
        if (isAuthenticated && user) {
          console.log(user);
          try {
            const response = await fetch("https://backend-sanamente-d7ej.onrender.com/usuarios/crear", {
              method: "POST",
              headers: {
                "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                nombre: user.name,
                email: user.email,
              }),
            });
            if (!response.ok) {
              const text = await response.text();
              const data = JSON.parse(text);
              if (data.error === "Email ya registrado."){
                const userData = await getUserByEmail(user.email ? user.email : "");
                localStorage.setItem("id", userData.id);
                console.log(userData);
                localStorage.setItem("tipo", userData.tipo);
              }else{
                console.error("Error al guardar el usuario en el backend:", data.error);
              }
            }
          } catch (error) {
            console.error("Error durante el guardado del usuario:", error);
          }
        }
      };
  
      saveUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(localStorage.getItem('email')){
      const picture = localStorage.getItem("picture");
      if (picture) {
        setProfilePicture(picture); // Establece la imagen si existe
      }
      setAuthStatus(true);
    }else{
      setAuthStatus(false);
    }
    const tipo = localStorage.getItem("tipo");
      if (tipo === "psicologo") {
        setPscologoBool(true);
      } else{
        setPscologoBool(false);
      }
  })

  // Función para determinar si una ruta está activa
  const isActive = (route: string) => pathname === route;

  const handleOutsideClick = (event: { target: any; }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Cierra el dropdown si el clic ocurre fuera de él
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
        </div>
      )}

      {/* Sección derecha */}
      <div className="flex items-center">
        <Link href="" className="mx-4 rounded-xl px-3 py-1 text-gray-700">
          Contacto
        </Link>
        {authStatus ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="mx-4 flex items-center space-x-2"
          >
            {profilePicture ? (
              <Image
                src={profilePicture}
                width={40}
                height={40}
                alt="Foto de perfil"
                className="rounded-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className="text-gray-700"
              />
            )}
            <span className="text-gray-700">Perfil</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <a
                href="my-profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Ver perfil
              </a>
              {!psicologoBool && (<a
                href="/auth/pro-signup"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Inscribirme como profesional
              </a>)}
              
              <hr className="border-gray-200" />
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
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
