import { BooleanField, DateField, EmailField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const UsuarioShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="nombre" />
            <EmailField source="email" />
            <TextField source="tipo" />
            <BooleanField source="is_deleted" />
            <DateField source="createdAt" />
        </SimpleShowLayout>
    </Show>
);
