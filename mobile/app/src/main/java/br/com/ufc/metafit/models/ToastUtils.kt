package br.com.ufc.metafit.models
import android.content.Context
import android.view.Gravity
import android.widget.Toast
import androidx.core.content.ContextCompat
import br.com.ufc.metafit.R

class ToastUtils {
    companion object {
        fun showCustomToast(context: Context, message: String, settings: ToastSettings?) {
            val currentSetting: ToastSettings = if (settings != null) settings else ToastSettings(
                ContextCompat.getColor(context, R.color.textPrimary),
                ContextCompat.getColor(context, R.color.info),
                Toast.LENGTH_SHORT,
                Gravity.CENTER
            )

            /*val toast = Toast.makeText(context, message, currentSetting.len)
            val toastLayout = toast.vi
            toast.view = toastLayout
            toast.setGravity(currentSetting.position, 0, 0)
            toast.show()*/
        }
    }
}

data class ToastSettings(val textColor: Int, val backgroundColor: Int, val len: Int, val position: Int)