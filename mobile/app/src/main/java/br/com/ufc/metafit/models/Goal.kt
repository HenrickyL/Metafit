import br.com.ufc.metafit.adapters.ItemList
import java.util.*

data class Goal(
    val id: String,
    val groupId: String,
    val createdById: String,
    val title: String,
    val description: String,
    val categoryId: Int,
    val target: Int,
    val progress: Int,
    val type: GoalType,
    val recurrence: Recurrence?,
    val frequency: Int?,
    val startDate: Date?,
    val endDate: Date?,
    val createdAt: Date,
    val updatedAt: Date?
): ItemList {

}

enum class GoalType {
    ONCE,
    RECURRING
}

enum class Recurrence {
    DAILY,    // Diariamente
    WEEKLY,   // Semanalmente
    MONTHLY   // Mensalmente
}