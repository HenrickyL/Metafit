package br.com.ufc.metafit.api.session

import retrofit2.Call
import br.com.ufc.metafit.data.Session
import br.com.ufc.metafit.data.UserLogin
import retrofit2.http.*

interface SessionService {

    @POST("sessions")
    @FormUrlEncoded
    fun login(@Field("username") username:String, @Field("password") password:String): Call<Session>

}