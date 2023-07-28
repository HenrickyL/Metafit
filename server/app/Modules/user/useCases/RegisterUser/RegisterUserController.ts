import { IController } from "@core/infra/IController";
import { RegisterUserRequest, RegisterUserResponse } from "@core/domain/DTOs/userDTO";
import { HttpResponse, Created} from "@core/domain/HttpResponses";
import { RegisterUserService } from "./RegisterUserService";
import { Email, Password, Username } from "@core/domain/middleware";
import { Text } from "@core/domain/middleware/Text";

export default class RegisterUserController implements IController<RegisterUserRequest, RegisterUserResponse> {
  constructor(private useCase: RegisterUserService){}

  async handle(request: RegisterUserRequest): Promise<HttpResponse<RegisterUserResponse>>{
    request = this.formatData(request)
    const result = await this.useCase.execute(request)
    return Created<RegisterUserResponse>(result)
  }

  formatData(request: RegisterUserRequest): RegisterUserRequest{
    return {
      username: Username.format(request.username),
      email: Email.format(request.email),
      name: Text.format(request.name),
      password: Password.format(request.password)
    }
  }
}