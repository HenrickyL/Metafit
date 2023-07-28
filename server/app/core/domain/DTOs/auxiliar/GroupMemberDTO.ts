import { GroupResponse } from "../GroupDTO"
import { UserResponse } from "../userDTO"

export type GroupMemberResponse = {
    id:                 string
    groupId:            string
    userId:             string
    createdAt:          Date

    group?:             GroupResponse
    user?:              UserResponse
}