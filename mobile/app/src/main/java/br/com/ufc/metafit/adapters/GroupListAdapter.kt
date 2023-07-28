package br.com.ufc.metafit.adapters
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.com.ufc.metafit.R
import br.com.ufc.metafit.data.GroupData

class GroupListAdapter(private val groupList: List<GroupData>) :
    RecyclerView.Adapter<GroupListAdapter.GroupViewHolder>() {
    private var onItemClickListener: ((GroupData) -> Unit)? = null

    inner class GroupViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val groupNameTextView: TextView = itemView.findViewById(R.id.groupNameTextView)

        init {
            itemView.setOnClickListener {
                val position = adapterPosition
                if (position != RecyclerView.NO_POSITION) {
                    val group = groupList[position]
                    onItemClickListener?.invoke(group)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GroupViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.layout_group_card, parent, false)
        return GroupViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: GroupViewHolder, position: Int) {
        val group = groupList[position]
        holder.groupNameTextView.text = group.name
    }

    override fun getItemCount(): Int {
        return groupList.size
    }

    fun setOnItemClickListener(listener: (GroupData) -> Unit) {
        onItemClickListener = listener
    }
}
