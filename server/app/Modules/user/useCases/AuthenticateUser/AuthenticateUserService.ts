import { JWT } from "@core/infra/jwt";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { AuthenticatedResponse } from "@core/domain/DTOs";
import { AuthenticateUserRequest } from "@core/domain/DTOs/AuthenticationDTO";
import { InvalidUsernameOrPasswordError } from "../../errors";
import { IUseCase } from "@core/infra/IUseCase";

export class AuthenticateUserService implements IUseCase<AuthenticateUserRequest, AuthenticatedResponse>{
  constructor(private usersRepository: IUsersRepository) {}

  async execute(request: AuthenticateUserRequest): Promise<AuthenticatedResponse> {
    const user = await this.usersRepository.findByUsername(request.username, false)
    if (!user) {
      throw new InvalidUsernameOrPasswordError()
    }
    const isPasswordValid = await user.password.comparePassword(request.password)
    if (isPasswordValid === false) {
      throw new InvalidUsernameOrPasswordError()
    }
    const { token } = JWT.signUser(user)

    return {
      userId: user.id,
      username: request.username,
      token
    }
  }
}