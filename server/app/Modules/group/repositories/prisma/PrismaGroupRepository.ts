import { IGroup, IUser } from "@core/domain/entities";
import { IGroupsRepository } from "../IGroupsRepository";
import { GroupMapper } from "@modules/group/mapper/GroupMapper";
import { prisma } from "@infra/prisma";
import { GroupIdNotBeNullError, GroupIdNotCreatedByUserError, GroupIdNotFound, GroupNameByUsernameAlreadyExistError, GroupNameNotBeNullError } from "@modules/group/errors";
import { ModifyGroupRequest, RegisterGroupRequest, RetrieveGroupsRequest } from "@core/domain/DTOs/GroupDTO";
import { Group, InviteStatus, InviteType, Prisma } from "@prisma/client";
import { systemSettings } from "@config/systemSettings";
import { UserGroupInviteAlreadyExistToUserError } from "@modules/user/errors/UserGroupInviteUserErrors";
import { GoalNotInGroupError, UserNotInGroupError } from "@modules/user/errors";
import { RegisterGoalRequest, UserModifyGoalRequest } from "@core/domain/DTOs/GoalDTO";
import { GoalAlreadyExistError } from "@modules/user/errors/UserGroupRegisterGoal";
import { calculateEndDate } from "@modules/group/domain/goal/middleware";
import { ModifyGroupNameAlreadyExistError, ModifyGroupUserIsNotOwnerGroupError, ModifyGroupUserNotBelongGroupError } from "@modules/group/errors/UserModifyGroup";
import { selectData } from "@core/domain/middleware";
import { FavoriteGroupUserNotBelongGroupError } from "@modules/group/errors/FavoriteGroup";
import { PaginationInfo, PaginationResponse } from "@core/domain/DTOs";
import { FilterRetrieveGroupsFields, SortRetrieveGroupsFields } from "@core/domain/enums";
import { PaginationAdapter } from "@core/domain/middleware/PaginationAdapter";

export class PrismaGroupRepository implements IGroupsRepository{
    private mapper: GroupMapper = GroupMapper.instance()

    async validateId(id: string): Promise<void> {
        if(!id)
            throw new GroupIdNotBeNullError()
        const group = await prisma.group.findUnique({
            where: {id}
        })
        if(!group){
            throw new GroupIdNotFound(id);
        }
    }
    async validateGroupNameMatch(requestGroup: RegisterGroupRequest, user: IUser): Promise<void> {
        if(!requestGroup.name)
            throw new GroupNameNotBeNullError()
        const group = await prisma.group.findFirst({
            where:{ 
                name: requestGroup.name, 
                ownerId: user.id,
            }
        })
        if(group)
            throw new GroupNameByUsernameAlreadyExistError(requestGroup.name, user.username);
    }
    
    async create(data: RegisterGroupRequest, user: IUser): Promise<void> {
        await prisma.group.create({
            data:{
                name: data.name,
                description: data.description,
                ownerId: user.id,
                isPrivate: data.isPrivate,
                password: data.isPrivate? data.password : null,
                imageUrl: data.imageUrl,
                members: { 
                    create:{
                        userId: user.id
                    }
                }
            },
            include:{
                members: true,
                owner: true,
                categories: true,
            }
        })
    }
    async findById(id: string, populate: boolean, validate?: boolean): Promise<IGroup> {
        if(!id)
            throw new GroupIdNotBeNullError()
        let group: Group;
        if(populate){
            group = await prisma.group.findUnique({
                where: {id},
                include:{
                    goals: true,
                    owner: true,
                    categories:{
                        include:{
                            category:true
                        }
                    },
                    members: {
                        include:{
                            user: true
                        }
                    },
                    achievements: true,
                }
            })
        }else{
            group = await prisma.group.findUnique({
                where: {id},
            })
        }
        if(validate && !group){
            throw new GroupIdNotFound(id);
        }
        return this.mapper.toEntity(group, populate)
    }

