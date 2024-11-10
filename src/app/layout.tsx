// app/layout.tsx
'use client'  // Asegúrate de usar "use client" para los hooks de React

import { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react'; // Importa Auth0Provider
import "./globals.css";

const domain = 'dev-n21w3xs26ahbrrrj.us.auth0.com';
const clientId = '5IGPqIFODssmOEvrayz5HOZ23tjVd5bi';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000/profile",
          }}
        >
          <main>{children}</main> {/* Aquí irá el contenido de cada página */}
        </Auth0Provider>
      </body>
    </html>
  );
}

