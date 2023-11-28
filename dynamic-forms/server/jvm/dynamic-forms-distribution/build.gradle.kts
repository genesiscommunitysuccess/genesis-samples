plugins {
    distribution
}

dependencies {
    implementation(project(":dynamic-forms-config"))
    implementation(project(":dynamic-forms-dictionary-cache"))
    implementation(project(":dynamic-forms-eventhandler"))
    implementation(project(":dynamic-forms-messages"))
    implementation(project(":dynamic-forms-script-config"))
}

description = "dynamic-forms-distribution"

distributions {
    main {
        contents {
            // Octal conversion for file permissions
            val libPermissions = "600".toInt(8)
            val scriptPermissions = "700".toInt(8)
            into("dynamic-forms/bin") {
                from(configurations.runtimeClasspath)
                exclude("dynamic-forms-config*.jar")
                exclude("dynamic-forms-script-config*.jar")
                exclude("dynamic-forms-distribution*.jar")
                include("dynamic-forms-*.jar")
            }
            into("dynamic-forms/lib") {
                from("${project.rootProject.buildDir}/dependencies")
                duplicatesStrategy = DuplicatesStrategy.EXCLUDE

                exclude("genesis-*.jar")
                exclude("dynamic-forms-*.jar")
                exclude("*.zip")

                fileMode = libPermissions
            }
            into("dynamic-forms/cfg") {
                from("${project.rootProject.projectDir}/dynamic-forms-config/src/main/resources/cfg")
                from(project.layout.buildDirectory.dir("generated/product-details"))
                filter(
                    org.apache.tools.ant.filters.FixCrLfFilter::class,
                    "eol" to org.apache.tools.ant.filters.FixCrLfFilter.CrLf.newInstance("lf")
                )
            }
            into("dynamic-forms/scripts") {
                from("${project.rootProject.projectDir}/dynamic-forms-config/src/main/resources/scripts")
                from("${project.rootProject.projectDir}/dynamic-forms-script-config/src/main/resources/scripts")
                filter(
                    org.apache.tools.ant.filters.FixCrLfFilter::class,
                    "eol" to org.apache.tools.ant.filters.FixCrLfFilter.CrLf.newInstance("lf")
                )
                fileMode = scriptPermissions
            }
            // Removes intermediate folder called with the same name as the zip archive.
            into("/")
        }
    }
}

val distribution by configurations.creating {
    isCanBeConsumed = true
    isCanBeResolved = false
}

// To give custom name to the distribution package
tasks {
    distZip {
        archiveBaseName.set("genesisproduct-dynamic-forms")
        archiveClassifier.set("bin")
        archiveExtension.set("zip")
        inputs.files(rootProject.getTasksByName("copyDependencies", true))
    }
    distTar {
        enabled = false
    }
    copyDependencies {
        enabled = false
    }
}

artifacts {
    val distzip = tasks.distZip.get()
    add("distribution", distzip.archiveFile) {
        builtBy(distzip)
    }
}

publishing {
    publications {
        create<MavenPublication>("dynamic-formsServerDistribution") {
            artifact(tasks.distZip.get())
        }
    }
}

description = "dynamic-forms-distribution"
