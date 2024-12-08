import { Show, SimpleShowLayout, TextField } from "react-admin";

export const PsicologosShow = () => {

    // Redirect to the user's Show view
    return (
        <Show resource="usuarios">
            <SimpleShowLayout>
                <TextField source="id" label="User ID" />
                <TextField source="nombre" label="Name" />
                <TextField source="email" label="Email" />
                {/* Add other user details here */}
            </SimpleShowLayout>
        </Show>
    );
};
