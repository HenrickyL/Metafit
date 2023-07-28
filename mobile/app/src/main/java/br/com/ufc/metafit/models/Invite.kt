package br.com.ufc.metafit.models

import br.com.ufc.metafit.adapters.ItemList
import java.util.*

data class Invite(
    val id: String,
    val type: InviteType,
    val status: InviteStatus,
    val senderId: String,
    val receiverId: String,
    val senderGroupId: String?,
    val receiverGroupId: String?,
    val senderGoalId: String?,
    val receiverGoalId: String?,
    val expiration: Date,
    val createdAt: Date,
    val updatedAt: Date?
): ItemList{

}

enum class InviteType {
    FRIENDSHIP,
    GROUP_REQUEST,
    GROUP_INVITATION,
    GOAL_REQUEST,
    GOAL_INVITATION
}

enum class InviteStatus {
    ACTIVE,
    INACTIVE,
    EXPIRED
}