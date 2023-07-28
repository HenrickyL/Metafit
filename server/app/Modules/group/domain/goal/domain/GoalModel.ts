import { Goal, Group, User, Achievement, Invite, Category } from "@prisma/client"

export interface GoalModel extends Goal{
    createdBy?:         User
    group?:             Group
    achievements?:      Achievement[]
    users?:             User[]
    favoritedBy?:       User[]
    invitesSent?:       Invite[]
    invitesReceived?:   Invite[]
    category?:          Category
}