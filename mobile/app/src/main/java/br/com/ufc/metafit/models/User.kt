package br.com.ufc.metafit.models

import android.graphics.Bitmap
import br.com.ufc.metafit.adapters.ItemList
import br.com.ufc.metafit.data.GroupData
import br.com.ufc.metafit.data.Mock
import java.util.*
data class User(
    val id: String,
    val username: String,
    val name: String,
    val email: String,
    val imageUrl: String?,
    val createdAt: Date,
    val updatedAt: Date?,
    val password: String,
    val isOwner: Boolean = false,
    var imageBitmap: Bitmap? = null,

    ) : ItemList{
    fun getItemId(): String {
        return id
    }
}