"use client"
import NavBar from "../components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';
import useApi from '../hooks/useApi';

export default function Home() {
  const [fetchData, setFetchData] = useState(false); // Estado para controlar la solicitud de datos
  const { data, loading, error } = useApi(fetchData); // Pasamos el estado como dependencia

  // Función para activar la solicitud de datos
  const handleFetchData = () => {
    setFetchData(true); // Al presionar el botón, habilitamos la solicitud de la API
  };

  return (
    <div>
      <NavBar /> {/* Barra de navegación */}
      <div className="flex justify-center items-center w-screen h-[80vh]">
        <div className="flex justify-between p-10 w-4/5">
          <div className="w-2/3">
            <p className="mx-4 border rounded-xl px-3 py-1 text-white bg-red-500 inline-flex">Tu match perfecto 🧩</p>
            <h1 className="mx-4 mt-4 text-4xl font-bold text-gray-800">
              Tu bienestar es nuestro propósito: <br />
              Encuentra al profesional adecuado <span className="text-red-500">para ti.</span>
            </h1>
            <div className="mt-6 space-y-3">
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">Agenda fácilmente 🗓️</p>
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">Selecciona tus necesidades 👤</p>
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">Precios a tu medida 💰</p>
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">Consultas a tu manera 💻</p>
            </div>
            <Link href="" className="inline-flex mt-10 rounded-xl px-3 py-1 text-[#213554] bg-blue-200 hover:bg-blue-300">
              Regístrate
              <FiArrowRight className="m-1" /> {/* Icono de flecha */}
            </Link>
          </div>
          <div className="w-1/3 flex justify-center items-center h-80">
            <Image 
              src="/cerebro.png"  // Ruta desde la carpeta `public`
              alt="Imagen de un cerebro"  // Texto alternativo
              width={200}                // Ajusta el ancho según sea necesario
              height={200}               // Ajusta la altura según sea necesario
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
      {/* Botón para hacer la solicitud a la API */}
      {/* Botón para hacer la solicitud a la API */}
      <button 
              onClick={handleFetchData} 
              className="inline-flex mt-4 rounded-xl px-3 py-1 text-white bg-green-500 hover:bg-green-600"
            >
              Obtener Datos de la API
            </button>

            {/* Mostrar el estado de carga, error o los datos */}
            {loading && <p className="mt-4">Cargando datos...</p>}
            {error && <p className="mt-4 text-red-500">{error.message}</p>}
            {data && (
              <div className="mt-4 bg-gray-100 p-4 rounded-xl">
                <h3 className="font-bold">Datos obtenidos:</h3>
                <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
      </div>
    </div>
  );
}
