import global.genesis.jackson.core.GenesisJacksonMapper.Companion.toValue

/**
 * System              : Genesis Business Library
 * Sub-System          : multi-pro-code-test Configuration
 * Version             : 1.0
 * Copyright           : (c) Genesis
 * Date                : 2022-03-18
 * Function : Provide event handler config for multi-pro-code-test.
 *
 * Modification History
 */
eventHandler {

    //Client insert, modify, delete (delete answers too)
    eventHandler<Client>(name = "CLIENT_INSERT", transactional = true) {
        onValidate { _ ->
            ack()
        }
        onCommit { event ->
            val client = event.details.toValue<Client>()
            entityDb.insert(client)
            ack()
        }
    }
    eventHandler<Client>(name = "CLIENT_MODIFY", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Client.ById(event.details.clientId)
            }
            ack()
        }
        onCommit { event ->
            val client = event.details.toValue<Client>()
            entityDb.modify(client)
            ack()
        }
    }
    eventHandler<Client.ById>(name = "CLIENT_DELETE", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Client.ById(event.details.clientId)
            }
            ack()
        }
        onCommit { event ->
            entityDb.delete(Client.ById(event.details.clientId))
            //Delete all the client's answers too
            val clientAnswers = entityDb.getRange(Answer.byClientIdQuestionId(event.details.clientId))
            entityDb.deleteAll(clientAnswers)
            ack()
        }
    }

    //Form insert, modify, delete (block if questions under it)
    eventHandler<Form>(name = "FORM_INSERT", transactional = true) {
        onValidate { _ ->
            ack()
        }
        onCommit { event ->
            val form = event.details.toValue<Form>()
            val result = entityDb.insert(form)
            ack(listOf(mapOf("FORM_ID" to result.record.formId)))
        }
    }
    eventHandler<Form>(name = "FORM_MODIFY", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Form.ById(event.details.formId)
            }
            ack()
        }
        onCommit { event ->
            val form = event.details.toValue<Form>()
            entityDb.modify(form)
            ack()
        }
    }
    eventHandler<Form.ById>(name = "FORM_DELETE", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Form.ById(event.details.formId)
            }
            val formQuestions = entityDb.getRange(Question.ByFormId(event.details.formId)).toList()
            require(formQuestions.isEmpty()) {
                "Cannot delete a form which has questions. Delete them first"
            }
            ack()
        }
        onCommit { event ->
            entityDb.delete(Form.ById(event.details.formId))
            ack()
        }
    }

    //Question insert, modify, delete (block if answered)
    eventHandler<Question>(name = "QUESTION_INSERT", transactional = true) {
        onValidate { _ ->
            ack()
        }
        onCommit { event ->
            val question = event.details.toValue<Question>()
            entityDb.insert(question)
            ack()
        }
    }
    eventHandler<Question>(name = "QUESTION_MODIFY", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Question.ById(event.details.formId)
            }
            ack()
        }
        onCommit { event ->
            val question = event.details.toValue<Question>()
            entityDb.modify(question)
            ack()
        }
    }
    eventHandler<Question.ById>(name = "QUESTION_DELETE", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Question.ById(event.details.questionId)
            }
            val answersForQuestions = entityDb.getRange(Answer.ByQuestionId(event.details.questionId)).toList()
            require(answersForQuestions.isEmpty()) {
                "Cannot delete a question which has been answered."
            }
            ack()
        }
        onCommit { event ->
            entityDb.delete(Question.ById(event.details.questionId))
            ack()
        }
    }

    //Answer upsert
    eventHandler<Answer>(name = "ANSWER_UPSERT", transactional = true) {
        onValidate { event ->
            verify {
                entityDb hasEntry Client.ById(event.details.clientId)
                entityDb hasEntry Question.ById(event.details.questionId)
            }
            ack()
        }
        onCommit { event ->
            val answer = event.details.toValue<Answer>()
            entityDb.upsert(answer)
            ack()
        }
    }
}
