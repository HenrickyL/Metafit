package br.com.ufc.metafit.data

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id")
    val id: String,
    @SerializedName("username")
    val username: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("imageUrl")
    val imageUrl: String?,
    @SerializedName("createdAt")
    val createdAt: String,
    @SerializedName("updatedAt")
    val updatedAt: String,
    @SerializedName("groups")
    val groups: List<String>,
    @SerializedName("groupsOwned")
    val groupsOwned: List<String>,
    @SerializedName("sendedInvites")
    val sendedInvites: List<String>,
    @SerializedName("receivedInvites")
    val receivedInvites: List<String>,
    @SerializedName("favoritedGroups")
    val favoritedGroups: List<String>
)


data class Session(
    @SerializedName("userId")
    var userId: String = "",
    @SerializedName("token")
    var token: String = "",
    @SerializedName("username")
    var username: String = "",
)

data class UserRegister(
    @SerializedName("id")
    var id: String = "",

    @SerializedName("name")
    var name: String = "",

    @SerializedName("username")
    var username: String = "",

    @SerializedName("email")
    var email: String = "",

    @SerializedName("imageUrl")
    var imageUrl: String = "",

    @SerializedName("createdAt")
    var createdAt: String = ""

)

data class UserFormRegister(
    @SerializedName("name")
    var name: String?,

    @SerializedName("username")
    var username: String?,

    @SerializedName("email")
    var email: String?,

    @SerializedName("password")
    var password: String?,
)

data class UserLogin (
    @SerializedName("username")
    var username: String?,

    @SerializedName("password")
    var password: String?,
)


//data class ApiResponse(
//    @SerializedName("data")
//    val data: List<DataItem>,
//    @SerializedName("pagination")
//    val pagination: Pagination
//)

//data class DataItem(
//    // atributos dentro de "data" se houver
//)

data class Pagination(
    @SerializedName("totalCount")
    val totalCount: Int,
    @SerializedName("pageCount")
    val pageCount: Int,
    @SerializedName("currentPage")
    val currentPage: Int,
    @SerializedName("perPage")
    val perPage: Int
)
