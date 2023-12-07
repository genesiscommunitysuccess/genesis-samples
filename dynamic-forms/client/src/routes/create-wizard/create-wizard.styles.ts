import {css} from "@microsoft/fast-element";

export const CreateWizardStyles = css`
  zero-stepper::part(stepper-panel-container) {
    padding: 15px;
  }
  
    .form-preview {
      display: flex;
      align-items: center;
      
    }
  
  .form-preview__item, .question-preview__item {
    margin-bottom: 10px;
  }
  
  .question-preview__item label {
    font-weight: bold;
  }
`;