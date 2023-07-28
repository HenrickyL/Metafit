package br.com.ufc.metafit.adapters
import android.content.Context
import android.graphics.*
import android.graphics.drawable.Drawable
import android.graphics.drawable.GradientDrawable
import android.widget.ImageView

class ImageAdapter {
    fun applyOpacityGradient(context: Context, imageView: ImageView, imageResId: Int): Bitmap? {
        val drawable: Drawable? = context.getDrawable(imageResId)
        imageView.setImageDrawable(drawable)

        val gradientColors = intArrayOf(Color.TRANSPARENT, Color.WHITE)
        val gradientDrawable = GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM, gradientColors)

        val bitmap = drawableToBitmap(drawable)
        val maskedBitmap = applyMask(bitmap, gradientDrawable)

        imageView.setImageBitmap(maskedBitmap)
        return maskedBitmap
    }

    private fun drawableToBitmap(drawable: Drawable?): Bitmap? {
        if (drawable == null) return null

        val bitmap = Bitmap.createBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }

    private fun applyMask(bitmap: Bitmap?, mask: GradientDrawable): Bitmap? {
        if (bitmap == null) return null

        val maskedBitmap = Bitmap.createBitmap(bitmap.width, bitmap.height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(maskedBitmap)

        val paint = Paint()
        paint.isAntiAlias = true
        paint.xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_IN)

        val bounds = Rect(0, 0, bitmap.width, bitmap.height)

        // Desenhar a imagem original
        canvas.drawBitmap(bitmap, bounds, bounds, null)

        // Desenhar o gradiente como máscara
        mask.bounds = bounds
        mask.draw(canvas)

        // Aplicar a máscara na imagem
        canvas.drawBitmap(bitmap, bounds, bounds, paint)

        return maskedBitmap
    }
}

