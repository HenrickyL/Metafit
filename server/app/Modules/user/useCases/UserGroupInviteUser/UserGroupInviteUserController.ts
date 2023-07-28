import { HttpResponse, NoContent, Ok } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { UserGroupInviteUserService } from "./UserGroupInviteUserService";
import { Username } from "@core/domain/middleware";
import { UserGroupInviteUserRequest } from "@core/domain/DTOs/userDTO";

export class UserGroupInviteUserController implements IController<UserGroupInviteUserRequest, void>{
    constructor(private useCase: UserGroupInviteUserService){}
    
    async handle(request: UserGroupInviteUserRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: UserGroupInviteUserRequest): UserGroupInviteUserRequest{
        return{
            senderUsername: Username.format(request.senderUsername),
            receiverUsername: Username.format(request.receiverUsername),
            senderGroupId: request.senderGroupId?.trim()
        }
    }
}