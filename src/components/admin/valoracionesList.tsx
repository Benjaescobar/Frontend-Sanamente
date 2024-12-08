import { Datagrid, DateField, List, NumberField, ReferenceField, TextField } from 'react-admin';

export const ValoracionesList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="autor_id" reference="usuarios" />
            <ReferenceField source="evaluado_id" reference="usuarios" />
            <NumberField source="puntuacion" />
            <TextField source="comentario" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
