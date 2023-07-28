import { Group, User, GroupMember, GroupCategory, Invite, Goal } from "@prisma/client";

export interface GroupModel extends  Group {
    owner?:                 User
    members?:                   GroupMember[]
    categories?:                GroupCategory[]
    sendedGroupInvites?:        Invite[]
    receivedGroupInvites?:      Invite[]
    goals?:                     Goal[]
}