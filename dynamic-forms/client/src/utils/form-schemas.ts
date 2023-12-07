import {UiSchema, UiSchemaElement, UiSchemaElementType} from "@genesislcap/foundation-forms";

export const createFormSchema = (elements: UiSchemaElement[], type: UiSchemaElementType = 'VerticalLayout'): UiSchema => {
    return {
        type,
        elements
    }
}

export const createControlConfig = (label: string, scope: string): UiSchemaElement => {
    return {
        type: 'Control',
        label,
        scope: `#/properties/${scope}`
    }
}