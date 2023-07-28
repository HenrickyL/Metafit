import { UserSummaryResponse } from "./userDTO"
import { GroupSummaryResponse } from "./GroupDTO"
import { GoalSummaryResponse } from "./GoalDTO"
import { InviteType } from "../enums/InviteType"
import { InviteStatus } from "../enums/InviteStatus"
import { PaginationRequest, PaginationResponse } from "."
import { FilterRetrieveInvitesFields } from "../enums/FilterRetrieveInvitesFields"
import { SortRetrieveInvitesFields } from "../enums/SortRetrieveInvitesFields"

export interface InviteResponse extends InviteSummaryResponse{
    sender?:                UserSummaryResponse 
    receiver?:              UserSummaryResponse
    senderGroup?:           GroupSummaryResponse
    receiverGroup?:         GroupSummaryResponse
    senderGoal?:            GoalSummaryResponse
    receiverGoal?:          GoalSummaryResponse
}

export interface InviteSummaryResponse {
    id:                     string        
    type:                   InviteType
    status:                 InviteStatus
    senderId:               string
    receiverId:             string
    senderGroupId?:         string
    receiverGroupId?:       string
    senderGoalId?:          string
    receiverGoalId?:        string
    expiration:             Date
    
    createdAt:              Date
    updatedAt?:             Date
}



export interface RetrieveInvitesRequest 
    extends PaginationRequest<SortRetrieveInvitesFields, FilterRetrieveInvitesFields> {
    id?: string
    username?: string
}

export interface RetrieveInvitesResponse{
    sendedInvites?:         InviteResponse[]
    receivedInvites?:       InviteResponse[]
}
export interface RetrieveInvitesPaginationResponse 
    extends PaginationResponse<RetrieveInvitesResponse> {}


export interface UserRemoveInviteRequest {
    username?:      string
    id?:            string
    inviteId:       string
    isReceived:     boolean
}