dependencies {
    compileOnly("global.genesis:genesis-dictionary")
    compileOnly("global.genesis:genesis-process")
    compileOnly("global.genesis:genesis-pal-execution")
    compileOnly(project(path = ":dynamic-forms-dictionary-cache", configuration = "codeGen"))
}

description = "dynamic-forms-config"
