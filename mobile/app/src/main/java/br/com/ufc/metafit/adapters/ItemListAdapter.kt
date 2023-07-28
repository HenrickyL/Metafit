package br.com.ufc.metafit.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class ItemListAdapter<T : ItemList>(
    private val itemList: List<T>,
    private val layoutResId: Int,
    private val bindHolder: (View, T) -> Unit
) : RecyclerView.Adapter<ItemListAdapter<T>.ItemViewHolder>() {

    private var onItemClickListener: ((T) -> Unit)? = null

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        init {
            itemView.setOnClickListener {
                val position = adapterPosition
                if (position != RecyclerView.NO_POSITION) {
                    val item = itemList[position]
                    onItemClickListener?.invoke(item)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(layoutResId, parent, false)
        return ItemViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val item = itemList[position]
        bindHolder(holder.itemView, item)
    }

    override fun getItemCount(): Int {
        return itemList.size
    }

    fun setOnItemClickListener(listener: (T) -> Unit) {
        onItemClickListener = listener
    }
}
