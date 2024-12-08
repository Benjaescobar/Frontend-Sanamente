import { BooleanField, Datagrid, DateField, EmailField, List, TextField } from 'react-admin';

export const UsuariosList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="nombre" />
            <EmailField source="email" />
            {/* <TextField source="password" /> */}
            <TextField source="tipo" />
            <TextField source="foto" />
            <BooleanField source="is_deleted" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);
