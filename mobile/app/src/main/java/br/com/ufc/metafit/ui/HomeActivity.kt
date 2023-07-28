package br.com.ufc.metafit.ui

import ExplorerFragment
import android.content.Intent
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import br.com.ufc.metafit.R
import br.com.ufc.metafit.api.RetrofitClient
import br.com.ufc.metafit.api.user.UserService
import br.com.ufc.metafit.data.User
import br.com.ufc.metafit.databinding.ActivityHomeBinding
import br.com.ufc.metafit.infra.MetaFitConstants
import br.com.ufc.metafit.infra.SecurityPreferences
import retrofit2.Call

class HomeActivity  : AppCompatActivity(), View.OnClickListener{
    private lateinit var binding: ActivityHomeBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        verifyDataUserAsUpdate()
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupNavigationViewUserMenu()
        //sideBar()
        bottomNavigationMenu()
        val profileUsernameTextView = findViewById<TextView>(R.id.profileUsername)


    }

    override fun onClick(p0: View?) {
        TODO("Not yet implemented")
    }
    private fun setupLogoff(){
        Toast.makeText(this, "logoff", Toast.LENGTH_SHORT).show()
        SecurityPreferences(this).removeStoredString(MetaFitConstants.KEY.USER_EMAIL)
        SecurityPreferences(this).removeStoredString(MetaFitConstants.KEY.USER_NAME)
        SecurityPreferences(this).removeStoredString(MetaFitConstants.KEY.USER_PASSWORD) // Remover depois
        SecurityPreferences(this).removeStoredString(MetaFitConstants.KEY.USER_USERNAME)
        SecurityPreferences(this).removeStoredString(MetaFitConstants.KEY.USER_TOKEN)
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }

    /////////////////////////////////////
    private fun setCurrentFragment(fragment: Fragment)=
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.flFragment,fragment)
            commit()
        }
    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.flFragment, fragment)
            .commit()
    }

    private fun setupNavigationViewUserMenu(){
        val navigationView = binding.navigationView
        val headerView = navigationView.getHeaderView(0)
        val profileUsernameTextView = headerView.findViewById<TextView>(R.id.profileUsername)
        val profileNameTextView = headerView.findViewById<TextView>(R.id.profileName)

        profileNameTextView.text = SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_NAME)
        profileUsernameTextView.text = SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_USERNAME)

        navigationView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.userMenu_profile -> {
                    startActivity(Intent(this, UserProfileActivity::class.java))
                    true
                }
                R.id.userMenu_notification -> {
                    Toast.makeText(this, "Notification", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.userMenu_settings -> {
                    Toast.makeText(this, "Settings", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.userMenu_about -> {
                    Toast.makeText(this, "About", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.userMenu_logoff -> {
                    setupLogoff()
                    true
                }
                // Adicione mais casos para outros itens do menu, se necessário
                else -> false
            }
        }
    }
    /*private fun sideBar(){
        val drawerLayout = binding.drawerLayout;
        binding.profileImage.setOnClickListener(View.OnClickListener {
            drawerLayout.openDrawer(GravityCompat.START)
        })
    }*/
    private fun bottomNavigationMenu(){
        val homeFragment= HomeFragment()
        val goalsFragment= GoalsFragment()
        val explorerFragment = ExplorerFragment()
        setCurrentFragment(homeFragment)
        binding.bottomNavigationView.setOnItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.menu_view_home -> {
                    // Carregar o Fragment correspondente ao item 1
                    loadFragment(homeFragment)
                    true
                }
                R.id.menu_view_explore -> {
                    loadFragment(explorerFragment)
                    true
                }
                R.id.menu_view_statistics -> {
                    loadFragment(goalsFragment)
                    true
                }
                else -> false
            }
        }
    }
    private fun getDataUser() {
        val token = "Bearer " + SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_TOKEN)
        val username = SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_USERNAME)
        val service = RetrofitClient.createService(UserService::class.java)
        val call: Call<User> = service.getUser(
            token,
            username
        )
        call.enqueue(object : retrofit2.Callback<User> {
            override fun onResponse(call: Call<User>, response: retrofit2.Response<User>) {
                if (response.isSuccessful) {
                    val session = response.body()!!
                    SecurityPreferences(this@HomeActivity).storeString(
                        MetaFitConstants.KEY.USER_ID,
                        session.id
                    )
                    SecurityPreferences(this@HomeActivity).storeString(
                        MetaFitConstants.KEY.USER_NAME,
                        session.name
                    )
                    SecurityPreferences(this@HomeActivity).storeString(
                        MetaFitConstants.KEY.USER_EMAIL,
                        session.email
                    )
                    SecurityPreferences(this@HomeActivity).storeString(
                        MetaFitConstants.KEY.USER_USERNAME,
                        session.username
                    )
                    Toast.makeText(
                        this@HomeActivity,
                        "Informações do usuario resgatadas com sucesso",
                        Toast.LENGTH_SHORT
                    ).show()
                    Toast.makeText(this@HomeActivity, "Nome: ${session.name}", Toast.LENGTH_SHORT).show()
                    Toast.makeText(this@HomeActivity, "Email: ${session.email}", Toast.LENGTH_SHORT).show()
                    Toast.makeText(this@HomeActivity, "Username: ${session.username}", Toast.LENGTH_SHORT).show()
                    Toast.makeText(this@HomeActivity, "Id: ${session.id}", Toast.LENGTH_SHORT).show()
                }
            }


            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(this@HomeActivity, "Erro ao resgatar as informações do usuario", Toast.LENGTH_SHORT)
                    .show()
            }
        })

    }

    private fun verifyDataUserAsUpdate() {
        if (SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_NAME) == "" ||
            SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_EMAIL) == "" ||
            SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_USERNAME) == "" ||
            SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_ID) == ""
        ) {
//            Toast.makeText(this@HomeActivity, "Nome: ${SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_NAME)}", Toast.LENGTH_SHORT).show()
//            Toast.makeText(this@HomeActivity, "Email: ${SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_EMAIL)}", Toast.LENGTH_SHORT).show()
//            Toast.makeText(this@HomeActivity, "Username: ${SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_USERNAME)}", Toast.LENGTH_SHORT).show()
//            Toast.makeText(this@HomeActivity, "Id: ${SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_ID)}", Toast.LENGTH_SHORT).show()
//            Toast.makeText(this@HomeActivity, "Token: ${SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_TOKEN)}", Toast.LENGTH_SHORT).show()

            getDataUser()
        }
    }
}