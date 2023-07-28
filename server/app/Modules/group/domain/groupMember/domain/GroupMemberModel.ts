import { Group, GroupMember, User } from "@prisma/client"

export interface GroupMemberModel extends GroupMember{
    group?:     Group
    user?:      User
}
