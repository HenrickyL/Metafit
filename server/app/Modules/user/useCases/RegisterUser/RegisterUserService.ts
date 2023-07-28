import { UserMapper } from "@modules/user/mapper/UserMapper";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { RegisterUserRequest, RegisterUserResponse} from "@core/domain/DTOs/userDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { admCredentials } from "@config/auth";
import { Email, Password, Username } from "@core/domain/middleware";
import { Text } from "@core/domain/middleware/Text";

export class RegisterUserService implements IUseCase<RegisterUserRequest, RegisterUserResponse> {
  private mapper: UserMapper = UserMapper.instance()
  constructor(
    private usersRepository: IUsersRepository
    ) {}
  
  async validateAsync(request: RegisterUserRequest): Promise<void>{
    await this.usersRepository.validateUsernameNotExist(request.username)
    await this.usersRepository.validateEmailNotExist(request.email)
  }


  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    await this.validateAsync(request)
    const response = await this.usersRepository.create({
        username: Username.create(request.username),
        password: Password.create(request.password),
        name: Text.format(request.name),
        email: Email.create(request.email)
    })
    return this.mapper.toRegisterResponse(response)
  }

  // async RegisterAdminUser(): Promise<void>{
  //   const request = admCredentials
  //   const adminUser = await this.usersRepository.findByUsername(request.username, false, false)
  //   if(!adminUser){
  //     await this.execute(request)
  //   }
  // }
}