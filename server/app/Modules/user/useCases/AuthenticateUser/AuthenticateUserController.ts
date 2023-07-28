import { IController } from "@core/infra/IController";
import { AuthenticatedResponse } from "@core/domain/DTOs";
import { AuthenticateUserRequest } from "@core/domain/DTOs/AuthenticationDTO";
import { HttpResponse, Ok } from "@core/domain/HttpResponses";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { Password, Username } from "@core/domain/middleware";

export default class AuthenticateUserController implements IController<AuthenticateUserRequest, AuthenticatedResponse> {
  constructor(private authUser: AuthenticateUserService){}

  async handle(request: AuthenticateUserRequest): Promise<HttpResponse<AuthenticatedResponse>>{
    request = this.formatData(request)
    const result = await this.authUser.execute(request)
    return Ok(result)
  }

  formatData(request: AuthenticateUserRequest): AuthenticateUserRequest{
    return {
      username: Username.format(request.username),
      password: Password.format(request.password)
    }
  }

}