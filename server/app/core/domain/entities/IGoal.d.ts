import { IAchievement, ICategory, IEntity, IGroup, IUser } from '.';
import { GoalType } from '../enums/GoalType';
import { Recurrence } from '../enums/Recurrence';
import { IInvite } from './IInvite';

export interface IGoal extends IEntity{
    categoryId:         number
    groupId:            string
    createdById:        string
    title:              string
    description:        string
    target:             number
    progress:           number
    type:               GoalType
    recurrence?:        Recurrence
    frequency?:         number
    startDate?:         Date
    endDate?:           Date

    createdBy?:         IUser
    group?:             IGroup       
    achievements?:      IAchievement[]
    users?:             IUser[]
    favoritedBy?:       IUser[]
    invitesSent?:       IInvite[]
    invitesReceived?:   IInvite[]
    category?:          ICategory
}
