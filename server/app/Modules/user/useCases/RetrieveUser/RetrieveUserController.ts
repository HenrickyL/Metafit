import { RetrieveUserRequest, UserResponse } from "@core/domain/DTOs/userDTO";
import { HttpResponse, Ok } from "@core/domain/HttpResponses";
import { Username } from "@core/domain/middleware";
import { IController } from "@core/infra/IController";
import { RetrieveUserService } from "./RetrieveUserService";

export class RetrieveUserController implements IController<RetrieveUserRequest, UserResponse>{
    constructor(private useCase: RetrieveUserService){}
    
    async handle(request: RetrieveUserRequest): Promise<HttpResponse<UserResponse>>{
        request = this.formatData(request)
        const result = await this.useCase.execute(request)
        return Ok<UserResponse>(result)
    }

    formatData(request: RetrieveUserRequest): RetrieveUserRequest{
        return{
            id: request.id,
            username: Username.format(request.username)
        }
    }

}