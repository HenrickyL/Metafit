import { Group, User, GroupMember, Invite } from "@prisma/client";

export interface UserModel extends User{
    groups?:                GroupMember[]
    groupsOwned?:           Group[]
    sendedInvites?:         Invite[]
    receivedInvites?:       Invite[]
    favoritedGroups?:       Group[]
}