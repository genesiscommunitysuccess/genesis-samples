dependencies {
    implementation("global.genesis:genesis-pal-execution")
    implementation("global.genesis:genesis-eventhandler")
    implementation(project(":dynamic-forms-messages"))
    api("global.genesis:genesis-db")
    compileOnly(project(":dynamic-forms-config"))
    compileOnly(project(path = ":dynamic-forms-dictionary-cache", configuration = "codeGen"))
    testImplementation("global.genesis:genesis-dbtest")
    testImplementation("global.genesis:genesis-testsupport")
    testImplementation(project(path = ":dynamic-forms-dictionary-cache", configuration = "codeGen"))
}

description = "dynamic-forms-eventhandler"