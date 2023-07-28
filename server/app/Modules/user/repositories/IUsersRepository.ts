import { PaginationRequest, PaginationResponse } from '@core/domain/DTOs';
import { RetrieveInvitesRequest, UserRemoveInviteRequest } from '@core/domain/DTOs/InviteDTO';
import { ModifyUserRequest } from '@core/domain/DTOs/userDTO';
import { IUser } from '@core/domain/entities';
import { SortRetrieveAllUserFields } from '@core/domain/enums';

export interface IUsersRepository {
  validateUsername(username: string): Promise<void>
  validateUsernameNotExist(username: string): Promise<void>
  validateEmailNotExist(email: string): Promise<void>
  validateId(id: string): Promise<void>
  create(user: IUser): Promise<IUser>
  update(user: IUser, data: ModifyUserRequest): Promise<void>
  findByUsername(username: string, populate:boolean, validate?: boolean): Promise<IUser>
  findById(id: string, populate: boolean, validate?:boolean): Promise<IUser>
  findByAll(pagination?:PaginationRequest<SortRetrieveAllUserFields>, populate?: boolean): Promise<PaginationResponse<IUser>>
  ////////////
  retrieve(field: string, value: string): Promise<IUser>
  userGroupAcceptInvite(user: IUser, inviteId:string): Promise<void>
  retrieveInvites(data:RetrieveInvitesRequest): Promise<IUser>
  removeInvite(request: UserRemoveInviteRequest, user: IUser, isReceived: boolean): Promise<void>
}
