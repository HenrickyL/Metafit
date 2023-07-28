package br.com.ufc.metafit.data

import Goal
import br.com.ufc.metafit.models.*
import java.util.*

data class GoalData(
    val title: String,
    val description: String,
    val isFinished: Boolean = false
)

data class GroupData(
    val id: String,
    val name: String,
    val description: String,
    var isPrivate: Boolean = false
)

class Mock {

    private val groups = mutableListOf<Group>().apply {
        val random = Random(System.currentTimeMillis())
        for (i in 1..10) {
            val id = "group_$i"
            val name = "Group $i"
            val description = "Description of Group $i"
            val ownerUsername = "Owner_$i"
            val ownerId = "OwnerID_$i"
            val isFavorite = random.nextBoolean()
            val isPrivate = random.nextBoolean()
            val imageUrl = "https://example.com/image_$i.jpg"
            val createdAt = Date()
            val updateAt = Date()

            add(
                Group(
                id = id,
                name = name,
                description = description,
                ownerUsername = ownerUsername,
                ownerId = ownerId,
                isFavorite = isFavorite,
                isPrivate = isPrivate,
                imageUrl = imageUrl,
                createdAt = createdAt,
                updatedAt = updateAt)
            )
        }
    }


    //usuario para testes
    val users = mutableListOf(
        User("1", "henrickyL", "Henricky", "user1@example.com", null, Date(), null, "password1", true),
        User("2", "user2", "User 2", "user2@example.com", null, Date(), null, "password2"),
        User("3", "user3", "User 3", "user3@example.com", null, Date(), null, "password3"),
        User("4", "user4", "User 4", "user4@example.com", null, Date(), null, "password4"),
        User("5", "user5", "User 5", "user5@example.com", null, Date(), null, "password5")
    )

    fun generateRandomId(): String {
        return UUID.randomUUID().toString()
    }

    fun generateRandomDate(): Date {
        return Date()
    }

    val invitations = mutableListOf(
        Invite(
            generateRandomId(),
            InviteType.FRIENDSHIP,
            InviteStatus.EXPIRED,
            "senderId1",
            "receiverId1",
            null,
            null,
            null,
            null,
            generateRandomDate(),
            generateRandomDate(),
            null
        ),
        Invite(
            generateRandomId(),
            InviteType.GOAL_INVITATION,
            InviteStatus.ACTIVE,
            "senderId2",
            "receiverId2",
            "senderGroupId2",
            "receiverGroupId2",
            "senderGoalId2",
            "receiverGoalId2",
            generateRandomDate(),
            generateRandomDate(),
            generateRandomDate()
        ),
        Invite(
            generateRandomId(),
            InviteType.GOAL_INVITATION,
            InviteStatus.EXPIRED,
            "senderId3",
            "receiverId3",
            "senderGroupId3",
            "receiverGroupId3",
            "senderGoalId3",
            "receiverGoalId3",
            generateRandomDate(),
            generateRandomDate(),
            generateRandomDate()
        ),
        Invite(
            generateRandomId(),
            InviteType.GOAL_INVITATION,
            InviteStatus. ACTIVE,
            "senderId4",
            "receiverId4",
            null,
            null,
            null,
            null,
            generateRandomDate(),
            generateRandomDate(),
            null
        ),
        Invite(
            generateRandomId(),
            InviteType.GOAL_INVITATION,
            InviteStatus. INACTIVE,
            "senderId5",
            "receiverId5",
            "senderGroupId5",
            "receiverGroupId5",
            "senderGoalId5",
            "receiverGoalId5",
            generateRandomDate(),
            generateRandomDate(),
            null
        )
    )
    val goals = listOf(
        Goal(
            "1",
            "groupId1",
            "createdById1",
            "Ler 10 páginas",
            "Descrição da meta 1",
            1,
            100,
            80,
            GoalType.ONCE,
            null,
            null,
            null,
            null,
            Date(),
            null
        ),
        Goal(
            "2",
            "groupId2",
            "createdById2",
            "Reduzir Sal",
            "Descrição da meta 2",
            2,
            150,
            145,
            GoalType.RECURRING,
            Recurrence.DAILY,
            1,
            null,
            null,
            Date(),
            null
        ),
        Goal(
            "3",
            "groupId3",
            "createdById3",
            "Academia",
            "Descrição da meta 3",
            3,
            30,
            12,
            GoalType.RECURRING,
            Recurrence.WEEKLY,
            1,
            null,
            null,
            Date(),
            null
        ),
        Goal(
            "4",
            "groupId4",
            "createdById4",
            "Correr 5 km",
            "Descrição da meta 4",
            4,
            5,
            3,
            GoalType.RECURRING,
            Recurrence.MONTHLY,
            1,
            null,
            null,
            Date(),
            null
        ),
        Goal(
            "5",
            "groupId5",
            "createdById5",
            "Estudar por 2 horas",
            "Descrição da meta 5",
            5,
            120,
            90,
            GoalType.ONCE,
            null,
            null,
            null,
            null,
            Date(),
            null
        )
    )
    fun getAllInvites(): List<Invite>{
        return invitations
    }
    fun createGroup(group: Group) {
        groups.add(group)
    }
    fun getAllUser(): MutableList<br.com.ufc.metafit.models.User> {
        return users
    }

    fun getAllGroups(): List<Group> {
        return groups
    }

    fun createGoal(goal: Goal) {
        goals.toMutableList().add(goal)
    }

    fun getAllGoals(): List<Goal> {
        return goals
    }

    fun getGroupById(id: String): Group? {
        return groups.find { it.getId() == id }
    }

    fun existsUser(email: String, password:String): Boolean {
        return users.any { it.email == email && it.password == password }
    }

    fun getUserByUsername(username: String): br.com.ufc.metafit.models.User? {
        return users.find { it.username == username }
    }

//    fun addUser(user: User) {
//        users.add(user)
//    }
    fun getLastUserId(): String {
        return users.last().id
    }
}