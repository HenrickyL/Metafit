//package br.com.ufc.metafit.adapters
//
//import android.view.LayoutInflater
//import android.view.ViewGroup
//import androidx.recyclerview.widget.RecyclerView
//import br.com.ufc.metafit.data.GroupData
//import br.com.ufc.metafit.R
//
//class GroupAdapter(private val groups: List<GroupData>) : RecyclerView.Adapter<GroupAdapter.GroupViewHolder>() {
//
//    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GroupViewHolder {
//        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_group, parent, false)
//        return GroupViewHolder(view)
//    }
//
//    override fun onBindViewHolder(holder: GroupViewHolder, position: Int) {
//        val group = groups[position]
//        holder.bind(group)
//    }
//
//    override fun getItemCount(): Int {
//        return groups.size
//    }
//
//    inner class GroupViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
//
//        private val nameTextView: TextView = itemView.findViewById(R.id.textViewName)
//
//        fun bind(group: Group) {
//            nameTextView.text = group.name
//
//            itemView.setOnClickListener {
//                // Ação a ser realizada quando o item for clicado
//                Toast.makeText(itemView.context, "Group clicked: ${group.name}", Toast.LENGTH_SHORT).show()
//            }
//        }
//    }
//}