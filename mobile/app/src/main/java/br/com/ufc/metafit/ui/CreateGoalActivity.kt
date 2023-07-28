package br.com.ufc.metafit.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.ActivityCreateGoalBinding
import Goal
import android.content.Intent

class CreateGoalActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityCreateGoalBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCreateGoalBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.createGoalButton.setOnClickListener(this)
        setupToolBar()
    }

    override fun onClick(v: View?) {
        if (v?.id == R.id.create_goal_button) {
            handleCreateGoal()
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

    private fun handleCreateGoal() {
        val title = binding.createGoalName.text.toString()
        val description = binding.createGoalDescription.text.toString()

        if (title == "" || description == "") {
            Toast.makeText(this, "Preencha todos os campos!", Toast.LENGTH_SHORT).show()
        } else {
            //val goal = Goal(title, description)
            Toast.makeText(this, "Meta criada com sucesso!", Toast.LENGTH_SHORT).show()

            finish()
        }
    }
}