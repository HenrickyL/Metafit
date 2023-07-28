package br.com.ufc.metafit.ui

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import br.com.ufc.metafit.R
import br.com.ufc.metafit.adapters.ItemListAdapter
import br.com.ufc.metafit.data.Mock
import br.com.ufc.metafit.databinding.FragmentGroupGoalListBinding
import br.com.ufc.metafit.models.User

class GroupMembersListFragment : Fragment(R.layout.fragment_group_membrer_list) {
    private lateinit var binding: FragmentGroupGoalListBinding
    private lateinit var listAdapter: ItemListAdapter<User>

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        binding = FragmentGroupGoalListBinding.inflate(inflater, container, false)
        return binding.root
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
    }
    private fun setupRecyclerView() {
        // Obtenha a lista de grupos do seu modelo de dados ou de qualquer outra fonte de dados
        val userList = Mock().getAllUser()

        listAdapter = ItemListAdapter(userList, R.layout.item_member) { itemView, user ->
            val name = itemView.findViewById<TextView>(R.id.tvName)
            val username = itemView.findViewById<TextView>(R.id.tvUsername)
            val memberImage = itemView.findViewById<ImageView>(R.id.ivOwner)
            name.text = user.name
            username.text = user.username
            memberImage.setImageResource(if (user.isOwner) R.drawable.icon_owner else R.drawable.icon_user)
        }

        listAdapter.setOnItemClickListener { group ->
            // Lógica para lidar com o clique em um grupo
        }

        binding.groupRecyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = listAdapter
        }

        listAdapter.setOnItemClickListener { goal ->

        }
    }
}