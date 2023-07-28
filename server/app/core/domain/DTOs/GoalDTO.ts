import { GoalType } from "../enums/GoalType"
import { Recurrence } from "../enums/Recurrence"
import { CategorySummaryResponse } from "./CategoryDTO"
import { GroupSummaryResponse } from "./GroupDTO"
import { InviteSummaryResponse } from "./InviteDTO"
import { UserSummaryResponse } from "./userDTO"

export type RegisterGoalRequest = {
    groupId:                string
    username:               string
    title:                  string
    description:            string
    categoryId:             number
    type:                   GoalType
    recurrence?:            Recurrence
    frequency?:             number
    startDate?:             Date
    endDate?:               Date
    target:                 number
}

export type UserModifyGoalRequest = {
    currentUsername?:       string
    currentId?:             string
    goalId:                 string
    groupId:                string

    title?:                 string
    description?:           string
    target?:                number
    progress?:              number
    type?:                  GoalType
    recurrence?:            Recurrence
    frequency?:             number
    startDate?:             Date
    endDate?:               Date
}


export interface GoalResponse extends GoalSummaryResponse {
    createdBy?:             UserSummaryResponse
    group?:                 GroupSummaryResponse
    users?:                 UserSummaryResponse[]
    favoritedBy?:           UserSummaryResponse[]
    invitesSent?:           InviteSummaryResponse[]
    invitesReceived?:       InviteSummaryResponse[]
    category?:              CategorySummaryResponse
}

export interface GoalSummaryResponse {
    id:                     string
    groupId:                string
    createdById:            string
    title:                  string
    description:            string
    categoryId:             number
    target:                 number
    progress:               number
    type:                   GoalType
    recurrence?:            Recurrence
    frequency?:             number
    startDate?:             Date
    endDate?:               Date

    createdAt:              Date
    updatedAt?:             Date
}