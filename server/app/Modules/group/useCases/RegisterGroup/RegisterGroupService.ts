import { RegisterGroupRequest } from "@core/domain/DTOs/GroupDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { IGroupsRepository } from "@modules/group/repositories/IGroupsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class RegisterGroupService implements IUseCase<RegisterGroupRequest,void>{
    constructor(
        private repository: IGroupsRepository,
        private userRepository: IUsersRepository) {}
    
    async execute(request: RegisterGroupRequest): Promise<void> {
        const user = await this.userRepository.findByUsername(request.ownerUsername, true)
        await this.repository.validateGroupNameMatch(request, user)
        await this.repository.create(request, user)
    }
}