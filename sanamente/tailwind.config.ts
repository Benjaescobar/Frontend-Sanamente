/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Apuntando correctamente a tu carpeta `app`
    './src/components/**/*.{js,ts,jsx,tsx}', // Incluyendo componentes dentro de `src`
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
