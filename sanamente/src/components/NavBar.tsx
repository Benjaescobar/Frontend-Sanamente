// app/components/NavBar.tsx
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex justify-end p-5 bg-white">
      <Link href="" className="mx-4 rounded-xl px-3 py-1 text-gray-700">Contacto</Link>
      <Link href="/auth/login" className="mx-4 rounded-xl px-3 py-1 text-[#213554] bg-blue-200 hover:bg-blue-300">Iniciar sesión</Link>
      <Link href="" className="mx-4 rounded-xl px-3 py-1 text-white bg-red-500 hover:bg-red-400">Soy profesional</Link>
    </nav>
  );
}
