"use client"
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import { PsicologoList } from '@/components/admin/psicologosList';
import { PublicacionesList } from '@/components/admin/publicacionesList';
import { UsuariosList } from '@/components/admin/usuariosList';
import { SesionesList } from '@/components/admin/sesionesList';
import { ValoracionesList } from '@/components/admin/valoracionesList';
import { UsuarioShow } from '@/components/admin/usuariosShow';
import jsonServerProvider from 'ra-data-json-server'

const dataProvider = jsonServerProvider('https://backend-sanamente-d7ej.onrender.com')

export default function AdminDashboard() {

  return (
    <Admin dataProvider={dataProvider}>
  +   <Resource name="psicologos" list={PsicologoList} recordRepresentation={(record) => `#${record.usuario_id} ${record.usuario.nombre}`} />
  +   <Resource name="publicaciones" list={PublicacionesList} show={ShowGuesser} />
  +   <Resource name="usuarios" list={UsuariosList} recordRepresentation={(record) => `#${record.id} ${record.nombre}`} show={UsuarioShow} />
  +   <Resource name="sesiones" list={SesionesList} show={ShowGuesser} />
  +   <Resource name="valoraciones" list={ValoracionesList} show={ShowGuesser} />
    </Admin>
  );
}
