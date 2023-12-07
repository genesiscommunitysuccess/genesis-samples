import {customElement, FASTElement, observable} from '@microsoft/fast-element';
import { CreateWizardStyles as styles } from './create-wizard.styles';
import { createWizardTemplate as template } from "./create-wizard.template";
import {Connect} from "@genesislcap/foundation-comms";
import {Form, UiSchema} from "@genesislcap/foundation-forms";
import {JSONSchema7} from "json-schema";

const name = 'create-wizard-route';

export const questionsUiSchema: UiSchema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'array',
            scope: '#/properties/questions',
            options: {
                childUiSchema: {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            scope: '#/properties/question',
                            label: 'Question',
                        },
                    ],
                },
            },
        },
    ],
};


export const questionsSchema: JSONSchema7 = {
    type: 'object',
    properties: {
        questions: {
            type: 'array',
            items: {
                type: 'object',
                title: 'Form Questions',
                properties: {
                    question: {
                        type: 'string',
                    },
                },
                required: ['question'],
            },
        },
    },
}

@customElement({
    name,
    template,
    styles,
})
export class CreateWizard extends FASTElement {

    @observable questionsSchema = questionsSchema;

    @observable questionsUiSchema =questionsUiSchema;

    @observable formName: string;
    @observable questionData: any = {
        questions: [{}]
    };

    @Connect private connect!: Connect;

    @observable arrayForm: Form

    @observable previewSchema: UiSchema;

    @observable previewJsonSchema: JSONSchema7;

    isFormValid(): boolean {
        return !!this.formName;
    }

    isQuestionsValid(): boolean {
        this.previewSchema = this.generatePreviewSchema();
        this.previewJsonSchema = this.generatePreviewJSONSchema();
        return !!this.arrayForm.data.questions.filter(q => !!q.question).length;
    }

    async submitForms(): Promise<void> {
        const val = await this.connect.commitEvent(
            'EVENT_FORM_INSERT',
            {
                DETAILS: {
                    FORM_NAME: this.formName
                }
            }
        )
        const formId = (val as any).GENERATED[0].FORM_ID;
        const allQuestions = await Promise.all(this.arrayForm.data.questions
            .filter(q => !!q.question)
            .map((q) => this.connect.commitEvent(
            'EVENT_QUESTION_INSERT',
            {
                DETAILS: {
                    QUESTION: q.question,
                    FORM_ID: formId
                }
            }
        )))

        console.log(allQuestions);
        alert('Form created');
    }

    generatePreviewSchema(): UiSchema {

        return {
            type: 'VerticalLayout',
            elements: this.arrayForm.data.questions.map(q => {
                return {
                    type: 'Control',
                    scope: '#/properties/question',
                    label: q.question,
                };
            })
        };
    }

    generatePreviewJSONSchema(): JSONSchema7 {

        const properties =  this.arrayForm.data.questions.reduce((acc, q) => {
            acc[q.question] = {
                type: 'string',
            };

            return acc;
        }, {})

        return {
            type: 'object',
            properties
        }
    }
}