    async findAllByUser(user:IUser, pagination?: RetrieveGroupsRequest) : Promise<PaginationResponse<IGroup>> {
        const query : Prisma.GroupFindManyArgs = {};
        query['where'] = user ? { members: { some: { userId: user.id } } } : { isPrivate: false };
        
        if (pagination) {
            if(pagination.sortField === SortRetrieveGroupsFields.owner){
                query['orderBy'] = { owner: {username: pagination.sortOrder}}
            }else{
                query['orderBy'] = { [pagination.sortField]: pagination.sortOrder}

            }
            query['take'] = pagination.take
            query['skip'] = pagination.skip
            if (pagination?.filterField && pagination?.filterValue) {
                const filterField = pagination.filterField;
                const filterValue = pagination.filterValue;
                if(pagination.filterField === FilterRetrieveGroupsFields.categoryId){
                    const categoryId = parseInt(filterValue);
                    query.where = {
                        ...query.where,
                        categories: {
                          some: {
                            category: {id: categoryId}
                          }
                        }
                      };
                }else if(pagination.filterField == FilterRetrieveGroupsFields.member){
                    const userFilter:Prisma.UserWhereInput  = {}
                    if(user){
                        userFilter.AND = [
                            {id: user.id},
                            {OR:[
                                {username: { contains: filterValue}},
                                {name: {contains: filterValue}}
                            ]}
                        ]
                    }else{
                        userFilter.OR = [
                                {username: { contains: filterValue}},
                                {name: {contains: filterValue}}
                            ]
                    }
                    query.where = {
                        members: {some: {user: userFilter}}
                      };
                }else{
                    query.where = {
                        ...query.where,
                        [filterField]: {contains: filterValue},
                    };
                }
            }
        }
        query['include'] = {
            categories: {
                include:{category:true}
            },
            owner: true,
            members: {
                include:{user: true}
            },
            goals: {
                include:{createdBy: true}
            },
            favoritedBy: true,
            sendedGroupInvites: true,
            receivedGroupInvites: true
        }
        ///////
        const groups = await prisma.group.findMany(query)
        const totalCount = await prisma.group.count({
            where: query.where
        }); // Total de registros disponíveis na coleção
        const paginationInfo: PaginationInfo = PaginationAdapter.getInfo(totalCount, pagination.skip, pagination.take)
        return {
            data: groups ? groups.map((g)=>this.mapper.toEntity(g,true)): [],
            pagination: paginationInfo
        }
    }
    async findGroupByIdValidateCreatedByUser(groupId: string, user: IUser): Promise<IGroup> {
        const group = await prisma.group.findUnique({
            where:{ id:groupId},
            include:{
                owner:true,
                sendedGroupInvites:true,
                receivedGroupInvites: true
            }
        })
        if(!group){
            throw new GroupIdNotFound(groupId)
        }
        if(group.owner.id != user.id){
            throw new GroupIdNotCreatedByUserError(groupId, user.username)
        }
        return GroupMapper.instance().toEntity(group,true)
    }

    async createInviteGroupByUser(group: IGroup, senderUser: IUser, receiverUser: IUser): Promise<void> {
        const existInvite = group.sendedGroupInvites.filter(x=> 
            x.senderId == senderUser.id && 
            x.receiverId ==receiverUser.id &&
            x.senderGroupId == group.id)
        if(existInvite.length > 0){
            throw new UserGroupInviteAlreadyExistToUserError(senderUser.username, receiverUser.username, group.id)
        }
        await prisma.group.update({
            where:{id: group.id},
            data:{
                sendedGroupInvites:{
                    create:{
                        status: InviteStatus.ACTIVE,
                        type: InviteType.GROUP_INVITATION,
                        expiration: systemSettings.getExpiration(),
                        senderId: senderUser.id,
                        receiverId: receiverUser.id,
                    }
                }
            }
        })
    }
    async registerGoal(request: RegisterGoalRequest, group: IGroup, createdBy: IUser): Promise<void> {
        const existUserInGroup = group.members.filter(x=>x.userId === createdBy.id)
        if(!existUserInGroup){
            throw new UserNotInGroupError(createdBy.username, group.id)
        }
        const existGoal = group.goals.filter(x=>x.title.toLowerCase() === request.title.toLowerCase())

        if(existGoal.length > 0){
            throw new GoalAlreadyExistError(request.title, group.id)
        }
        const startDate = request.startDate ?? new Date()
        let endDate : Date = null
        if(request.frequency && request.recurrence){
            endDate = request.endDate ?? calculateEndDate(startDate,request.frequency, request.recurrence)
        }
        await prisma.group.update({
            where: {id: group.id},
            data:{
                goals:{
                    create:{
                        categoryId: request.categoryId ?? 1,
                        title: request.title,
                        description: request.description,
                        target: request.target,
                        createdById: createdBy.id,
                        type: request.type,
                        recurrence: request.recurrence ?? null,
                        frequency: request.frequency ?? null,
                        startDate: startDate,
                        endDate: endDate,
                        progress: 0
                    }
                }
            }
        })
    }
    
