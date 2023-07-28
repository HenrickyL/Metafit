import { RegisterGoalRequest } from "@core/domain/DTOs/GoalDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { IGroupsRepository } from "@modules/group/repositories/IGroupsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class UserGroupRegisterGoalService implements IUseCase<RegisterGoalRequest, void>{
    constructor(
        private repository: IUsersRepository,
        private groupRepository: IGroupsRepository){}
    async execute(request: RegisterGoalRequest): Promise<void> {
        const user = await this.repository.findByUsername(request.username,false,true);
        const group = await this.groupRepository.findById(request.groupId,true, true);
        await this.groupRepository.registerGoal(request, group, user);
    }
}