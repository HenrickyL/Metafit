package br.com.ufc.metafit.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import br.com.ufc.metafit.R
import br.com.ufc.metafit.api.RetrofitClient
import br.com.ufc.metafit.api.user.UserService
import br.com.ufc.metafit.data.Mock
import br.com.ufc.metafit.data.UserRegister
import br.com.ufc.metafit.databinding.ActivitySingUpBinding
import br.com.ufc.metafit.infra.MetaFitConstants
import br.com.ufc.metafit.infra.SecurityPreferences
import br.com.ufc.metafit.models.User
import retrofit2.Call
import java.util.*

class SingUpActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivitySingUpBinding
    private lateinit var name: String
    private lateinit var email: String
    private lateinit var password: String
    private lateinit var username: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySingUpBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btSignup.setOnClickListener(this)
        binding.btGoSignin.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        if (v?.id == R.id.bt_signup) {
            handleSave()
        }
        else if (v?.id == R.id.bt_go_signin) {
            handleSingin()
        }
    }

    private fun handleSingin() {
        Toast.makeText(this, "Logar", Toast.LENGTH_SHORT).show()
        SecurityPreferences(this).storeString("USER_EMAIL", "")
        SecurityPreferences(this).storeString("USER_NAME", "")
        SecurityPreferences(this).storeString("USER_PASSWORD", "") // Remover depois
        SecurityPreferences(this).storeString("USER_USERNAME", "")
        startActivity(Intent(this, LoginActivity::class.java))
    }

    private fun handleSave() {
        name = binding.inputName.text.toString()
        email = binding.inputEmail.text.toString()
        password = binding.inputPassword.text.toString()
        username = binding.inputUsername.text.toString()
        if (name == "" && email == "" && password == "" && username == "") {
            Toast.makeText(this, "Preencha todos os campos!", Toast.LENGTH_SHORT).show()
        } else {
//            val userData = UserFormRegister(name, email, password, username)
            val service = RetrofitClient.createService(UserService::class.java)
            val call: Call<UserRegister> = service.registerUser(name, username, email, password)


            call.enqueue(object : retrofit2.Callback<UserRegister> {
                override fun onResponse(call: Call<UserRegister>, response: retrofit2.Response<UserRegister>) {
                    if (response.isSuccessful) {
                        val user = response.body()!!
                        SecurityPreferences(this@SingUpActivity).storeString(
                            MetaFitConstants.KEY.USER_EMAIL,
                            user.email
                        )
//                        SecurityPreferences(this@SingUpActivity).storeString(MetaFitConstants.KEY.USER_NAME, user.name)
//                        SecurityPreferences(this@SingUpActivity).storeString(
//                            MetaFitConstants.KEY.USER_PASSWORD,
//                            user.password
//                        )
                        SecurityPreferences(this@SingUpActivity).storeString(
                            MetaFitConstants.KEY.USER_USERNAME,
                            user.username
                        )
//                        SecurityPreferences(this@SingUpActivity).storeString(MetaFitConstants.KEY.USER_ID, user.id)
                        Toast.makeText(this@SingUpActivity, "Cadastro realizado com sucesso!", Toast.LENGTH_SHORT)
                            .show()
                        startActivity(Intent(this@SingUpActivity, LoginActivity::class.java))
                        finish()
                    }
                }

                override fun onFailure(call: Call<UserRegister>, t: Throwable) {
                    Toast.makeText(this@SingUpActivity, "Erro ao cadastrar!", Toast.LENGTH_SHORT).show()
                }
            }
            )
        }
    }

}