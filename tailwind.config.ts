import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Apuntando correctamente a tu carpeta `app`
    './src/components/**/*.{js,ts,jsx,tsx}', // Incluyendo componentes dentro de `src`
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js', // Especificando el archivo correctamente
    flowbite.content(),
  ],
  theme: {
    extend: {},
    colors: {
      celeste: '#e7f0ff',
      amarillo: '#fef6df',
    }
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
}

