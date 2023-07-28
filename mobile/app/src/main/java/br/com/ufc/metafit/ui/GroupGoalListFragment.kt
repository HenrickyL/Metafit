package br.com.ufc.metafit.ui

import Goal
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
import br.com.ufc.metafit.databinding.FragmentGroupGoalListBinding

class GroupGoalListFragment : Fragment(R.layout.fragment_group_goal_list) {
    private lateinit var binding: FragmentGroupGoalListBinding
    private lateinit var listAdapter: ItemListAdapter<Goal>

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
        val goalList = Mock().getAllGoals()

        listAdapter = ItemListAdapter(goalList, R.layout.item_goal) { itemView, goal ->
            val groupNameTextView = itemView.findViewById<TextView>(R.id.title)
            groupNameTextView.text = goal.title
        }

        listAdapter.setOnItemClickListener { group ->
            // Lógica para lidar com o clique em um grupo
        }

        binding.groupRecyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = listAdapter
        }

        listAdapter.setOnItemClickListener { goal ->
            val intent = Intent(requireContext(), GroupDetailActivity::class.java)
            intent.putExtra("group_id", goal.id)
            intent.putExtra("group_name", goal.title)
            intent.putExtra("group_description", goal.description)
            Toast.makeText(requireContext(), "Você entrou no grupo: ${goal.title}", Toast.LENGTH_SHORT).show()
            startActivity(intent)
        }
    }
}