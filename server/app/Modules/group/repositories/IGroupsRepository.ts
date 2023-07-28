import { PaginationResponse } from '@core/domain/DTOs';
import { RegisterGoalRequest, UserModifyGoalRequest } from '@core/domain/DTOs/GoalDTO';
import { ModifyGroupRequest, RegisterGroupRequest, RetrieveGroupsRequest } from '@core/domain/DTOs/GroupDTO';
import { IGroup, IUser } from '@core/domain/entities';

export interface IGroupsRepository {
  validateId(id: string): Promise<void>
  validateGroupNameMatch(request: RegisterGroupRequest, user: IUser): Promise<void>
  create(group: RegisterGroupRequest, user: IUser): Promise<void>
  findById(id: string, populate: boolean, validate?:boolean): Promise<IGroup>
  findAllByUser(user:IUser, pagination?: RetrieveGroupsRequest): Promise<PaginationResponse<IGroup>>
  findGroupByIdValidateCreatedByUser(groupId: string, user: IUser): Promise<IGroup>
  createInviteGroupByUser(group: IGroup, senderUser: IUser, receiverUser: IUser): Promise<void>
  registerGoal(request: RegisterGoalRequest,group: IGroup, createdBy: IUser): Promise<void>
  update(group: IGroup, data: ModifyGroupRequest, user: IUser): Promise<void>
  favoriteGroup(group: IGroup, user: IUser): Promise<void>
  userModifyGoal(request: UserModifyGoalRequest, group: IGroup, user: IUser): Promise<void>
}
