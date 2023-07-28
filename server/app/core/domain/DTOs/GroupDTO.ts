import { GoalSummaryResponse } from "./GoalDTO"
import { UserResponse, UserSummaryResponse } from "./userDTO"
import { AchievementResponse } from "./AchievementDTO"
import { GroupCategoryResponse } from "./auxiliar/GroupCategoryDTO"
import { CategoryResponse, CategorySummaryResponse } from "./CategoryDTO"
import { FilterRetrieveGroupsFields, SortOrder, SortRetrieveGroupsFields } from "../enums"
import { InviteSummaryResponse } from "./InviteDTO"
import { PaginationRequest, PaginationResponse } from "."

export type RegisterGroupRequest = {
    name:               string
    ownerUsername:      string
    isPrivate:          boolean
    description?:       string
    imageUrl?:          string
    password?:          string
}

export interface GroupResponse extends GroupSummaryResponse {
    createdBy?:         UserResponse
    members?:           UserSummaryResponse[]
    goals?:             GroupSummaryResponse[]
    achievements?:      AchievementResponse[]
    categories?:        GroupCategoryResponse[]
    favoritedBy?:       UserSummaryResponse[]
}



export interface RetrieveGroupsRequest extends PaginationRequest<SortRetrieveGroupsFields, FilterRetrieveGroupsFields> {
    id?: string
    username?: string
}
export interface RetrieveGroupsPaginationResponse extends PaginationResponse<RetrieveGroupsResponse> {}

export interface RetrieveGroupsResponse extends GroupSummaryResponse {
    owner?:                     UserSummaryResponse
    members?:                   UserSummaryResponse[]
    categories?:                CategorySummaryResponse[]
    sendedGroupInvites?:        InviteSummaryResponse[]
    receivedGroupInvites?:      InviteSummaryResponse[]
    favoritedBy?:               UserSummaryResponse[]
    goals?:                     GoalSummaryResponse[]
}

export interface GroupSummaryResponse {
    id:                 string
    name:               string
    description:        string
    ownerUsername?:     string
    ownerId:            string
    isFavorite?:        boolean
    isPrivate?:         boolean
    imageUrl?:          string
    createdAt:          Date
    updatedAt?:         Date
}


export type ModifyGroupRequest = {
    currentUsername?:           string
    currentUserId?:             string
    groupId:                    string
    imageUrl?:                  string
    name?:                      string  
    description?:               string
    categoriesIds?:             number[]
}

export type FavoriteRequest = {
    currentUsername?:           string
    currentUserId?:             string
    groupId:                    string
}

