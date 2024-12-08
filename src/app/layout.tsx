'use client'; // Asegúrate de usar "use client" para habilitar hooks en React

import { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { EdgeStoreProvider } from '../lib/edgestore'; // Importa el provider de EdgeStore
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
        {/* Anida los providers */}
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000/home",
          }}
        >
          <EdgeStoreProvider>
            <main>{children}</main> {/* Aquí irá el contenido de cada página */}
          </EdgeStoreProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
