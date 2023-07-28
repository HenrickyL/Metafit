package br.com.ufc.metafit.ui

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.FragmentHomeBinding
import br.com.ufc.metafit.infra.SecurityPreferences
import com.google.android.material.tabs.TabLayout

class HomeFragment: Fragment(R.layout.fragment_home) {
    private lateinit var binding: FragmentHomeBinding
    private lateinit var securityPreferences: SecurityPreferences

    override fun onAttach(context: Context) {
        super.onAttach(context)
        securityPreferences = SecurityPreferences(requireContext())
    }
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setUserInfo()
        setupViews()
        userSideBar()
    }

    private fun setUserInfo(){
        var username = securityPreferences.getStoredString("USER_USERNAME")
        binding.username.text = username;
    }
    private fun setupViews() {
        val tabLayout = binding.tabLayout
        val viewPager = binding.viewPager
        val tabTitles = listOf(getString(R.string.tab_group), getString(R.string.tab_goal), getString(R.string.tab_invite))
        val adapter = HomePagerAdapter(childFragmentManager, tabTitles)
        viewPager.adapter = adapter
        tabLayout.tabMode = TabLayout.MODE_SCROLLABLE
        tabLayout.setupWithViewPager(viewPager)
        // Seleciona a primeira aba
        viewPager.currentItem = 0
    }
    private fun userSideBar(){
        binding.profileImage.setOnClickListener {
            val drawerLayout = requireActivity().findViewById<DrawerLayout>(R.id.drawerLayout)
            drawerLayout.openDrawer(GravityCompat.START)
        }
    }
}

class HomePagerAdapter(fragmentManager: FragmentManager, private val tabTitles: List<String>) : FragmentPagerAdapter(fragmentManager) {
    private val fragmentList = listOf(GroupFragment(), GoalsFragment(), InviteFragment())

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