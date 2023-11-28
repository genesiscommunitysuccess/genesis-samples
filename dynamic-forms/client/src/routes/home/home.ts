import {customElement, FASTElement} from '@microsoft/fast-element';
import {columns, HomeTemplate as template} from './home.template';
import { HomeStyles as styles } from './home.styles';
import {ColDef} from "ag-grid-community";

const name = 'home-route';

@customElement({
  name,
  template,
  styles,
})
export class Home extends FASTElement {

  columns: ColDef[] = columns;
  constructor() {
    super();
  }
}
