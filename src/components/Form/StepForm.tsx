"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { createPsychologist } from "@/services/apiService";
import { useRouter } from "next/navigation";

const StepForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [id, setID] = useState<string>("");
  const [experiencia, setExperiencia] = useState<string>("");
  const [calendly, setCalendly] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const specialtiesOptions = [
    "Terapia cognitivo-conductual",
    "Psicoanálisis",
    "Terapia familiar",
    "Terapia de pareja",
    "Psicología infantil",
  ];

  useEffect(() => {
    const i = localStorage.getItem("id");
    setID(i ? i : "");
    const e = localStorage.getItem("email");
    setEmail(e ? e : "");
    const n = localStorage.getItem("name");
    setNombre(n ? n : "");
  }, []);

  const handleSpecialtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedSpecialties.includes(value)) {
      setSelectedSpecialties((prev) => [...prev, value]);
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) => prev.filter((item) => item !== specialty));
  };

  const handleSubmit = () => {
    const jsonData = {
      usuario_id: Number(id),
      url_calendly: `https://calendly.com/${calendly}`,
      especialidades: selectedSpecialties.join(", "),
      experiencia: Number(experiencia),
      descripcion,
      ubicacion,
      precio_min: Number(minPrice),
      precio_max: Number(maxPrice),
    };

    // console.log(jsonData); // JSON listo para POST
    createPsychologist(jsonData);
    localStorage.setItem("psicologo", "1");
    router.push("/");
  };

  const nextStep = () => {
    // Validación antes de avanzar
    if (step === 1) {
      if (!email || !nombre) {
        alert("El nombre y correo son obligatorios.");
        return;
      }
    } else if (step === 2) {
      if (
        !selectedSpecialties.length ||
        !experiencia ||
        !minPrice ||
        !maxPrice
      ) {
        alert("Por favor completa todos los campos requeridos en este paso.");
        return;
      }
    } else if (step === 3) {
      if (!descripcion || !calendly || !ubicacion) {
        alert("Por favor completa todos los campos requeridos en este paso.");
        return;
      }
    }

    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-celeste dark:bg-gray-800">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 dark:bg-gray-900">
        {/* Barra de progreso */}
        <div className="flex flex-col items-center w-full">
          {/* Contenedor de los pasos */}
          <div className="relative flex items-center justify-between w-[95%] mb-6">
            {[1, 2, 3, 4].map((num, index) => (
              <React.Fragment key={num}>
                {/* Contenedor del círculo y etiqueta */}
                <div className="relative flex items-center flex-col">
                  {/* Número circular */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step >= num
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                    style={{
                      fontWeight: "normal",
                      zIndex: 10, // Círculos siempre encima
                    }}
                  >
                    {num}
                  </div>
                  {/* Línea entre círculos */}
                  {index < 3 && (
                    <div
                      className="absolute top-5 left-[50%] right-[-50%] h-1 bg-gray-300"
                      style={{
                        width: "185px", // Asegura que todas las líneas tengan el mismo tamaño
                        backgroundColor:
                          step > num
                            ? "rgb(239, 68, 68)"
                            : "rgb(209, 213, 219)", // Color dinámico
                        zIndex: 5, // Línea detrás de los círculos
                        height: "4px", // Grosor uniforme
                        transition: "background-color 0.3s ease", // Transición suave
                      }}
                    ></div>
                  )}
                  {/* Etiqueta debajo del círculo */}
                  <span
                    className={`text-center mt-6 ${
                      step >= num ? "text-red-500" : "text-gray-400"
                    }`}
                    style={{ transform: "translateY(-20px)" }} // Esto sube el texto 20px hacia arriba
                  >
                    {
                      [
                        <>
                          Información <br /> Personal
                        </>,
                        <>
                          Información <br /> Profesional
                        </>,
                        <>
                          Descripción y <br /> Ubicación
                        </>,
                        <>
                          Revisión y <br /> Confirmación
                        </>,
                      ][index]
                    }
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Contenido del formulario */}
        {step === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              🪪 Información Personal
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Nombre Completo
              </label>
              <input
                type="text"
                value={nombre}
                disabled
                placeholder="Este es tu nombre completo registrado"
                className="block w-full rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light p-2.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Email
              </label>
              <input
                type="text"
                value={email}
                disabled
                placeholder="Este es tu correo registrado"
                className="block w-full rounded-md placeholder-blue-300 placeholder:font-light border-blue-300 p-2.5"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              🧠 Información Profesional
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Especialidades
              </label>
              <select
                className="block w-full rounded-md border-blue-300 p-2.5"
                onChange={handleSpecialtyChange}
              >
                <option value="">Seleccione una especialidad</option>
                {specialtiesOptions.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                {selectedSpecialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-light text-blue-700 mr-2"
                  >
                    {specialty}
                    <button
                      onClick={() => removeSpecialty(specialty)}
                      className="ml-2 text-blue-500"
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Años de Experiencia
              </label>
              <input
                type="text"
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                placeholder="Ejemplo: 5 años"
                className="block w-full rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light p-2.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-400 dark:text-white">
                  Precio Mínimo
                </label>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Ejemplo: 20000"
                  className="block w-full rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-400 dark:text-white">
                  Precio Máximo
                </label>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Ejemplo: 100000"
                  className="block w-full rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light p-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              📄 Descripción y Ubicación
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe brevemente tus servicios"
                className="block w-full rounded-md rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light  p-2.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Usuario de Calendly
              </label>
              <input
                type="text"
                value={calendly}
                onChange={(e) => setCalendly(e.target.value)}
                placeholder="Ejemplo: CarlosFernandez"
                className="block w-full rounded-md rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light  p-2.5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 dark:text-white">
                Ubicación
              </label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Ciudad o región donde trabajas"
                className="block w-full rounded-md rounded-md border-blue-300 placeholder-blue-300 placeholder:font-light  p-2.5"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              👤 Resumen de Información
            </h3>
            <p>
              <strong>Nombre:</strong> {nombre}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Especialidades:</strong> {selectedSpecialties.join(", ")}
            </p>
            <p>
              <strong>Años de Experiencia:</strong> {experiencia}
            </p>
            <p>
              <strong>Precio Mínimo:</strong> {minPrice}
            </p>
            <p>
              <strong>Precio Máximo:</strong> {maxPrice}
            </p>
            <p>
              <strong>Descripción:</strong> {descripcion}
            </p>
            <p>
              <strong>URL de Calendly:</strong> {calendly}
            </p>
            <p>
              <strong>Ubicación:</strong> {ubicacion}
            </p>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-gray-500 text-white"
            >
              Anterior
            </button>
          ) : (
            <button
              onClick={prevStep}
              className="px-4 py-2 rounded-md bg-gray-200 text-white"
              disabled
            >
              Anterior
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 rounded-md bg-blue-600 text-white"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md bg-green-600 text-white"
            >
              Enviar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepForm;
