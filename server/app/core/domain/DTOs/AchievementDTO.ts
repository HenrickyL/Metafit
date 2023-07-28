import { GoalResponse } from "./GoalDTO"
import { GroupResponse } from "./GroupDTO"
import { UserResponse } from "./userDTO"

export type RegisterAchievementRequest = {
    userId:             string    
    groupId:            string
    goalId:             string     
    title:              string
    description:        string
}

export type AchievementResponse = {
    userId:             string    
    groupId:            string
    goalId:             string     
    title:              string
    description:        string

    user:               UserResponse       
    groups:             GroupResponse[]     
    goal:               GoalResponse
}