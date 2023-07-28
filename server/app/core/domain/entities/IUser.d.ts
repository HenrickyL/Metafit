import { IEntity, IGroup, IAchievement, IGoal,IGroupMember } from '.';
import { Password } from '../middleware';
import { IInvite } from "./IInvite";
export interface IUser extends IEntity{
  username:               string
  password:               Password
  name:                   string
  email:                  string
  imageUrl?:               string

  groups?:                IGroupMember[]
  goals?:                 IGoal[]
  achievements?:          IAchievement[]
  groupsOwned?:           IGroup[]
  goalsCreatedByMe?:      IGoal[]
  sendedInvites?:         IInvite[]
  receivedInvites?:       IInvite[]
  favoritedGroups?:       IGroup[]
}