/**
 * System              : Genesis Business Library
 * Sub-System          : multi-pro-code-test Configuration
 * Version             : 1.0
 * Copyright           : (c) Genesis
 * Date                : 2022-03-18
 * Function : Provide view config for multi-pro-code-test.
 *
 * Modification History
 */
views {

    view("CLIENTS_NAME", CLIENT) {
        fields {
            CLIENT.CLIENT_ID

            derivedField("FULL_NAME", STRING) {
                withInput(CLIENT.FIRST_NAME, CLIENT.LAST_NAME) { FIRST_NAME, LAST_NAME ->
                    "$FIRST_NAME $LAST_NAME"
                }
            }
        }
    }

    view("FORM_QUESTIONS_VIEW", QUESTION) {
        joins {
            joining(FORM, backwardsJoin = true) {
                on(QUESTION.FORM_ID to FORM { FORM_ID })
            }
        }

        fields {
            FORM.FORM_NAME
            FORM.FORM_ID
            QUESTION.QUESTION_F
        }
    }

    view("ANSWERS_VIEW", ANSWER) {
        joins {
            joining(QUESTION, backwardsJoin = true) {
                on(ANSWER.QUESTION_ID to QUESTION { QUESTION_ID })
                    .joining(FORM, backwardsJoin = true) {
                        on(QUESTION.FORM_ID to FORM { FORM_ID })
                    }
            }
            joining(CLIENT) {
                on(ANSWER.CLIENT_ID to CLIENT { CLIENT_ID })
            }
        }

        fields {
            FORM.FORM_NAME
            FORM.FORM_ID
            QUESTION.QUESTION_F
            ANSWER.ANSWER_F
            CLIENT.FIRST_NAME
            CLIENT.LAST_NAME
        }
    }
}
