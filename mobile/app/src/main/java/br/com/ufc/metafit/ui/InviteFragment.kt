package br.com.ufc.metafit.ui
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import br.com.ufc.metafit.R
import br.com.ufc.metafit.adapters.ItemListAdapter
import br.com.ufc.metafit.data.Mock
import br.com.ufc.metafit.databinding.FragmentGroupBinding
import br.com.ufc.metafit.databinding.FragmentInviteBinding

import br.com.ufc.metafit.models.Group
import br.com.ufc.metafit.models.Invite

class InviteFragment : Fragment(R.layout.fragment_invite) {
    private lateinit var binding: FragmentInviteBinding

    private lateinit var listAdapter: ItemListAdapter<Invite>
    private lateinit var filterBar: FilterBar

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        binding = FragmentInviteBinding.inflate(inflater, container, false)
        filterBar = binding.filterBar
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
    }

    private fun setupRecyclerView() {
        // Obtenha a lista de grupos do seu modelo de dados ou de qualquer outra fonte de dados
        val groupList = Mock().getAllInvites()

        listAdapter = ItemListAdapter<Invite>(groupList, R.layout.item_invite){ itemView, invite ->
            val groupNameTextView = itemView.findViewById<TextView>(R.id.i_title)
            groupNameTextView.text = invite.id
        }

        binding.recyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = listAdapter
        }
        listAdapter.setOnItemClickListener { group ->

        }
    }

}
