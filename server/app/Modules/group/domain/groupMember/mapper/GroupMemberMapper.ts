import { IMapper } from "@core/infra/IMapper";
import { GroupMemberResponse } from "@core/domain/DTOs/auxiliar/GroupMemberDTO";
import { IGroupMember } from "@core/domain/entities";
import { GroupMapper } from "@modules/group/mapper/GroupMapper";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { GroupMemberModel } from "../domain/GroupMemberModel";

export class GroupMemberMapper implements IMapper<IGroupMember, GroupMemberModel>{
    private static _instance : GroupMemberMapper;
    public static  instance():GroupMemberMapper{
        if(!GroupMemberMapper._instance){
            GroupMemberMapper._instance = new GroupMemberMapper()
        }
        return GroupMemberMapper._instance;
      }
    private constructor(){}
    ///////////////////////////////////////////////
    toEntity(model: GroupMemberModel, populate?: boolean): IGroupMember {
        if(!model) return null
        const response: IGroupMember = {
            id: model.id,
            groupId: model.groupId,
            userId: model.userId,
            createdAt: model.createdAt,
        }
        if(populate){
            response.user = model.user ? 
                UserMapper.instance().toEntity(model.user, populate) : null
            response.group = model.group ? 
                GroupMapper.instance().toEntity(model.group, populate) : null
        }
        return response
    }
    toResponse(entity: IGroupMember, populate: boolean, doublePopulate?: boolean): GroupMemberResponse {
        return{
            id: entity.id,
            userId: entity.userId,
            groupId: entity.groupId,
            createdAt: entity.createdAt,
            group: populate && entity.group? GroupMapper.instance().toSummaryResponse(entity.group): null,
            user: populate && entity.user? UserMapper.instance().toRegisterResponse(entity.user): null
        }
    }
    
    
}