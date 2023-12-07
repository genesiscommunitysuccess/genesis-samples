import {ViewForm} from "./view-form";
import {html, when} from "@microsoft/fast-element";

//ANSWERS_VIEW
export const ViewFormTemplate
    = html<ViewForm>`
    <zero-card>
        ${when(
    (x) => !x.submitSuccess && x.uiSchema,
        html`
            <h2>${(x) => x.formName}</h2>
            <foundation-form
                    :jsonSchema=${(x) => x.jsonSchema}
                    :uischema=${(x) => x.uiSchema}>
            </foundation-form>
        `
    )}
        ${when(
            x => x.submitSuccess,
            html`
                <h3>Answers submitted!</h3>
                <p>This form was completed for ${x => x.clientName}. You can see their answers in the answers section on the admin panel</p>
                <zero-button @click="${x => x.goToAdmin()}">See admin</zero-button>
            `
        )}
    </zero-card>
`