/**
 * System              : Genesis Business Library
 * Sub-System          : multi-pro-code-test Configuration
 * Version             : 1.0
 * Copyright           : (c) Genesis
 * Date                : 2022-03-18
 * Function : Provide table definition config for multi-pro-code-test.
 *
 * Modification History
 */

tables {
    table(name = "CLIENT", id = 5000) {
        autoIncrement(CLIENT_ID)
        FIRST_NAME
        LAST_NAME

        primaryKey { CLIENT_ID }
    }

    table(name = "FORM", id = 5001) {
        autoIncrement(FORM_ID)
        FORM_NAME

        primaryKey { FORM_ID }
    }

    table(name = "QUESTION", id = 5002) {
        autoIncrement(QUESTION_ID)
        FORM_ID
        QUESTION

        primaryKey { QUESTION_ID }

        indices {
            nonUnique { FORM_ID }
        }
    }

    table(name = "ANSWER", id = 5003) {
        CLIENT_ID
        QUESTION_ID
        ANSWER

        primaryKey {
            CLIENT_ID
            QUESTION_ID
        }

        indices {
            nonUnique {
                QUESTION_ID
            }
        }
    }
}