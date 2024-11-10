import React, { useState } from 'react';

const comunas = [
  "Providencia",
  "Santiago Centro",
  "Las Condes",
  "Ñuñoa",
  "Vitacura",
  "La Reina",
  "Macul",
  "Lo Barnechea",
  // Agrega más comunas según sea necesario
];

export default function Header() {
  const [selectedComuna, setSelectedComuna] = useState('');
  const [filteredComunas, setFilteredComunas] = useState(comunas);
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar el enfoque
  // const [date, setDate] = useState({ 
  //       startDate: null, 
  //       endDate: null
  //   });

  const handleComunaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedComuna(value);

    // Filtrar las comunas en base al valor del input
    const filtered = comunas.filter((comuna) =>
      comuna.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredComunas(filtered);
  };

  const handleComunaSelect = (comuna: string) => {
    setSelectedComuna(comuna);
    setFilteredComunas([]); // Cierra la lista de sugerencias
    setIsFocused(false); // Cierra la lista al seleccionar
  };

  return (
    <div className="flex justify-between items-center bg-[#EDF2F7] p-4 rounded-lg mb-6 w-full">
      {/* Contenedor para los inputs principales */}
      <div className="flex space-x-4 w-full items-center">
        <input 
          type="text" 
          placeholder="Ingresa un nombre"
          className="p-2 rounded-md border border-gray-300 focus:outline-none flex-grow"
        />
        
        {/* Input de comuna con lista filtrada */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={selectedComuna}
            onChange={handleComunaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Usamos timeout para permitir el clic en las sugerencias
            placeholder="Ingresa la comuna"
            className="p-2 rounded-md border border-gray-300 focus:outline-none w-full"
          />
          {/* Lista de sugerencias, visible solo cuando está enfocado y hay un valor */}
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

        <div className="flex items-center space-x-2 px-4 flex-grow">
          <span className="text-gray-600">Rango de precios</span>
          <input 
            type="range" 
            min="22000" 
            max="60000"
            className="cursor-pointer"
          />
          <span className="text-gray-600">$22.000-$60.000</span>
        </div>
      </div>

      {/* Botón de buscar */}
      <button className="bg-red-500 text-white p-3 rounded-lg">
        Buscar
      </button>
    </div>
  );
}
