package br.com.ufc.metafit.api

import com.google.gson.JsonObject
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface ApiService {
    @GET("users/{username}")
    fun getRetrieveUser(@Path(value = "username", encoded = true) username: String): Call<JsonObject>

    @GET("users/sort/{sortField}/{sortOrder}")
    fun retrieveAllUsers(
        @Path(value = "sortField", encoded = true) sortField: String,
        @Path(value = "sortOrder", encoded = true) sortOrder: String
    ): Call<JsonObject>

    @GET("users/{username}/groups/sort/{sortField}/{sortOrder}")
    fun retrieveUserGroups(
        @Path(value = "username", encoded = true) username: String,
        @Path(value = "sortField", encoded = true) sortField: String,
        @Path(value = "sortOrder", encoded = true) sortOrder: String
    ): Call<JsonObject>

    @GET("groups/sort/{sortField}/{sortOrder}")
    fun retrieveAllPublicGroups(
        @Path(value = "sortField", encoded = true) sortField: String,
        @Path(value = "sortOrder", encoded = true) sortOrder: String
    ): Call<JsonObject>

}