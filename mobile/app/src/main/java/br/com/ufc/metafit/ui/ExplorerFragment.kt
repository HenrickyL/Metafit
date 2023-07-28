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
import br.com.ufc.metafit.adapters.GroupListAdapter
import br.com.ufc.metafit.adapters.ItemListAdapter
import br.com.ufc.metafit.data.Mock
import br.com.ufc.metafit.databinding.FragmentExplorerBinding
import br.com.ufc.metafit.databinding.FragmentGroupBinding
import br.com.ufc.metafit.models.Group
import br.com.ufc.metafit.ui.FilterBar
import br.com.ufc.metafit.ui.GroupDetailActivity


public class ExplorerFragment : Fragment(R.layout.fragment_explorer) {
    private var _binding: FragmentExplorerBinding? = null
    private val binding get() = _binding!!

    private lateinit var groupListAdapter: ItemListAdapter<Group>
    private lateinit var filterBar: FilterBar

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentExplorerBinding.inflate(inflater, container, false)
        filterBar = binding.filterBar
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
    }

    private fun setupRecyclerView() {
        // Obtenha a lista de grupos do seu modelo de dados ou de qualquer outra fonte de dados
        val groupList = Mock().getAllGroups()

        groupListAdapter = ItemListAdapter<Group>(groupList, R.layout.item_group){ itemView, group ->
            val groupNameTextView = itemView.findViewById<TextView>(R.id.g_title)
            val imageView = itemView.findViewById<ImageView>(R.id.groupBackgroundImage)
            groupNameTextView.text = group.getName()
            imageView.setImageResource(R.drawable.base_group_bg1)

        }

        binding.recyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = groupListAdapter
        }

        groupListAdapter.setOnItemClickListener { group ->
            val intent = Intent(requireContext(), GroupDetailActivity::class.java)
            intent.putExtra("group_id", group.getId())
            intent.putExtra("group_name", group.getName())
            intent.putExtra("group_description", group.getDescription())
            Toast.makeText(requireContext(), "Você entrou no grupo: ${group.getName()}", Toast.LENGTH_SHORT).show()
            startActivity(intent)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
