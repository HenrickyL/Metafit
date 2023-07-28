import { ModifyGroupRequest } from "@core/domain/DTOs/GroupDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { ICategoryRepository } from "@modules/category/repositories/ICategoryRepository";
import { IGroupsRepository } from "@modules/group/repositories/IGroupsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class UserModifyGroupService implements IUseCase<ModifyGroupRequest, void>{
    constructor(private repository: IUsersRepository,
        private groupRepository: IGroupsRepository,
        private categoryRepository: ICategoryRepository){}
    async execute(request: ModifyGroupRequest): Promise<void> {
        await this.validateAsync(request)
        const user = await this.repository.findByUsername(request.currentUsername, true, true)
        const group = await this.groupRepository.findById(request.groupId, true, true)
        //TODO: Ajeitar função
        await this.groupRepository.update(group, request, user)
    }
    async validateAsync(request: ModifyGroupRequest): Promise<void>{
        await this.categoryRepository.validateListIds(request.categoriesIds)
    }

}