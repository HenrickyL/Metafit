package br.com.ufc.metafit.api.user

import br.com.ufc.metafit.data.User
import br.com.ufc.metafit.data.UserFormRegister
import br.com.ufc.metafit.data.UserRegister
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface UserService {


    @GET("users/{username}")
    fun getUser(@Header("Authorization") token: String ,@Path("username") username: String): Call<User>

    @PUT("users/{usernamee}")
    fun updateUser(
        @Header("Authorization") token: String,
        @Path("usernamee") usernamee: String,
        @Field("username") username: String,
        @Field("name") name: String
    ): Call<ResponseBody>

    @POST("users")
    @FormUrlEncoded
    fun registerUser(
        @Field("name") name: String,
        @Field("username") username: String,
        @Field("email") email: String,
        @Field("password") password: String
    ): Call<UserRegister>

}
/*
*  val name: String?,
    val username: String?,
    val email: String?,
    val password: String?
*  */