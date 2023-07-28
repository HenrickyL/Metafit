package br.com.ufc.metafit.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import br.com.ufc.metafit.R
import br.com.ufc.metafit.data.Mock
import br.com.ufc.metafit.infra.SecurityPreferences
import br.com.ufc.metafit.databinding.ActivityLoginBinding
import br.com.ufc.metafit.infra.MetaFitConstants
import br.com.ufc.metafit.api.RetrofitClient
import br.com.ufc.metafit.api.session.SessionService
import br.com.ufc.metafit.api.user.UserService
import br.com.ufc.metafit.data.*
import retrofit2.Call

class LoginActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btSignin.setOnClickListener(this)
        binding.btGoSignup.setOnClickListener(this)
        //validateData()
        verifySession()

    }

    // Lógica para verificar se o usuário já está logado (falta implementar)
//    private fun validateData() {
//        val username = SecurityPreferences(this).getStoredString("USER_USERNAME")
//        if (username != "") {
//            Toast.makeText(this, "Username salvo em cache", Toast.LENGTH_SHORT).show()
//            //startActivity(Intent(this, MainActivity::class.java))
//            //finish()
//        }else{
//            Toast.makeText(this, "Não salvo em cache", Toast.LENGTH_SHORT).show()
//        }
//    }
    override fun onClick(v: View?) {
        if (v?.id == R.id.bt_signin) {
            handleSave()
        } else if (v?.id == R.id.bt_go_signup) {
            handleSingUp()
        }
    }

    private fun handleSingUp() {
        Toast.makeText(this, "Cadastrar", Toast.LENGTH_SHORT).show()
        startActivity(Intent(this, SingUpActivity::class.java))
    }

    private fun handleSave() {
        val username = binding.inputUsername.text.toString()
        val password = binding.inputPassword.text.toString()
//        val username = "aaaaa"
//        val password = "Teste123"

        if (username == "" || password == "") {
            Toast.makeText(this, "Preencha todos os campos!", Toast.LENGTH_SHORT).show()
        } else {
            val service = RetrofitClient.createService(SessionService::class.java)
            val call: Call<Session> = service.login(username, password)
//            var session: Session
            call.enqueue(object : retrofit2.Callback<Session> {

                override fun onResponse(call: Call<Session>, response: retrofit2.Response<Session>) {

//                   val session = response.body()!!
                    if (response.isSuccessful) {
                        val session = response.body()!!

                        Toast.makeText(this@LoginActivity, "Usuário logado com sucesso!", Toast.LENGTH_SHORT).show()
                        SecurityPreferences(this@LoginActivity).storeString(
                            MetaFitConstants.KEY.USER_TOKEN,
                            session.token
                        )
                        SecurityPreferences(this@LoginActivity).storeString(
                            MetaFitConstants.KEY.USER_ID,
                            session.userId
                        )
                        SecurityPreferences(this@LoginActivity).storeString(
                            MetaFitConstants.KEY.USER_USERNAME,
                            session.username
                        )

                        startActivity(Intent(this@LoginActivity, HomeActivity::class.java))
                        finish()
                    }
                }

                override fun onFailure(call: Call<Session>, t: Throwable) {
                    Toast.makeText(this@LoginActivity, "Erro ao logar usuário!", Toast.LENGTH_SHORT).show()
                }
            })

//            if (session.userId == null) {
//                Toast.makeText(this, "Usuário ou senha inválidos!", Toast.LENGTH_SHORT).show()
//            } else if (user.password != password) {
//                Toast.makeText(this, "Usuário ou senha inválidos!", Toast.LENGTH_SHORT).show()
//            } else {
//                Toast.makeText(this, "Usuário logado com sucesso!", Toast.LENGTH_SHORT).show()
//                SecurityPreferences(this).storeString(MetaFitConstants.KEY.USER_ID,user.id)
//                SecurityPreferences(this).storeString(MetaFitConstants.KEY.USER_USERNAME, username)
//                SecurityPreferences(this).storeString(MetaFitConstants.KEY.USER_EMAIL, user.email)
//                SecurityPreferences(this).storeString(MetaFitConstants.KEY.USER_NAME, user.name)
//                SecurityPreferences(this).storeString(MetaFitConstants.KEY.USER_PASSWORD, user.password)
//                startActivity(Intent(this, HomeActivity::class.java))
//                finish()
//                //Toast.makeText(this, "Usuário cadastrado com sucesso!", Toast.LENGTH_SHORT).show()
//            }
        }
    }

    private fun verifySession() {
        val token = SecurityPreferences(this).getStoredString(MetaFitConstants.KEY.USER_TOKEN)
        if (token != "") {
            startActivity(Intent(this, HomeActivity::class.java))
            finish()
        }
    }


}