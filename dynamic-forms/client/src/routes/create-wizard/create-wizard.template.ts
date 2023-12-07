import {CreateWizard} from "./create-wizard";
import {html, ref} from "@microsoft/fast-element";
import {sync} from "@genesislcap/foundation-utils";

export const createWizardTemplate = html<CreateWizard>`
        <zero-stepper
                :validation=${(x) => [
                    {
                        isValid: () => x.isFormValid(),
                    },
                    { isValid: () => x.isQuestionsValid() },
                ]}
                @submit=${x => x.submitForms()}
        >
        <zero-stepper-tab>Step 1 - Create form</zero-stepper-tab>
        <zero-stepper-tab>Step 2 - Add questions</zero-stepper-tab>
        <zero-stepper-tab>Step 3 - Preview and confirm</zero-stepper-tab>
      <zero-stepper-tab-panel>
          <h2>Create form</h2>
          <p>
              Enter the name of the form. In the next step we will add questions.
          </p>
          <zero-text-field :value=${sync((x) => x.formName)} placeholder="Enter form name">
            Form name
          </zero-text-field>
        </zero-stepper-tab-panel>
        <zero-stepper-tab-panel>
            <h2>Add questions</h2>
            <p>Please add at least one question.</p>
            <foundation-form ${ref('arrayForm')}
                    :uischema=${(x) => x.questionsUiSchema}
                    :jsonSchema=${(x) => x.questionsSchema}
                    :data=${(x) => x.questionData}
                    :hideSubmit=${() => true}
            ></foundation-form>
        </zero-stepper-tab-panel>
        <zero-stepper-tab-panel>
            <h2>Preview and confirm</h2>
            <p>This is how your form will appear. Please check the form input types and validation is correct. <i>Note: Data entered here will not be saved. It is just for testing</i></b></p>
               <foundation-form
                    :uischema=${(x) => x.previewSchema}
                    :jsonSchema=${(x) => x.previewJsonSchema}
                    :hideSubmit=${() => true}
                ></foundation-form>
        </zero-stepper-tab-panel>
                
      </zero-stepper>
`