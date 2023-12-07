import { customElement, FASTElement } from '@microsoft/fast-element';
import { formsTemplate as template } from './forms.template';
import { formsStyles as styles } from "./forms.styles";

const name = 'form-route';

@customElement({
    name,
    template,
    styles,
})
export class Forms extends FASTElement {

}
