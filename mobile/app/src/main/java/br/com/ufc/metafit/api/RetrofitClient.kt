package br.com.ufc.metafit.api

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitClient {

    companion object {
        private lateinit var INSTANCE: Retrofit
        private const val BASE_URL = "http://192.168.0.16:5000/"
        private fun getRetrofitInstance(): Retrofit {
            val http = OkHttpClient.Builder()
            if (!Companion::INSTANCE.isInitialized) {
                INSTANCE = Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(http.build())
                    .build()
            }
            return INSTANCE
        }

        fun <S> createService(serviceClass: Class<S>): S {
            return getRetrofitInstance().create(serviceClass)
        }
    }
}