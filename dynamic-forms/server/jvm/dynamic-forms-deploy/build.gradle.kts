plugins {
    id("global.genesis.deploy")
}

description = "dynamic-forms-deploy"

dependencies {
    genesisServer(
        group = "global.genesis",
        name = "genesis-distribution",
        version = properties["genesisVersion"].toString(),
        classifier = "bin",
        ext = "zip"
    )
    genesisServer(
        group = "global.genesis",
        name = "auth-distribution",
        version = properties["authVersion"].toString(),
        classifier = "bin",
        ext = "zip"
    )

    genesisServer(project(":dynamic-forms-distribution", "distribution"))
    genesisServer(project(":dynamic-forms-site-specific", "distribution"))
    genesisWeb(":client")

    api(project(":dynamic-forms-eventhandler"))
    api(project(":dynamic-forms-messages"))
    // Add additional dependencies on other external distributions here
}
tasks {
    copyDependencies {
        enabled = false
    }
}
