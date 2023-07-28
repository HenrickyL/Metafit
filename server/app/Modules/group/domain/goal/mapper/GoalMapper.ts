import { IGoal } from "@core/domain/entities";
import { GoalModel } from "../domain/GoalModel";
import { IMapper } from "@core/infra/IMapper";
import { GoalType } from "@core/domain/enums/GoalType";
import { Recurrence } from "@core/domain/enums/Recurrence";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { GroupMapper } from "@modules/group/mapper/GroupMapper";
import { InviteMapper } from "@modules/user/domain/Invite/mapper/InviteMapper";
import { GoalResponse, GoalSummaryResponse } from "@core/domain/DTOs/GoalDTO";
import { CategoryMapper } from "@modules/category/mapper/CategoryMapper";


export class GoalMapper implements IMapper<IGoal, GoalModel>{
    private static _instance : GoalMapper;
    public static  instance():GoalMapper{
        if(!GoalMapper._instance){
            GoalMapper._instance = new GoalMapper()
        }
        return GoalMapper._instance;
      }
    private constructor(){}
    /////
    toEntity(model: GoalModel, populate?: boolean): IGoal {
        if(!model) return null
        const response: IGoal = {
            categoryId: model.categoryId,
            id: model.id,
            groupId: model.groupId,
            createdById: model.createdById,
            title: model.title,
            description: model.description,
            target: model.target,
            progress: model.progress,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            type: GoalType[model.type],
            recurrence: Recurrence[model.recurrence],
            frequency: model.frequency,
            startDate: model.startDate,
            endDate: model.endDate
        }
        if(populate){
            response.createdBy = model.createdBy ?
                UserMapper.instance().toEntity(model.createdBy,populate) : null
            response.group = model.group ?
                GroupMapper.instance().toEntity(model.group, populate) : null
            response.users = model.users
                ?.map( u => UserMapper.instance().toEntity(u, populate))
            response.favoritedBy = model.favoritedBy
                ?.map( u => UserMapper.instance().toEntity(u, populate))
            response.invitesSent = model.invitesSent
                ?.map( i => InviteMapper.instance().toEntity(i, populate))
            response.invitesReceived = model.invitesReceived
                ?.map( i => InviteMapper.instance().toEntity(i, populate))
            response.category = CategoryMapper.instance().toEntity(model.category,populate)
        }
        return  response
    }

    toResponse(entity: IGoal,  populate?: boolean) : GoalResponse{
        const response : GoalResponse =  {
            id: entity.id,
            categoryId: entity.categoryId,
            groupId: entity.groupId,
            createdById: entity.createdById,
            title: entity.title,
            description: entity.description,
            target: entity.target,
            progress: entity.progress,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            type: GoalType[entity.type],
            recurrence: Recurrence[entity.recurrence],
            frequency: entity.frequency,
            startDate: entity.startDate,
            endDate: entity.endDate
        }

        if(populate){
            response.createdBy = entity.createdBy ?
                UserMapper.instance().toSummaryResponse(entity.createdBy) : null
            response.group = entity.group ?
                GroupMapper.instance().toSummaryResponse(entity.group) : null
            response.users = entity.users
                ?.map( u => UserMapper.instance().toSummaryResponse(u))
            response.favoritedBy = entity.favoritedBy
                ?.map( u => UserMapper.instance().toSummaryResponse(u))
            response.invitesSent = entity.invitesSent
                ?.map( i => InviteMapper.instance().toSummaryResponse(i))
            response.invitesReceived = entity.invitesReceived
                ?.map( i => InviteMapper.instance().toSummaryResponse(i))
            response.category = CategoryMapper.instance().toResponse(entity.category, populate)
        }

        return response
    }   
    toSummaryResponse(entity: IGoal) : GoalSummaryResponse{
        return  {
            id: entity.id,
            groupId: entity.groupId,
            createdById: entity.createdById,
            title: entity.title,
            description: entity.description,
            target: entity.target,
            progress: entity.progress,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            categoryId: entity.categoryId,
            type: GoalType[entity.type],
            recurrence: Recurrence[entity.recurrence],
            frequency: entity.frequency,
            startDate: entity.startDate,
            endDate: entity.endDate
        }
    }

    
    
}