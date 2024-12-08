import { Datagrid, DateField, List, NumberField, ReferenceField, TextField } from 'react-admin';

export const PsicologoList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="usuario_id" reference="usuarios" />
            {/* <TextField source="usuario.nombre" /> */}
            <TextField source="url_calendly" />
            <TextField source="especialidades" />
            <NumberField source="experiencia" />
            <TextField source="descripcion" />
            <TextField source="ubicacion" />
            <NumberField source="precio_min" />
            <NumberField source="precio_max" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
