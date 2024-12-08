import { Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';

export const SesionesList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="paciente_id" reference="usuarios" />
            <ReferenceField source="psicologo_id" reference="psicologos" />
            <DateField source="estado" />
            <TextField source="tipo" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
