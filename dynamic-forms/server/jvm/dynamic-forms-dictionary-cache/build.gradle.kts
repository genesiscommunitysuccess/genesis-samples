
// Add your genesis config dependencies here
dependencies {
    implementation(project(":dynamic-forms-dictionary-cache:dynamic-forms-generated-dao"))
    implementation(project(":dynamic-forms-dictionary-cache:dynamic-forms-generated-fields"))
    implementation(project(":dynamic-forms-dictionary-cache:dynamic-forms-generated-hft"))
    implementation(project(":dynamic-forms-dictionary-cache:dynamic-forms-generated-sysdef"))
    implementation(project(":dynamic-forms-dictionary-cache:dynamic-forms-generated-view"))

    implementation("global.genesis:auth-config:${properties["authVersion"]}")
}

description = "dynamic-forms-dictionary-cache"
