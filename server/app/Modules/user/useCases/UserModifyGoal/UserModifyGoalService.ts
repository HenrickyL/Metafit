import { UserModifyGoalRequest } from "@core/domain/DTOs/GoalDTO";
import { IGroup, IUser } from "@core/domain/entities";
import { Enum } from "@core/domain/middleware/Enum";
import { IUseCase } from "@core/infra/IUseCase";
import { IGroupsRepository } from "@modules/group/repositories/IGroupsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { GoalType, Recurrence } from "@prisma/client";

export class UserModifyGoalService implements IUseCase<UserModifyGoalRequest, void>{
    constructor(
        private repository: IUsersRepository,
        private groupRepository: IGroupsRepository){}
    async execute(request: UserModifyGoalRequest): Promise<void> {
        this.validate(request)
        let user : IUser 
        if(request.currentUsername){
            user = await this.repository.findByUsername(request.currentUsername,true, true)
        }else{
            user = await this.repository.findById(request.currentId,true, true)
        }
        const group: IGroup = await this.groupRepository.findById(request.groupId, true, true)
        await this.groupRepository.userModifyGoal(request, group, user);
    }

  validate(request: UserModifyGoalRequest): void{
    Enum.isValid(request.type, GoalType, 'GoalType')
    Enum.isValid(request.recurrence, Recurrence, 'Recurrence')
  }
}