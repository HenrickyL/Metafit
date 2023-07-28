package br.com.ufc.metafit.ui

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.view.animation.AlphaAnimation
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.LinearLayout
import br.com.ufc.metafit.R

class FilterBar(context: Context, attrs: AttributeSet) : LinearLayout(context, attrs) {
    private lateinit var searchEditText: EditText
    private lateinit var filterButton: ImageButton
    //private lateinit var searchIcon: ImageView

    init {
        LayoutInflater.from(context).inflate(R.layout.layout_filter_bar, this, true)
        orientation = HORIZONTAL
        setPadding(8, 8, 8, 8)
        searchEditText = findViewById(R.id.searchEditText)
        filterButton = findViewById(R.id.filterButton)
        //searchIcon = findViewById(R.id.searchIcon)

        filterButton.setOnClickListener {
            showFilterOptions()
        }
    }

    private fun showFilterOptions() {
        // Implemente a lógica para exibir as opções de filtro (menu ou caixa de diálogo)
    }

    fun getSearchQuery(): String {
        return searchEditText.text.toString().trim()
    }

    fun setOnFilterOptionsListener(listener: () -> Unit) {
        filterButton.setOnClickListener {
            listener.invoke()
        }
    }
    //
    /*fun setupSearchIconClickListener() {
        searchIcon.setOnClickListener {
            toggleSearchEditTextVisibility()
        }
    }*/

    private fun toggleSearchEditTextVisibility() {
        if (searchEditText.visibility == View.VISIBLE) {
            hideSearchEditText()
        } else {
            showSearchEditText()
        }
    }
    private fun hideSearchEditText() {
        val fadeOutAnimation = AlphaAnimation(1.0f, 0.0f)
        fadeOutAnimation.duration = 200
        searchEditText.startAnimation(fadeOutAnimation)
        searchEditText.visibility = View.GONE
        //searchIcon.visibility = View.VISIBLE
    }

    private fun showSearchEditText() {
        val fadeInAnimation = AlphaAnimation(0.0f, 1.0f)
        fadeInAnimation.duration = 200
        searchEditText.startAnimation(fadeInAnimation)
        searchEditText.visibility = View.VISIBLE
        //searchIcon.visibility = View.GONE
    }

    // Adicione métodos para armazenar e obter informações de filtros conforme necessário
}
