import { IInvite } from "@core/domain/entities/IInvite";
import { IMapper } from "@core/infra/IMapper";
import { InviteModel } from "../domain/InviteModel";
import { InviteResponse, InviteSummaryResponse } from "@core/domain/DTOs/InviteDTO";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { GroupMapper } from "@modules/group/mapper/GroupMapper";
import { InviteType} from '@core/domain/enums/InviteType'
import { InviteStatus} from '@core/domain/enums/InviteStatus'
export class InviteMapper implements IMapper<IInvite, InviteModel>{
  private static _instance : InviteMapper;
  public static  instance():InviteMapper{
    if(!InviteMapper._instance){
      InviteMapper._instance = new InviteMapper()
    }
    return InviteMapper._instance;
  }
  private constructor(){}
  ////////////////////
  toEntity(model: InviteModel, populate?: boolean): IInvite {
    if(!model) return null
    const result: IInvite =   
      {
        id: model.id,
        type: InviteType[model.type],
        status: InviteStatus[model.status],
        senderId: model.senderId,
        receiverId: model.receiverId,
        expiration: model.expiration,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        senderGroupId: model.senderGroupId,
        receiverGroupId:model.receiverGroupId,
        senderGoalId: model.senderGoalId,
        receiverGoalId: model.receiverGoalId
      }
      if(populate){
        result.receiver = model.receiver ? 
          UserMapper.instance().toEntity(model.receiver, populate) : null
        result.sender = model.sender ? 
          UserMapper.instance().toEntity(model.sender, populate) : null
        result.senderGroup = model.senderGroup ? 
          GroupMapper.instance().toEntity(model.senderGroup, populate) : null
        result.receiverGroup = model.receiverGroup ? 
          GroupMapper.instance().toEntity(model.receiverGroup, populate) : null
      }
    return result;
  }
  
  toSummaryResponse(entity: IInvite): InviteSummaryResponse {
      return {
        id: entity.id,
        type: entity.type,
        status: entity.status,
        senderId: entity.senderId,
        receiverId: entity.receiverId,
        expiration: entity.expiration,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        senderGroupId: entity.senderGroupId,
        receiverGroupId:entity.receiverGroupId,
        senderGoalId: entity.senderGoalId,
        receiverGoalId: entity.receiverGoalId
      }
  }
  toResponse(entity: IInvite, populate?: boolean): InviteResponse {
    const result : InviteResponse = {...this.toSummaryResponse(entity)}
    if(populate){
      result.receiver = entity.receiver ? 
        UserMapper.instance().toSummaryResponse(entity.receiver) : null
      result.sender = entity.sender ? 
        UserMapper.instance().toSummaryResponse(entity.sender) : null
      result.senderGroup = entity.senderGroup ? 
        GroupMapper.instance().toSummaryResponse(entity.senderGroup) : null
      result.receiverGroup = entity.receiverGroup ? 
        GroupMapper.instance().toSummaryResponse(entity.receiverGroup) : null
    }
    return result
}

}