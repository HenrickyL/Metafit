import { FavoriteRequest } from "@core/domain/DTOs/GroupDTO";
import { IUser } from "@core/domain/entities";
import { IUseCase } from "@core/infra/IUseCase";
import { IGroupsRepository } from "@modules/group/repositories/IGroupsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class UserFavoriteGroupService implements IUseCase<FavoriteRequest, void>{
    constructor(private repository: IUsersRepository,
        private groupRepository: IGroupsRepository){}
    async execute(request: FavoriteRequest): Promise<void> {
        let user: IUser;
        if(request.currentUsername){
            user = await this.repository.findByUsername(request.currentUsername, true, true);
        }else{
            user = await this.repository.findById(request.currentUserId, true, true);
        }
        const group = await this.groupRepository.findById(request.groupId,true, true)
        await this.groupRepository.favoriteGroup(group, user)
    }
}