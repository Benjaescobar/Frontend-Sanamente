import { Datagrid, DateField, List, NumberField, ReferenceField, TextField } from 'react-admin';

export const PublicacionesList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <DateField source="createdAt" />
            <ReferenceField source="autor_id" reference="psicologos" />
            <TextField source="contenido" />
            {/* <NumberField source="autor.id" /> */}
        </Datagrid>
    </List>
);
