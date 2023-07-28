import { IEntity, IGoal, IGroup, IUser } from '.';

export interface IAchievement extends IEntity{
    userId:             string    
    groupId:            string
    goalId:             string     
    title:              string
    description:        string

    user:               IUser       
    groups:             IGroup[]     
    goal:               IGoal
}