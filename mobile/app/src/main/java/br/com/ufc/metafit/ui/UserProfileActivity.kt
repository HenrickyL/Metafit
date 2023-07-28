package br.com.ufc.metafit.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.ActivityUserProfileBinding
import br.com.ufc.metafit.infra.MetaFitConstants
import br.com.ufc.metafit.infra.SecurityPreferences

class UserProfileActivity : AppCompatActivity(), View.OnClickListener {
    lateinit var binding: ActivityUserProfileBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityUserProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.buttonSave.setOnClickListener(this)
        setupToolBar()
        binding.editTextEmail.setText(SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_EMAIL))
        binding.editTextName.setText(SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_NAME))
        binding.editTextPassword.setText(SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_PASSWORD))

        Toast.makeText(this, "Usuário de ID: ${SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_ID)}", Toast.LENGTH_SHORT).show()
    }
    private fun setupToolBar(){
        val toolbar = binding.toolbar;
        setSupportActionBar(toolbar)
        toolbar.setOnClickListener {
            finish() // Retorna à tela anterior
        }
        // Habilitar o botão de retorno à tela anterior
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        toolbar.setNavigationOnClickListener {
            navigateToHomeActivity()
        }
    }
    private fun navigateToHomeActivity() {
        val intent = Intent(this, HomeActivity::class.java)
        startActivity(intent)
        finish() // Finalizar a activity atual se necessário
    }
    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.buttonSave -> {
                SecurityPreferences(this).storeString(
                    MetaFitConstants.KEY.USER_EMAIL,
                    binding.editTextEmail.text.toString()
                )
                SecurityPreferences(this).storeString(
                    MetaFitConstants.KEY.USER_NAME,
                    binding.editTextName.text.toString()
                )
                SecurityPreferences(this).storeString(
                    MetaFitConstants.KEY.USER_PASSWORD,
                    binding.editTextPassword.text.toString()
                )
                Toast.makeText(this, "Seus dados foram atualizados!", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this, HomeActivity::class.java))
            }
        }
    }
}