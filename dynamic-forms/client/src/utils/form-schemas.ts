export interface FormControlConfig {
    type: string;
    label: string;
    scope: `#/properties/${string}`;
    options?: Partial<{
        allOptionsResourceName: string,
        valueField: string,
        labelField: string,
        data: any,
    }>
}

export const createFormSchema = (elements: FormControlConfig[]): { type: 'VerticalLayout', elements: FormControlConfig[]} => {
    return {
        type: 'VerticalLayout',
        elements
    }
}