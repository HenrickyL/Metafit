package br.com.ufc.metafit.models

import android.graphics.Bitmap
import br.com.ufc.metafit.adapters.ItemList
import com.google.gson.annotations.SerializedName
import java.util.*

data class Group(
    @SerializedName("id")
    private val id: String = "",

    @SerializedName("name")
    private val name: String = "",

    @SerializedName("description")
    private val description: String = "",

    @SerializedName("isPrivate")
    private val isPrivate: Boolean = false,

    val ownerUsername: String?,
    val ownerId: String,
    val isFavorite: Boolean?,
    val imageUrl: String?,
    val createdAt: Date,
    val updatedAt: Date?,
    var imageBitmap: Bitmap? = null,
    ): ItemList {

    fun getId(): String {
        return id
    }


    fun getName(): String {
        return name
    }

    fun getDescription(): String {
        return description
    }

    fun getIsPrivate(): Boolean {
        return isPrivate
    }

    fun getItemId(): String {
        return id
    }
}