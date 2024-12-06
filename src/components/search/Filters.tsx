import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

const filters = [
  {
    id: "especialidad",
    name: "Áreas de especialidad",
    options: [
      { value: "ansiedad", label: "Ansiedad" },
      { value: "Terapia De Pareja", label: "Terapia De Pareja" },
      { value: "Depresión", label: "Depresión" },
      { value: "Terapia Familiar", label: "Terapia Familiar" },
      { value: "Psicoanálisis", label: "Psicoanálisis" },
    ],
  },
  {
    id: "experiencia",
    name: "Años de experiencia",
    options: [
      { value: "10", label: "10 Años" },
      { value: "5", label: "5 Años" },
      { value: "2", label: "2 Años" },
      { value: "1", label: "1 Año" },
    ],
  },
];

interface FiltersProps {
  especialidad: string;
  setEspecialidad: (value: string) => void;
  experiencia: string;
  setExperiencia: (value: string) => void;
}

export default function Filters({
  especialidad,
  setEspecialidad,
  experiencia,
  setExperiencia,
}: FiltersProps) {
  const handleSelection = (
    sectionId: string,
    optionValue: string,
    currentSelection: string,
    setSelection: (value: string) => void
  ) => {
    if (currentSelection === optionValue) {
      // Si la opción ya está seleccionada, la deseleccionamos
      setSelection("");
    } else {
      // De lo contrario, seleccionamos la nueva opción
      setSelection(optionValue);
    }
  };

  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
          <Disclosure.Button className="group flex w-full justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">{section.name}</span>
            <span className="ml-6 flex items-center">
              <PlusIcon aria-hidden="true" className="h-5 w-5 group-open:hidden" />
              <MinusIcon aria-hidden="true" className="h-5 w-5 hidden group-open:block" />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={
                      section.id === "especialidad"
                        ? especialidad === option.value
                        : experiencia === option.value
                    }
                    onChange={() =>
                      handleSelection(
                        section.id,
                        option.value,
                        section.id === "especialidad" ? especialidad : experiencia,
                        section.id === "especialidad" ? setEspecialidad : setExperiencia
                      )
                    }
                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </Disclosure>
      ))}
    </form>
  );
}
