package br.com.ufc.metafit.ui

import Goal
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import br.com.ufc.metafit.R
import br.com.ufc.metafit.adapters.ItemListAdapter
import br.com.ufc.metafit.data.Mock
import br.com.ufc.metafit.databinding.FragmentGoalsBinding

class GoalsFragment: Fragment(R.layout.fragment_goals) {
    private lateinit var binding: FragmentGoalsBinding
    private lateinit var groupListAdapter: ItemListAdapter<Goal>

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentGoalsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val goals = getGoals()
        // Configure o ListView e o ListViewAdapter
        setupRecyclerView()
    }
    private fun getGoals(): List<Goal> {
        // Simulação para obter uma lista de metas
        return Mock().getAllGoals()
    }
    private fun setupRecyclerView() {
        // Obtenha a lista de grupos do seu modelo de dados ou de qualquer outra fonte de dados
        val groupList = Mock().getAllGoals()

        groupListAdapter = ItemListAdapter<Goal>(groupList, R.layout.item_goal){ itemView, goal ->
            val groupNameTextView = itemView.findViewById<TextView>(R.id.title)
            groupNameTextView.text = goal.title
        }

        binding.recyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = groupListAdapter
        }

        groupListAdapter.setOnItemClickListener { group ->

        }
    }
}

