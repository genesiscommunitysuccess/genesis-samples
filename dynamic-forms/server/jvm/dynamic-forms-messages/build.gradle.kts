dependencies {
    implementation("global.genesis:genesis-messages")
    compileOnly(project(path = ":dynamic-forms-dictionary-cache", configuration = "codeGen"))
}

description = "dynamic-forms-messages"