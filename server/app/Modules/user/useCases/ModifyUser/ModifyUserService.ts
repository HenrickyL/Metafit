import { ModifyUserRequest } from "@core/domain/DTOs/userDTO";
import { IUser } from "@core/domain/entities";
import { IUseCase } from "@core/infra/IUseCase";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class ModifyUserService implements IUseCase<ModifyUserRequest, void>{
    constructor(private repository: IUsersRepository){}
    async execute(request: ModifyUserRequest): Promise<void> {
        let user : IUser;
        if(request.id){
            user = await this.repository.findById(request.id, false, true)
        }else{
            user = await this.repository.findByUsername(request.currentUsername, false, true)
        }
        await this.repository.update(user, request);
    }
}