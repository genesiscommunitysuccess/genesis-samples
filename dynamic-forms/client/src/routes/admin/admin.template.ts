import {html} from '@microsoft/fast-element';
import type {Admin} from './admin';
import {createFormSchema, FormControlConfig} from "../../utils";
import {ColDef} from "ag-grid-community";

const formNameControl: FormControlConfig = {
    type: 'Control',
    label: 'Form Name',
    scope: '#/properties/FORM_NAME',
};

const formIdControl: FormControlConfig = {
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

const formQuestionControl = {
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
const questionControl = {
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


export const adminColumns: ColDef[] = [
    {field: 'FORM_ID', headerName: 'Form id'},
    {field: 'FORM_NAME', headerName: 'Form name'},
];

export const questionColumns: ColDef[] = [
    {field: 'QUESTION_ID', headerName: 'Question Id'},
    {field: 'FORM_ID', headerName: 'Form Id'},
    {field: 'QUESTION', headerName: 'Question'},
]

export const AdminTemplate = html<Admin>`
    <!-- start a layout -->
    <foundation-layout auto-save-key="admin-layout">

        <!-- create a region made up of tabs -->
        <foundation-layout-region type="tabs">

            <!-- forms tab -->
            <foundation-layout-item title="Forms" registration="instruments">
                <entity-management resourceName="ALL_FORMS"
                                   title="Form Management"
                                   updateEvent="EVENT_FORM_MODIFY"
                                   deleteEvent="EVENT_FORM_DELETE"
                                   createEvent="EVENT_FORM_INSERT"
                                   :columns=${x => x.adminColumns}
                                   :createFormUiSchema=${() => formCreateSchema}
                                   :updateFormUiSchema=${() => formUpdateSchema}

                >
                </entity-management>
            </foundation-layout-item>

            <!-- questions tab -->
            <foundation-layout-item title="Questions" registration="trades">
                <entity-management resourceName="ALL_QUESTIONS"
                                   title="Question Management"
                                   updateEvent="EVENT_QUESTION_MODIFY"
                                   deleteEvent="EVENT_QUESTION_DELETE"
                                   createEvent="EVENT_QUESTION_INSERT"
                                   :columns=${x => x.questionColumns}
                                   :createFormUiSchema=${() => questionCreateSchema}
                                   :updateFormUiSchema=${() => questionUpdateSchema}
                >
                </entity-management>
            </foundation-layout-item>

        </foundation-layout-region>
    </foundation-layout>
`;
