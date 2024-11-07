// app/layout.tsx
import { ReactNode } from 'react';
import "./globals.css"

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <main>
          {children} {/* Aquí irá el contenido de cada página */}
        </main>
      </body>
    </html>
  );
}
