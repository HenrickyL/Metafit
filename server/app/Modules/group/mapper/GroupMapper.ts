import { GroupSummaryResponse,  RetrieveGroupsResponse } from "@core/domain/DTOs/GroupDTO";
import { IGroup, IUser } from "@core/domain/entities";
import { IMapper } from "@core/infra/IMapper";
import { GroupModel } from "../domain/GroupModel";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { Password } from "@core/domain/middleware";
import { GroupMemberMapper } from "../domain/groupMember/mapper/GroupMemberMapper";
import { GroupCategoryMapper } from "../domain/groupCategory/mapper/GroupCategoryMapper";
import { InviteMapper } from "@modules/user/domain/Invite/mapper/InviteMapper";
import { CategoryMapper } from "@modules/category/mapper/CategoryMapper";
import { GoalMapper } from "../domain/goal/mapper/GoalMapper";

export class GroupMapper implements IMapper<IGroup, GroupModel>{
    private static _instance : GroupMapper;
    public static  instance():GroupMapper{
        if(!GroupMapper._instance){
            GroupMapper._instance = new GroupMapper()
        }
        return GroupMapper._instance;
    }
    private constructor(){}
    toEntity(model: GroupModel, populate?: boolean): IGroup {
        if(!model) return null
        const response:IGroup = {
            id: model.id,
            name: model.name,
            imageUrl: model.imageUrl,
            ownerId: model.ownerId,
            description: model.description,
            isPrivate: model.isPrivate,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            password: Password.create(model.password, true),
        }
        if(populate){
            response.members = model.members
                ?.map((u)=>GroupMemberMapper.instance().toEntity(u, populate))
            response.categories =  model.categories
                ?.map(c => GroupCategoryMapper.instance().toEntity(c, populate))
            response.owner = model.owner ? 
                UserMapper.instance().toEntity(model.owner, populate): null
            response.sendedGroupInvites = model.sendedGroupInvites 
                ?.map(i => InviteMapper.instance().toEntity(i, populate))
            response.receivedGroupInvites = model.receivedGroupInvites 
                ?.map(i => InviteMapper.instance().toEntity(i, populate))
            response.goals = model.goals
                ?.map(g => GoalMapper.instance().toEntity(g, populate))
        }
        return response;
    }
    async toModelAsync?(entity: IGroup): Promise<GroupModel> {
        const response = this.toModel(entity)
        response.password = await entity.password.getHashedValue();
        return response;
    }
    toModel?(entity: IGroup): GroupModel {
        return {
            id: entity.id,
            description: entity.description,
            name: entity.name,
            imageUrl: entity.imageUrl,
            isPrivate: entity.isPrivate,
            password: entity.password ? entity.password.value : "",
            ownerId: entity.ownerId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }
    }
   
    toSummaryResponse(entity: IGroup, user?: IUser): GroupSummaryResponse {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            imageUrl: entity.imageUrl,
            isPrivate: entity.isPrivate,
            updatedAt: entity.updatedAt,
            name: entity.name,
            ownerId: entity.ownerId,
            description: entity.description,
            ownerUsername: entity.owner?.username,
            isFavorite:  user?.favoritedGroups.some(x=> x.id == entity.id)
        }
    }

    toRetrieveGroupsResponse(entity: IGroup, populate?: boolean, user?: IUser): RetrieveGroupsResponse{
        const result: RetrieveGroupsResponse = {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            isPrivate: entity.isPrivate,
            imageUrl: entity.imageUrl,
            ownerId: entity.ownerId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }
        if(populate){
            result.categories = entity.categories?.map(c => CategoryMapper.instance().toResponse(c.category,populate))
            result.members = entity.members?.map(u => UserMapper.instance().toSummaryResponse(u.user))
            result.owner = entity.owner ? UserMapper.instance().toSummaryResponse(entity.owner) : null
            result.sendedGroupInvites = entity.sendedGroupInvites
                ?.map(i => InviteMapper.instance().toSummaryResponse(i))
            result.receivedGroupInvites = entity.receivedGroupInvites
                ?.map(i => InviteMapper.instance().toSummaryResponse(i))
            result.favoritedBy = entity.favoritedBy
                ?.map(u => UserMapper.instance().toSummaryResponse(u))
            result.goals = entity.goals
                ?.map(g => GoalMapper.instance().toSummaryResponse(g))
        }
        if(user && user.favoritedGroups){
            result.isFavorite = user.favoritedGroups.some((x) => x.id === entity.id);
        }
        return result
    }

}