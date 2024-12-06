import React, { useState } from "react";

interface HeaderProps {
  lugar: string;
  setLugar: (value: string) => void;
  precioMin: string;
  setPrecioMin: (value: string) => void;
  precioMax: string;
  setPrecioMax: (value: string) => void;
}

const comunas = [
  "Temuco, Chile",
  "Valparaíso, Chile",
  "Santiago",
];

export default function Header({
  lugar,
  setLugar,
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax,
}: HeaderProps) {
  const [filteredComunas, setFilteredComunas] = useState(comunas);
  const [isFocused, setIsFocused] = useState(false);

  const handleComunaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLugar(value);

    const filtered = comunas.filter((comuna) =>
      comuna.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredComunas(filtered);
  };

  const handleComunaSelect = (comuna: string) => {
    setLugar(comuna);
    setFilteredComunas([]);
    setIsFocused(false);
  };

  return (
    <div className="flex justify-between items-center bg-[#EDF2F7] p-2 rounded-lg mb-6 w-full">
      <div className="flex space-x-4 items-center">
        {/* Input de comuna */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={lugar}
            onChange={handleComunaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Ingresa la comuna"
            className="p-2 rounded-md border border-gray-300 focus:outline-none w-full"
          />
          {isFocused && filteredComunas.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
              {filteredComunas.map((comuna) => (
                <li
                  key={comuna}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleComunaSelect(comuna)}
                >
                  {comuna}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input de rango de precios */}
        <div className="flex items-center space-x-2 px-4 flex-grow">
          <span className="text-gray-600">Precio minimo:</span>
          <input
            type="text"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.replace(/[^0-9]/g, ""); // Permitir solo números
              setPrecioMin(input.value); // Actualizar el estado
            }}
            className="w-20 p-1 border rounded-md text-gray-700"
          />
          <span className="text-gray-600">Precio máximo:</span>
          <input
            type="text"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.replace(/[^0-9]/g, ""); // Permitir solo números
              setPrecioMax(input.value); // Actualizar el estado
            }}
            className="w-20 p-1 border rounded-md text-gray-700"
          />
        </div>

      </div>

      {/* Botón de buscar */}
      {/* <button
        className="bg-red-500 text-white p-3 rounded-lg"
        onClick={onSearch}
      >
        Buscar
      </button> */}
    </div>
  );
}
