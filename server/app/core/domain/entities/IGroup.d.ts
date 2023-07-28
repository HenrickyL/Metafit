import { IAchievement, IEntity, IGoal, IUser, IGroupCategory, IGroupMember } from '.';

import { Password } from '../middleware';
import { IInvite } from './IInvite';

export interface IGroup extends IEntity{
    name:                       string       
    description:                string
    ownerId:                    string
    isPrivate:                  boolean
    password:                   Password
    imageUrl?:                  string

    owner?:                     IUser   
    members?:                   IGroupMember[]     
    goals?:                     IGoal[]          
    achievements?:              IAchievement[]
    categories?:                IGroupCategory[]
    sendedGroupInvites?:        IInvite[]
    receivedGroupInvites?:      IInvite[]
    favoritedBy?:               IUser[]
}