import { IEntity, IGoal, IGroup } from ".";
import { InviteType} from '@core/domain/enums/InviteType'
import { InviteStatus} from '@core/domain/enums/InviteStatus'

export interface IInvite extends IEntity{
    type:               InviteType
    status:             InviteStatus
    senderId:           string
    receiverId:         string
    senderGroupId?:     string
    receiverGroupId?:   string
    senderGoalId?:      string
    receiverGoalId?:    string
    expiration:         Date

    sender?:            IUser   
    receiver?:          IUser
    senderGroup?:       IGroup  
    receiverGroup?:     IGroup
    senderGoal?:        IGoal
    receiverGoal?:      IGoal
}