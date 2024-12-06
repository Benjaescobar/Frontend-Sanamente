"use client";
import NavBar from "../components/navbar/NavBar";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div>
      <NavBar /> {/* Barra de navegación */}
      <div className="flex justify-center items-center w-screen h-[80vh]">
        <div className="flex justify-between p-10 w-4/5">
          <div className="w-2/3">
            <p className="mx-4 border rounded-xl px-3 py-1 text-white bg-red-500 inline-flex">
              Tu match perfecto 🧩
            </p>
            <h1 className="mx-4 mt-4 text-4xl font-bold text-gray-800">
              Tu bienestar es nuestro propósito: <br />
              Encuentra al profesional adecuado{" "}
              <span className="text-red-500">para ti.</span>
            </h1>
            <div className="mt-6 space-y-3">
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">
                Agenda fácilmente 🗓️
              </p>
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">
                Selecciona tus necesidades 👤
              </p>
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">
                Precios a tu medida 💰
              </p>
              <p className="border border-red-500 rounded-xl mx-3 p-2 py-2 text-red-500 inline-flex">
                Consultas a tu manera 💻
              </p>
            </div>
            <Link
              href=""
              className="inline-flex mt-10 ml-5 rounded-xl px-3 py-1 text-[#213554] bg-blue-200 hover:bg-blue-300"
            >
              Regístrate
              <FiArrowRight className="m-1" /> {/* Icono de flecha */}
            </Link>
          </div>
          <div className="w-1/3 flex justify-center items-center h-80">
            <Image
              src="/cerebro.png" // Ruta desde la carpeta `public`
              alt="Imagen de un cerebro" // Texto alternativo
              width={200} // Ajusta el ancho según sea necesario
              height={200} // Ajusta la altura según sea necesario
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center"></div>
    </div>
  );
}
