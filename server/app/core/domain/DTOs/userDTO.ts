import { PaginationRequest } from "."
import { SortOrder, SortRetrieveAllUserFields } from "../enums"
import { AchievementResponse } from "./AchievementDTO"
import { GoalResponse } from "./GoalDTO"
import { GroupResponse, GroupSummaryResponse } from "./GroupDTO"
import { InviteSummaryResponse } from "./InviteDTO"

export type RegisterUserRequest = {
  username: string
  email:    string
  password: string
  name:     string
}

export interface RetrieveAllUserRequest 
  extends PaginationRequest<SortRetrieveAllUserFields>{
}

export type RetrieveUserRequest ={
  id?:        string
  username?:  string
}

export type RegisterUserResponse = {
  id:                     string
  username:               string
  name:                   string
  email:                  string
  imageUrl?:              string
  createdAt:              Date
}

export type UserResponse = {
  id:                     string
  username:               string
  name:                   string
  email:                  string
  imageUrl?:              string
  createdAt:              Date
  updatedAt?:             Date

  groups?:                GroupSummaryResponse[]
  goals?:                 GoalResponse[]
  achievements?:          AchievementResponse[]
  groupsOwned?:           GroupSummaryResponse[]
  goalsCreatedByMe?:      GroupSummaryResponse[]
  sendedInvites?:         InviteSummaryResponse[]
  receivedInvites?:       InviteSummaryResponse[]
  favoritedGroups?:       GroupSummaryResponse[]
}


export type UserSummaryResponse = {
  id:                     string
  username:               string
}

export type UserGroupInviteUserRequest = {
  senderUsername:     string
  receiverUsername:   string
  senderGroupId?:     string
}

export type UserGroupAcceptInviteRequest = {
  username:           string
  inviteId:           string
}

export type ModifyUserRequest = {
  id?:                string
  currentUsername?:   string
  username?:          string
  name?:              string
  email?:             string
  imageUrl?:          string
}