package br.com.ufc.metafit.ui

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.ActivityCreateGroupBinding

class CreateGroupActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityCreateGroupBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCreateGroupBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.createGroupButton.setOnClickListener(this)

        setupToolBar()
    }
    override fun onClick(v: View?) {
        if (v?.id == R.id.create_group_button) {
            handleCreateGroup()
        }
    }
    private fun setupToolBar() {
        val toolbar = binding.toolbar
        setSupportActionBar(toolbar)

        // Habilitar o botão de retorno à tela anterior
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        toolbar.setNavigationOnClickListener {
            onBackPressed()
        }
    }
    private fun handleCreateGroup() {
        val title = binding.createGroupName.text.toString()
        val description = binding.createGroupDescription.text.toString()

        if (title == "" || description == "") {
            Toast.makeText(this, "Preencha todos os campos!", Toast.LENGTH_SHORT).show()
        } else {
            //val goal = Goal(title, description)
            Toast.makeText(this, "Meta criada com sucesso!", Toast.LENGTH_SHORT).show()

            finish()
        }
    }
}