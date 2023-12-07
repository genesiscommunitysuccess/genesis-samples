import { EntityManagement } from '@genesislcap/foundation-entity-management';
import {css, customElement, html } from '@microsoft/fast-element';

@customElement({
    name: 'styled-entity-management',
    template: html`
    <entity-management
        resourceName="${x => x.resourceName}"
        title="${x => x.title}"
        updateEvent="${x => x.updateEvent}"
        deleteEvent="${x => x.deleteEvent}"
        createEvent="${x => x.createEvent}"
        :columns=${x => x.columns}
        :createFormUiSchema=${x => x.createFormUiSchema}
        :updateFormUiSchema=${x => x.updateFormUiSchema}
    ></entity-management>
  `,
    styles: css`
    entity-management::part(header) {
      padding: 0 50px;
    }
  `,
})
export class StyledEntityManagement extends EntityManagement {
}