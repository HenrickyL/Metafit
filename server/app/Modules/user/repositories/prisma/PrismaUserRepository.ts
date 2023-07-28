import { prisma } from "@infra/prisma";
import { EmailAlreadyExistError, EmailNotBeNullError, UserAlreadyExistError, UserIdNotBeNullError, UsernameNotBeNullError, UsernameNotFound, UserNotFound } from "@modules/user/errors";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { IUser } from "@core/domain/entities";
import { IUsersRepository } from "../IUsersRepository";
import { UserModel } from "@modules/user/domain/UserModel";
import { BadRequestException } from "@core/Exceptions";
import { InvitationWasNotSentByGroup, InviteIdNotFoundInUserInvites, UserCannotAcceptInviteAlreadyInsertedGroup } from "@modules/user/errors/UserGroupAcceptInviteErrors";
import { ModifyUserRequest } from "@core/domain/DTOs/userDTO";
import { ModifyUsernameError } from "@modules/user/errors/ModifyUser";
import { selectData } from "@core/domain/middleware";
import { PaginationInfo, PaginationRequest, PaginationResponse } from "@core/domain/DTOs";
import { SortRetrieveAllUserFields } from "@core/domain/enums";
import { RetrieveInvitesRequest, UserRemoveInviteRequest } from "@core/domain/DTOs/InviteDTO";
import { Prisma } from "@prisma/client";
import { FilterRetrieveInvitesFields } from "@core/domain/enums/FilterRetrieveInvitesFields";
import { RemoveInviteNotFoundError } from "@modules/user/errors/UserRemoveInvite";

export class PrismaUsersRepository implements IUsersRepository {
  private mapper: UserMapper = UserMapper.instance()
  async validateUsernameNotExist(username: string): Promise<void> {
    if(username){
      const user = await prisma.user.findUnique({
        where: { username: username}
      })
      if(user){
        throw new UserAlreadyExistError(username);
      }
      return
    }
    throw new UsernameNotBeNullError()
  }

  async validateEmailNotExist(email: string): Promise<void> {
    if(email){
      const user = await prisma.user.findUnique({
        where: { email: email}
      })
      if(user){
        throw new EmailAlreadyExistError(email);
      }
      return
    }
    throw new EmailNotBeNullError()
  }

  async validateId(id: string): Promise<void> {
    if(id){
      const user = await prisma.user.findUnique({
        where: {id}
      })
      if(!user){
        throw new UserNotFound(id);
      }
      return
    }
    throw new UserIdNotBeNullError()
  }
  
  async validateUsername(username: string): Promise<void> {
    if(username){
      const user = await prisma.user.findUnique({
        where: { username}
      })
      if(!user){
        throw new UsernameNotFound(username);
      }
      return
    }
    throw new UsernameNotBeNullError()
  }


