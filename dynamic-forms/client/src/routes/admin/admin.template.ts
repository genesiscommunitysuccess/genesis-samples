import {html} from '@microsoft/fast-element';
import type {Admin} from './admin';
import {createControlConfig, createFormSchema} from "../../utils";
import {ColDef} from "ag-grid-community";
import {GridProRendererTypes} from "@genesislcap/foundation-zero-grid-pro";
import {Route} from "@microsoft/fast-router";
import {UiSchemaElement} from "@genesislcap/foundation-forms";

const formNameControl: UiSchemaElement = {
    type: 'Control',
    label: 'Form Name',
    scope: '#/properties/FORM_NAME',
};

const formIdControl: UiSchemaElement = {
    type: 'Control',
    label: 'Form id',
    scope: '#/properties/FORM_ID',
    options: {
        allOptionsResourceName: "ALL_FORMS",
        valueField: "FORM_ID",
        labelField: "FORM_NAME",
        data: null,
    }
};

export const formCreateSchema = createFormSchema([
    formNameControl,
    formIdControl
]);

export const formUpdateSchema = createFormSchema([formNameControl]);

const formQuestionControl: UiSchemaElement = {
    "type": "Control",
    "label": "Form",
    "scope": "#/properties/FORM_ID",
    "options": {
        allOptionsResourceName: "ALL_FORMS",
        valueField: "FORM_ID",
        labelField: "FORM_NAME",
        data: null,
    }
};
const questionControl: UiSchemaElement = {
    type: 'Control',
    label: 'Question',
    scope: '#/properties/QUESTION',
};

export const questionCreateSchema = createFormSchema([
    formQuestionControl,
    questionControl
]);

export const questionUpdateSchema = createFormSchema([
    formQuestionControl,
    questionControl
]);

export const answersColumns: ColDef[] = [
    { field: 'CLIENT_ID', headerName: 'Client ID'},
    { field: 'QUESTION_ID', headerName: 'Question ID'},
    { field: 'ANSWER', headerName: 'Answer ID'},
    { field: 'FORM_NAME', headerName: 'Form name'},
    { field: 'FORM_ID', headerName: 'Form id'},
    { field: 'QUESTION_F', headerName: 'Question'},
    { field: 'ANSWER_F', headerName: 'Answer'},
    { field: 'FIRST_NAME', headerName: 'First name'},
    { field: 'LAST_NAME', headerName: 'Last name'},
]

export const adminColumns: ColDef[] = [
    {field: 'FORM_ID', headerName: 'Form id'},
    {field: 'FORM_NAME', headerName: 'Form name'},
    {
        field: 'View form',
        headerName: 'View form',
        cellRenderer: GridProRendererTypes.action,
        cellRendererParams: {
            actionClick: (rowData) => {
                Route.path.push(`view-form/${rowData.FORM_ID}`);
            },
            actionName: 'View form',
            appearance: 'secondary-orange',
        }
    }
];

export const questionColumns: ColDef[] = [
    {field: 'QUESTION_ID', headerName: 'Question Id'},
    {field: 'FORM_ID', headerName: 'Form Id'},
    {field: 'QUESTION', headerName: 'Question'},
]

export const clientColumns: ColDef[] = [
    {field: 'FIRST_NAME', headerName: 'First name'},
    {field: 'LAST_NAME', headerName: 'Last name'},
]

export const clientFormSchema = createFormSchema(
    clientColumns.map(c => createControlConfig(c.headerName, c.field))
);

export const AdminTemplate = html<Admin>`
    <!-- start a layout -->
    <foundation-layout auto-save-key="admin-layout">

        <!-- create a region made up of tabs -->
        <foundation-layout-region type="tabs">

            <!-- forms tab -->
            <foundation-layout-item title="Forms" registration="instruments">
                <styled-entity-management
                        resourceName="ALL_FORMS"
                        title="Forms"
                                   updateEvent="EVENT_FORM_MODIFY"
                                   deleteEvent="EVENT_FORM_DELETE"
                                   createEvent="EVENT_FORM_INSERT"
                                   :columns=${x => x.adminColumns}
                                   :createFormUiSchema=${() => formCreateSchema}
                                   :updateFormUiSchema=${() => formUpdateSchema}
                >
                </styled-entity-management>
            </foundation-layout-item>

            <!-- questions tab -->
            <foundation-layout-item title="Questions" registration="trades">
                <styled-entity-management resourceName="ALL_QUESTIONS"
                                   title="Questions"
                                   updateEvent="EVENT_QUESTION_MODIFY"
                                   deleteEvent="EVENT_QUESTION_DELETE"
                                   createEvent="EVENT_QUESTION_INSERT"
                                   :columns=${x => x.questionColumns}
                                   :createFormUiSchema=${() => questionCreateSchema}
                                   :updateFormUiSchema=${() => questionUpdateSchema}
                >
                </styled-entity-management>
            </foundation-layout-item>
            <foundation-layout-item title="Answers" registration="answers">
                <styled-entity-management resourceName="ALL_ANSWERS"
                                   title="Answers"
                                   :columns=${x => x.answersColumns}
                >
                </styled-entity-management>
            </foundation-layout-item>
            <foundation-layout-item title="Clients" registration="clients">
                <styled-entity-management resourceName="ALL_CLIENTS"
                                   title="Clients"
                                   updateEvent="EVENT_CLIENT_MODIFY"
                                   deleteEvent="EVENT_CLIENT_DELETE"
                                   createEvent="EVENT_CLIENT_INSERT"
                                   :columns=${x => x.clientColumns}
                                   :createFormUiSchema=${() => clientFormSchema}
                                   :updateFormUiSchema=${() => clientFormSchema}
                >
                </styled-entity-management>
            </foundation-layout-item>
        </foundation-layout-region>
    </foundation-layout>
`;