    async update(group: IGroup, data: ModifyGroupRequest, user: IUser): Promise<void> {
        const userOwnedGroup = user.groupsOwned.filter(x=>x.id === group.id)
        if(!userOwnedGroup || userOwnedGroup.length ==0){
            throw new ModifyGroupUserIsNotOwnerGroupError(user.username, group.name)
        }
        if(data.name){
            const nameAlreadyExist = user.groups.filter(x=>x.group.name == data.name)
            if(nameAlreadyExist && nameAlreadyExist.length>0){
                throw new ModifyGroupNameAlreadyExistError(user.username, data.name)
            }
        }
        const updateData: any = {
            name: selectData(group.name, data.name),
            description: selectData(group.description, data.description),
        };
        if (data.categoriesIds) {
            const categoriesToRemove = group.categories
            await prisma.group.update({
                where: { id: group.id },
                data: {
                  categories: {
                    delete: categoriesToRemove.map((category) => ({id: category.id})),
                  },
                },
              });
            updateData.categories = {
                create: data.categoriesIds.map((categoryId) => ({ categoryId: categoryId })),
            };
        }
        await prisma.group.update({
            where:{id: group.id},
            data:updateData
        })
    }

    async favoriteGroup(group: IGroup, user: IUser): Promise<void> {
        const userIsMember = group.members.some(x=>x.userId === user.id)
        if(!userIsMember){
            throw new FavoriteGroupUserNotBelongGroupError(user.username, group.id)
        }
        const isFavorite = user.favoritedGroups.filter(x=>x.id === group.id).length > 0
        let UpdateData: any = {};
        if(!isFavorite){
            UpdateData.favoritedBy =  {
                connect: { id: user.id },
            }
        }else{
            UpdateData.favoritedBy =  {
                disconnect: { id: user.id },
            }
        }
        await prisma.group.update({
            where: { id: group.id },
            data: UpdateData
        });
    }

    async userModifyGoal(data: UserModifyGoalRequest, group: IGroup, user: IUser): Promise<void> {
        const userInGroup = group.members.some(x=>x.userId === user.id)
        if(!userInGroup){
            throw new UserNotInGroupError(user.username, group.id)
        }
        const goal = group.goals.find(x=>x.id === data.goalId);
        if(!goal){
            throw new GoalNotInGroupError(data.goalId, group.id)
        }

        await prisma.group.update({
            where:{ id: group.id},
            data:{
                goals:{
                    update:{
                        where:{id: data.goalId},
                        data:{
                            title: selectData(goal.title, data.title),
                            description: selectData(goal.description, data.description),
                            target: selectData(goal.target, data.target),
                            progress: selectData(goal.progress, data.progress),
                            type: selectData(goal.type, data.type),
                            recurrence: selectData(goal.recurrence, data.recurrence),
                            frequency: selectData(goal.frequency, data.frequency),
                            startDate: selectData(goal.startDate, data.startDate),
                            endDate: selectData(goal.endDate, data.endDate)
                        }
                    }
                }
            }
        })
    }

}
