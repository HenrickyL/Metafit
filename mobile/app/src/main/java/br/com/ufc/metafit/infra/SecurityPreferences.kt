package br.com.ufc.metafit.infra

import android.content.Context
import android.content.SharedPreferences

class SecurityPreferences(context: Context) {

    private val security: SharedPreferences =
        context.getSharedPreferences("metafit", Context.MODE_PRIVATE)

    fun storeString(key: String, value: String) {
        security.edit().putString(key, value).apply()
    }

//    fun storeGoalsList(key: String, value: List<Goal>) {
//        security.edit().putStringSet(key, value.map { it.getTitle() }.toSet()).apply()
//    }

    fun getStoredString(key: String): String {
        return security.getString(key, "") ?: ""
    }

    fun removeStoredString(key: String) {
        security.edit().remove(key).apply()
    }
}