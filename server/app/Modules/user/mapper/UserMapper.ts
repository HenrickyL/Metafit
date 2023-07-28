import { IMapper } from "@core/infra/IMapper";
import { RegisterUserResponse, UserResponse, UserSummaryResponse } from "@core/domain/DTOs/userDTO";
import { IUser } from '@core/domain/entities';
import { GroupMapper } from "@modules/group/mapper/GroupMapper";
import {UserModel} from '@modules/user/domain/UserModel'
import { Password } from "@core/domain/middleware";
import { GroupMemberMapper } from "@modules/group/domain/groupMember/mapper/GroupMemberMapper";
import { InviteMapper } from "../domain/Invite/mapper/InviteMapper";

export class UserMapper implements IMapper<IUser, UserModel>{
  private static _instance : UserMapper;
  public static  instance():UserMapper{
    if(!UserMapper._instance){
      UserMapper._instance = new UserMapper()
    }
    return UserMapper._instance;
  }
  private constructor(){}
  //////////////////////////////
  toEntity(model: UserModel, populate?: boolean): IUser {
    if(!model) return null
    const result: IUser = {
      id: model.id,
      username: model.username,
      password: Password.create(model.password, true),
      email: model.email,
      name: model.name,
      imageUrl: model.imageUrl,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
    if(populate){
      result.groups = model.groups
        ?.map((g)=>GroupMemberMapper.instance().toEntity(g,populate))
      result.groupsOwned =  model.groupsOwned
        ?.map((g)=>GroupMapper.instance().toEntity(g,populate))
      result.sendedInvites =  model.sendedInvites
        ?.map((i)=>InviteMapper.instance().toEntity(i,populate))
      result.receivedInvites =  model.receivedInvites
        ?.map((i)=>InviteMapper.instance().toEntity(i,populate))
      result.favoritedGroups =  model.favoritedGroups
        ?.map((i)=>GroupMapper.instance().toEntity(i,populate))
    }
    return result
  }
  async toModelAsync(entity: IUser): Promise<UserModel> {
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      imageUrl: entity.imageUrl,
      name: entity.name,
      password: await entity.password.getHashedValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }

  toModel(entity: IUser): UserModel{
    return {
      id: entity.id,
      username: entity.username,
      name: entity.name,
      imageUrl: entity.imageUrl,
      password: entity.password.value,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
  
  toRegisterResponse(entity: IUser): RegisterUserResponse {
    return {
      id: entity.id,
      username: entity.username,
      name:entity.name,
      imageUrl: entity.imageUrl,
      email: entity.email,
      createdAt: entity.createdAt,
    }
  }

  toSummaryResponse(entity: IUser): UserSummaryResponse {
    return {
      id: entity.id,
      username: entity.username,
    }
  }
  toResponse(entity: IUser, populate?: boolean): UserResponse {
    if(!entity) return null
    const result: UserResponse = {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      name: entity.name,
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
    if(populate){
      result.groups = entity.groups
        ?.map((g)=>GroupMapper.instance().toSummaryResponse(g.group, entity))
      result.groupsOwned =  entity.groupsOwned
        ?.map((g)=>GroupMapper.instance().toSummaryResponse(g))
      result.sendedInvites =  entity.sendedInvites
        ?.map((i)=>InviteMapper.instance().toSummaryResponse(i))
      result.receivedInvites =  entity.receivedInvites
        ?.map((i)=>InviteMapper.instance().toSummaryResponse(i))
      result.favoritedGroups =  entity.favoritedGroups
        ?.map((i)=>GroupMapper.instance().toSummaryResponse(i))
    }
    return result
  }
}
