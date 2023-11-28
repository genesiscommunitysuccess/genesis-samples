import {html} from '@microsoft/fast-element';
import type {Home} from './home';
import {createFormSchema, FormControlConfig} from "../../utils";
import {ColDef} from "ag-grid-community";

const firstNameControl: FormControlConfig = {
    type: 'Control',
    label: 'First name',
    scope: '#/properties/FIRST_NAME',
};
const lastNameControl: FormControlConfig = {
    type: 'Control',
    label: 'Last name',
    scope: '#/properties/LAST_NAME',
}

export const clientCreateSchema = createFormSchema([
        firstNameControl,
        lastNameControl
    ]
);

export const columns: ColDef[] = [
    {field: 'CLIENT_ID', headerName: 'Client id'},
    {field: 'FIRST_NAME', headerName: 'First name'},
    {field: 'LAST_NAME', headerName: 'Last name'},
];

export const HomeTemplate = html<Home>`
    <entity-management resourceName="ALL_CLIENTS"
                       title="Client Management"
                       updateEvent="EVENT_CLIENT_MODIFY"
                       deleteEvent="EVENT_CLIENT_DELETE"
                       createEvent="EVENT_CLIENT_INSERT"
                       :columns=${x => x.columns}
                       :createFormUiSchema=${() => clientCreateSchema}
                       :updateFormUiSchema=${() => clientCreateSchema}
    >
    </entity-management>
`;
