package br.com.ufc.metafit.ui

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.ActivityGroupDetailBinding

class GroupDetailActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityGroupDetailBinding
    private var isFavorite: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGroupDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupToolBar()
        setupViews()
        setupFavoriteBt()
/*
        // Recuperar os dados do grupo do Intent
//        val groupId = intent.getStringExtra("group_id")
        val groupName = intent.getStringExtra("group_name")
        val groupDescription = intent.getStringExtra("group_description")
        // Preencher os campos do layout com os dados do grupo
        binding.textGroupName.text = groupName
        binding.textGroupDescription.text = groupDescription
        binding.buttonJoinGroup.setOnClickListener(this)*/
    }

    private fun setupToolBar() {
        val toolbar = binding.toolbar
        setSupportActionBar(toolbar)

        // Habilitar o botão de retorno à tela anterior
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        toolbar.setNavigationOnClickListener {
            onBackPressed()
        }

        // Definir o clique do botão de opções
        toolbar.setOnMenuItemClickListener { menuItem ->
            when (menuItem.itemId) {
                R.id.menu_createGroup -> {
                    startActivity(Intent(this, CreateGroupActivity::class.java))
                    Toast.makeText(this, "Criar Grupo", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.menu_editGroup -> {
                    Toast.makeText(this, "Editar Grupo", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.menu_goal_create_goal -> {
                    startActivity(Intent(this, CreateGoalActivity::class.java))
                    Toast.makeText(this, "Criar Meta", Toast.LENGTH_SHORT).show()
                    true
                }
                else -> false
            }
        }
    }


    private fun setupViews() {
        val tabLayout = binding.tabLayout
        val viewPager = binding.viewPager
        val tabTitles = listOf(getString(R.string.tab_group_goals), getString(R.string.tab_group_members))
        val fragmentList = listOf(GroupGoalListFragment(), GroupMembersListFragment())
        val adapter = TabAdapter(supportFragmentManager, tabTitles,fragmentList)
        viewPager.adapter = adapter
        tabLayout.setupWithViewPager(viewPager)
        // Seleciona a primeira aba
        viewPager.currentItem = 0
    }
    private fun setupFavoriteBt(){
        binding.ivFavorite.setOnClickListener {
            if(isFavorite){
                binding.ivFavorite.setImageResource(R.drawable.icon_favorite_out)
                Toast.makeText(this, "Deixou de Favoritar", Toast.LENGTH_SHORT).show()
            }else{
                binding.ivFavorite.setImageResource(R.drawable.icon_favorite_in)
                Toast.makeText(this, "Favoritou", Toast.LENGTH_SHORT).show()
            }
            isFavorite = !isFavorite
        }
    }

    override fun onClick(v: View?) {


    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_group_details, menu)
        return true
    }

}
class TabAdapter(fragmentManager: FragmentManager, private val tabTitles: List<String>, private val fragmentList: List<Fragment>) : FragmentPagerAdapter(fragmentManager) {

    override fun getCount(): Int {
        return fragmentList.size
    }

    override fun getItem(position: Int): Fragment {
        return fragmentList[position]
    }

    override fun getPageTitle(position: Int): CharSequence? {
        return tabTitles[position]
    }
}