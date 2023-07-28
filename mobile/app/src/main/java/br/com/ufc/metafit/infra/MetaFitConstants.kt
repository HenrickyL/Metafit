package br.com.ufc.metafit.infra

// Usar o private constructor() para que a classe não possa ser instanciada
class MetaFitConstants private constructor(){
    object KEY {
        const val USER_EMAIL = "USER_EMAIL"
        const val USER_NAME = "USER_NAME"
        const val USER_PASSWORD = "USER_PASSWORD"
        const val USER_USERNAME = "USER_USERNAME"
        const val USER_ID = "USER_ID"
        const val USER_TOKEN = "USER_TOKEN"
    }
}