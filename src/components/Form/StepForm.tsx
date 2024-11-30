"use client"
import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const StepForm = () => {
  const [step, setStep] = useState(1); // Estado para el paso actual

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };


  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const specialtiesOptions = [
    "Terapia cognitivo-conductual",
    "Psicoanálisis",
    "Terapia familiar",
    "Terapia de pareja",
    "Psicología infantil",
  ];

  const handleSpecialtyChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    if (!selectedSpecialties.includes(value)) {
      setSelectedSpecialties((prev) => [...prev, value]);
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.filter((item) => item !== specialty)
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 dark:bg-gray-900">
        {/* Step Progress Bar */}
        <div className="flex justify-center w-full items-center">
          <ol className="flex items-center justify-center w-full mb-6">
            <li
              className={`flex w-full items-center ${
                step >= 1
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-400 dark:text-gray-500"
              } after:content-[''] after:w-full after:h-1 after:border-b ${
                step >= 2
                  ? "after:border-blue-100 dark:after:border-blue-800"
                  : "after:border-gray-100 dark:after:border-gray-700"
              } after:border-4 after:inline-block`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 ${
                  step >= 1
                    ? "bg-blue-100 dark:bg-blue-800"
                    : "bg-gray-100 dark:bg-gray-700"
                } rounded-full lg:h-12 lg:w-12 shrink-0`}
              >
                <span
                  className={`text-sm font-medium ${
                    step >= 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  1
                </span>
              </div>
            </li>
            <li
              className={`flex w-full items-center ${
                step >= 2
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-400 dark:text-gray-500"
              } after:content-[''] after:w-full after:h-1 after:border-b ${
                step >= 3
                  ? "after:border-blue-100 dark:after:border-blue-800"
                  : "after:border-gray-100 dark:after:border-gray-700"
              } after:border-4 after:inline-block`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 ${
                  step >= 2
                    ? "bg-blue-100 dark:bg-blue-800"
                    : "bg-gray-100 dark:bg-gray-700"
                } rounded-full lg:h-12 lg:w-12 shrink-0`}
              >
                <span
                  className={`text-sm font-medium ${
                    step >= 2 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  2
                </span>
              </div>
            </li>
            <li
              className={`flex items-center ${
                step >= 3
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 ${
                  step >= 3
                    ? "bg-blue-100 dark:bg-blue-800"
                    : "bg-gray-100 dark:bg-gray-700"
                } rounded-full lg:h-12 lg:w-12 shrink-0`}
              >
                <span
                  className={`text-sm font-medium ${
                    step >= 3 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  3
                </span>
              </div>
            </li>
          </ol>
        </div>

        {/* Dynamic Form Content */}
        {step === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Información personal
            </h3>
            <div className="grid gap-4 mb-6">
              <div>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Apellido"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rut"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="rut"
                  className="border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="00.000.000-0"
                  required
                />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Información profesional
          </h3>
          <div className="grid gap-4 mb-6">
            <div>
              <label
                htmlFor="especialidades"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Especialidades
              </label>
              <select
                id="especialidades"
                className="border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                onChange={handleSpecialtyChange}
              >
                <option value="">Selecciona una especialidad</option>
                {specialtiesOptions.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="selectedSpecialties"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Especialidades seleccionadas
              </label>
              <div
                id="selectedSpecialties"
                className=""
              >
                {selectedSpecialties.length > 0 ? (
                  selectedSpecialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="border border-red-500 rounded-xl mx-3 my-1 p-2 py-2 text-red-500 inline-flex"
                    >
                      {specialty}
                      <button
                        className="ml-2 text-red-600"
                        onClick={() => removeSpecialty(specialty)}
                        >
                        <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No hay especialidades seleccionadas</span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="especialidades"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Años de experiencia
              </label>
              <select
                id="años"
                className="border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              >
                <option value="">Años de experiencia</option>
                <option value="0">
                    0 Años
                </option>
                <option value="1">
                    1 Año
                </option>
                <option value="2">
                    2 Años
                </option>
                <option value="3">
                    Más de 3 Años
                </option>
                <option value="5">
                    Más de 5 Años
                </option>
                <option value="10">
                    Más de 10 Años
                </option>
              </select>
            </div>
          </div>
        </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Professional Info
            </h3>
            <div className="grid gap-4 mb-6">
                <div>
                <label
                  htmlFor="calendly"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Url de calendly
                </label>
                <input
                  type="text"
                  id="calendly"
                  className="border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="calendly/sdfasdf"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Previous Step
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepForm;
