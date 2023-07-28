import { UserGroupAcceptInviteRequest } from "@core/domain/DTOs/userDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class UserGroupAcceptInviteService implements IUseCase<UserGroupAcceptInviteRequest, void>{
    constructor(
        private repository: IUsersRepository){}
    async execute(request: UserGroupAcceptInviteRequest): Promise<void> {
        const user = await this.repository.findByUsername(request.username, true, true);
        await this.repository.userGroupAcceptInvite(user, request.inviteId)
    }
}