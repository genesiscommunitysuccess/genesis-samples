import {html} from "@microsoft/fast-element";
import {Forms} from "./forms";

export const formsTemplate = html<Forms>`
        <foundation-layout auto-save-key="admin-layout">

        <!-- create a region made up of tabs -->
        <foundation-layout-region type="tabs">

            <!-- forms tab -->
            <foundation-layout-item title="Forms" registration="forms">
                <foundation-form
                        resourceName="EVENT_FORM_INSERT"
                        title="Forms"
                >
                </foundation-form>
            </foundation-layout-item>

            <!-- questions tab -->
            <foundation-layout-item title="Questions" registration="questions">
                <foundation-form
                        resourceName="EVENT_QUESTION_INSERT"
                        title="Questions"
                >
                </foundation-form>
            </foundation-layout-item>
            <foundation-layout-item title="Clients" registration="clients">
                <foundation-form resourceName="EVENT_CLIENT_INSERT"
                                   title="Clients"
                >
                </foundation-form>
            </foundation-layout-item>
        </foundation-layout-region>
    </foundation-layout>
`