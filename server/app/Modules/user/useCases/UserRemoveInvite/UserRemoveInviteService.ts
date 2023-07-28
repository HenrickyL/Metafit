import { UserRemoveInviteRequest } from "@core/domain/DTOs/InviteDTO";
import { IUser } from "@core/domain/entities";
import { IUseCase } from "@core/infra/IUseCase";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class UserRemoveInviteService implements IUseCase<UserRemoveInviteRequest,void>{
    constructor(
        private repository: IUsersRepository){}
    async execute(request: UserRemoveInviteRequest): Promise<void> {
        let user: IUser
        if(request.username){
            user = await this.repository.findByUsername(request.username,true, true)
        }else{
            user = await this.repository.findById(request.id,true, true)
        }
        await this.repository.removeInvite(request, user, request.isReceived)
    }
}