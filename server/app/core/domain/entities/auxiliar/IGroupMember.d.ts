import { IEntity,IUser, IGroup } from "..";

export interface IGroupMember extends IEntity{
    groupId:        string
    userId:         string

    group?:         IGroup   
    user?:          IUser
}