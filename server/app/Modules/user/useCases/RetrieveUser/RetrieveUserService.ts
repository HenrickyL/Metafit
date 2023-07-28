import { RetrieveUserRequest, UserResponse } from "@core/domain/DTOs/userDTO";
import { IUser } from "@core/domain/entities";
import { IUseCase } from "@core/infra/IUseCase";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class RetrieveUserService implements IUseCase<RetrieveUserRequest, UserResponse>{
    private mapper: UserMapper = UserMapper.instance()

    constructor(
        private repository: IUsersRepository){}
    
    async execute(request: RetrieveUserRequest): Promise<UserResponse> {
        await this.validateAsync(request)
        let user: IUser;
        if(request.id){
            user = await this.repository.retrieve('id', request.id)
        }else{
            user = await this.repository.retrieve('username', request.username)
        }
        return this.mapper.toResponse(user, true)
    }
    async validateAsync(request: RetrieveUserRequest): Promise<void>{
        if(request.id){
            await this.repository.findById(request.id, false, true)
        }else{
            await this.repository.findByUsername(request.username, false, true)
        }
    }
}