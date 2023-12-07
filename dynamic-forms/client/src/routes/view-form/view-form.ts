import {customElement, FASTElement, observable} from "@microsoft/fast-element";
import { ViewFormTemplate as template } from "./view-form.template";
import { ViewFormStyles as styles } from "./view-form.styles";
import {Connect} from "@genesislcap/foundation-comms";
import {createControlConfig, createFormSchema } from "../../utils";
import {Modal} from "@genesislcap/foundation-zero";
import {Route} from "@microsoft/fast-router";
import {UiSchemaElement} from "@genesislcap/foundation-forms";

const name = 'view-form-route';

@customElement({
    name,
    template,
    styles,
})
export class ViewForm extends FASTElement {

    @Connect connect!: Connect;

    @observable uiSchema;

    @observable jsonSchema;

    @observable data;

    @observable clients;

    @observable formName: string;

    @observable clientName: string;

    @observable submitSuccess: boolean;


    modal: Modal;

    public async connectedCallback() {
        super.connectedCallback();
        this.data = await this.connect.snapshot(
            'ALL_FORM_QUESTIONS',
            { CRITERIA_MATCH: `FORM_ID == ${this.id}` }
        );

        this.formName = this.data.ROW[0].FORM_NAME;
        this.clients = await this.connect.snapshot('ALL_CLIENTS_NAME');
        this.uiSchema = this.generateUISchema(this.data.ROW || [])
        this.jsonSchema = this.generateJsonSchema(this.data.ROW || []);
        this.addEventListener('submit', async (e: CustomEvent) => this.onSubmit(e.detail));
    }

    generateUISchema(data: any[]) {

        const client: UiSchemaElement = {
            type: 'Control',
            scope: '#/properties/CLIENT_ID',
            label: 'Client',
            options: {
                allOptionsResourceName: 'ALL_CLIENTS_NAME',
                labelField: 'FULL_NAME',
                valueField: 'CLIENT_ID',
                data: null
            },
        };

        return createFormSchema([
            client,
            ...data.map(d => createControlConfig(d.QUESTION, `QUESTION_ID_${d.QUESTION_ID}`))
        ])
    }

    generateJsonSchema(data: any[]) {

        const client = {
            type: 'number',
            description: 'kotlin.String',
        };

        const properties = data.reduce((acc, d) => {
            acc[`QUESTION_ID_${d.QUESTION_ID}`] = {
                type: 'string',
                description: 'kotlin.String',
            }

            return acc;
        }, {
            'CLIENT_ID': client
        });

        const required = ['CLIENT_ID', ...data.map(d => `QUESTION_ID_${d.QUESTION_ID}`)];

        return {
            type: 'object',
            properties,
            required
        }
    }

    async onSubmit(e): Promise<void> {
        const events = Object.keys(e.payload)
            .filter(k => k.indexOf('QUESTION_ID_') !== -1)
            .map(key => ({
            DETAILS: {
                QUESTION_ID: parseInt(key.replace('QUESTION_ID_', '')),
                ANSWER: e.payload[key],
                CLIENT_ID: e.payload.CLIENT_ID
            }
        }))

        const allAnswers = await Promise.all(events.map(({DETAILS}) => this.connect.commitEvent(
            'EVENT_ANSWER_UPSERT',
            {
                DETAILS
            }
        )))
        this.clientName = this.clients.ROW.find(r => r.CLIENT_ID === e.payload.CLIENT_ID).FULL_NAME;
        this.submitSuccess = allAnswers.every(a => a.MESSAGE_TYPE === 'EVENT_ACK');
    }

    goToAdmin(): void {
        Route.path.trigger('/admin');
    }
}