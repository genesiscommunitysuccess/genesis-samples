import { customElement, FASTElement } from '@microsoft/fast-element';
import { adminColumns, questionColumns, AdminTemplate as template } from './admin.template';
import { AdminStyles as styles } from './admin.styles';
import {ColDef} from "ag-grid-community";

const name = 'admin-route';

@customElement({
  name,
  template,
  styles,
})
export class Admin extends FASTElement {

  adminColumns: ColDef[] = adminColumns;

  questionColumns: ColDef[] = questionColumns;
  constructor() {
    super();
  }
}