  async findById(id: string, populate:boolean, validate?:boolean): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { id }, 
      include:{
        groupsOwned: true,
        sendedInvites: true,
        receivedInvites:true,
        favoritedGroups: true,
        groups: {
          include:{
            group:true,
          }
        }
      }
    })
    if(!user && validate){
      throw new UserNotFound(id);
    }
    return this.mapper.toEntity(user, populate)
  }

  

  async findByUsername(username: string, populate:boolean, validate?: boolean): Promise<IUser|null> {
    if(username){
      const user = await prisma.user.findUnique({
        where: { username: username},
        include:{
          groupsOwned: true,
          sendedInvites: true,
          receivedInvites:true,
          favoritedGroups: true,
          groups: {
            include:{
              group:true,
            }
          }
        }
      })
      if(validate && !user){
        throw new UsernameNotFound(username)
      }
      return this.mapper.toEntity(user, populate)
    }
    throw new UsernameNotBeNullError()
  }

  async create(user: IUser): Promise<IUser> {
    const data = await this.mapper.toModelAsync(user)
     const current =  await prisma.user.create({ data:{
        username: data.username,
        password: data.password,
        email: data.email,
        name: data.name
     } });
     return this.mapper.toEntity(current, false)
  }

  async findByAll(pagination?:PaginationRequest<SortRetrieveAllUserFields>, populate: boolean = true): Promise<PaginationResponse<IUser>> {
    let users: UserModel[];
    const query = {
    }
    if(pagination){
      query['orderBy'] = {[pagination.sortField]: pagination.sortOrder}
      query['take'] = pagination.take
      query['skip'] = pagination.skip
    }
    if(populate){
      query['include']={
        groups: {
          include:{
            group: true,
            user: true,
          },
        },
        goals: true,
        groupsOwned: true,
        goalsCreatedByMe: true,
        achievements: true
      }
    }
    users = await prisma.user.findMany(query)
    const totalCount = await prisma.user.count(); // Total de registros disponíveis na coleção
    const pageCount = Math.ceil(totalCount / pagination.take); // Total de páginas
    const currentPage = Math.floor(pagination.skip / pagination.take) + 1; // Página atual

    const paginationInfo: PaginationInfo = {
      totalCount: totalCount,
      pageCount: pageCount,
      currentPage: currentPage,
      perPage: pagination?.take,
    };
    return {
      data: users.map((u)=>this.mapper.toEntity(u,true)),
      pagination: paginationInfo
    }
  }

  async retrieve(field: string, value: string): Promise<IUser> {
    const user = await prisma.user.findUnique({
      include:{
        groups: {
          include:{
            group: {
              include:{
                categories: true,
                owner: true,
                members: true,
                achievements: true,
                goals:true,
                receivedGroupInvites: true,
                sendedGroupInvites: true
              }
            },
            user: true,
          },
        },
        goals: true,
        groupsOwned: true,
        goalsCreatedByMe: true,
        achievements: true,
        receivedInvites: true,
        sendedInvites: true,
        favoritedGroups:true
      },
      where:{[field]:value}

    })
    if(!user){
      throw  field == 'username' ? new UsernameNotFound(value) : new UserNotFound(value)
    }
    return this.mapper.toEntity(user,true)
  }
  async userGroupAcceptInvite(user: IUser, inviteId: string): Promise<void> {
    const invite = user.receivedInvites.find(x=>x.id == inviteId)
    if(!invite){
      throw new InviteIdNotFoundInUserInvites(inviteId, user.username);
    }
    if(invite.senderGroupId){
      const group = user.groups.find(x=>x.groupId == invite.senderGroupId)
      if(group){
        throw new UserCannotAcceptInviteAlreadyInsertedGroup(invite.senderGroupId, user.username);
      }
    }else{
      throw new InvitationWasNotSentByGroup(inviteId)
    }
    /// TODO: Invite status 
    await prisma.user.update({
      where: { id: user.id },
      data: {
        groups: {
          create: { groupId: invite.senderGroupId }
        },
        receivedInvites: {
          delete: { id: invite.id },
        },
      },
    });
  }
  async update(user: IUser, data: ModifyUserRequest): Promise<void> {
    if(data.username){
      const usernameExist = await prisma.user.findFirst({
        where:{
          username: data.username
        }
      })
      if(usernameExist){
        throw new ModifyUsernameError(data.username)
      }
    }
    await prisma.user.update({
      where:{
        id: user.id
      },
      data:{
        username: selectData(user.username,data.username),
        email: selectData(user.email,data.email),
        imageUrl: selectData(user.imageUrl,data.imageUrl),
        name: selectData(user.name,data.name)
      }
    })
  }

  async retrieveInvites(data: RetrieveInvitesRequest): Promise<IUser> {
    const query : Prisma.User$receivedInvitesArgs = {
      include:{
        receiver: true,
        sender: true,
        senderGoal: true,
        receiverGoal: true,
        senderGroup: true,
        receiverGroup: true
      }
    } //Prisma.User$receivedInvitesArgs
    if(data.sortField && data.sortOrder){
      query['orderBy'] = {
        [data.sortField]: data.sortOrder
      }
    }
    if(data.filterField && data.filterValue){
      if( data.filterField == FilterRetrieveInvitesFields.type || 
          data.filterField == FilterRetrieveInvitesFields.status){
            query['where'] = {
              [data.filterField]: data.filterValue}
      }else{
        query['where'] = {
          [data.filterField]: {username: {contains: data.filterValue}}}
      }
    }
    query['take'] = data.take
    query['skip'] = data.skip
    const user = await prisma.user.findFirst({
      where:{
        OR:[
          {id: data.id},
          {username: data.username}
        ]
      },
      include:{
        receivedInvites: query,
        sendedInvites: query
      }
    })
    return UserMapper.instance().toEntity(user, true)
  }

  async removeInvite(request: UserRemoveInviteRequest, user: IUser, isReceived: boolean): Promise<void> {
    const invites = (isReceived ? user.receivedInvites : user.sendedInvites)
    const inviteExist = invites.some(x=>x.id === request.inviteId)
    if(!inviteExist){
      throw new RemoveInviteNotFoundError(request.inviteId, user.username, isReceived)
    }
    const query: Prisma.UserUpdateInput = {}

    query[isReceived?'receivedInvites': 'sendedInvites']= {delete: {id: request.inviteId}}
    await prisma.user.update({
      where:{
        id: user.id
      },
      data: query
    })
  }
  
}