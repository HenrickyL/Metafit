package br.com.ufc.metafit.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import br.com.ufc.metafit.R
import br.com.ufc.metafit.databinding.ActivityLoginBinding


class MainActivity : AppCompatActivity(), View.OnClickListener {
    lateinit var binding: ActivityLoginBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    override fun onClick(v: View?)  {
        if (v?.id == R.id.login_button) {
            Toast.makeText(this, "Login realizado com sucesso!", Toast.LENGTH_SHORT).show()
        }
    }
}