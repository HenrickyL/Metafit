import { UserGroupInviteUserRequest } from "@core/domain/DTOs/userDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { IGroupsRepository} from "@modules/group/repositories/IGroupsRepository"
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class UserGroupInviteUserService implements IUseCase<UserGroupInviteUserRequest, void>{
    constructor(
        private repository: IGroupsRepository,
        private userRepository: IUsersRepository) {}
    
    async execute({receiverUsername, senderUsername, senderGroupId}: UserGroupInviteUserRequest): Promise<void> {
        const senderUser = await this.userRepository.findByUsername(senderUsername, false,true)
        const receiverUser = await this.userRepository.findByUsername(receiverUsername, false,true)
        const group = await this.repository.findGroupByIdValidateCreatedByUser(senderGroupId, senderUser)
        await this.repository.createInviteGroupByUser(group,senderUser, receiverUser);
    }
    
}