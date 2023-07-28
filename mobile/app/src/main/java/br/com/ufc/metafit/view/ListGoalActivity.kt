package br.com.ufc.metafit.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.ActivityListGoalBinding

class ListGoalActivity : AppCompatActivity() {
    private lateinit var binding: ActivityListGoalBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityListGoalBinding.inflate(layoutInflater)
        setContentView(binding.root)

    }
}