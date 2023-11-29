rootProject.name = "genesisproduct-dynamic-forms"

buildCache {
    local {
        directory = File(rootDir.parentFile.parent, "build-cache")
        removeUnusedEntriesAfterDays = 30
        isEnabled = true
    }
}

pluginManagement {
    pluginManagement {
        val genesisVersion: String by settings
        val deployPluginVersion: String by settings
        plugins {
            id("global.genesis.build") version genesisVersion
            id("global.genesis.deploy") version deployPluginVersion
        }
    }
    repositories {
        mavenLocal {
            // VERY IMPORTANT!!! EXCLUDE AGRONA AS IT IS A POM DEPENDENCY AND DOES NOT PLAY NICELY WITH MAVEN LOCAL!
            content {
                excludeGroup("org.agrona")
            }
        }
        mavenCentral()
        gradlePluginPortal()
        maven {
            val repoUrl = if(extra.properties["clientSpecific"] == "true") {
                "https://genesisglobal.jfrog.io/genesisglobal/libs-release-client"
            } else {
                "https://genesisglobal.jfrog.io/genesisglobal/dev-repo"
            }
            url = uri(repoUrl)
            credentials {
                username = extra.properties["genesisArtifactoryUser"].toString()
                password = extra.properties["genesisArtifactoryPassword"].toString()
            }
        }
    }
}



include("dynamic-forms-config")
include("dynamic-forms-messages")
include("dynamic-forms-eventhandler")
include("dynamic-forms-script-config")
include("dynamic-forms-distribution")
include("dynamic-forms-dictionary-cache")
include("dynamic-forms-dictionary-cache:dynamic-forms-generated-sysdef")
include("dynamic-forms-dictionary-cache:dynamic-forms-generated-fields")
include("dynamic-forms-dictionary-cache:dynamic-forms-generated-dao")
include("dynamic-forms-dictionary-cache:dynamic-forms-generated-hft")
include("dynamic-forms-dictionary-cache:dynamic-forms-generated-view")
include("dynamic-forms-deploy")
include("dynamic-forms-site-specific")

includeBuild("../../client")
