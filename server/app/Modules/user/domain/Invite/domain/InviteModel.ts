import { Goal, Group, Invite, User } from "@prisma/client";

export interface InviteModel extends Invite{
    sender?:                User
    receiver?:              User     
    senderGroup?:           Group
    receiverGroup?:         Group
    senderGoal?:            Goal
    receiverGoal?:          Goal
}