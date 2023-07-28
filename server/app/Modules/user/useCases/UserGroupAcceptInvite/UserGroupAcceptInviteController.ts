import { UserGroupAcceptInviteRequest } from "@core/domain/DTOs/userDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { Username } from "@core/domain/middleware";
import { IController } from "@core/infra/IController";
import { UserGroupAcceptInviteService } from "./UserGroupAcceptInviteService";

export class UserGroupAcceptInviteController implements IController<UserGroupAcceptInviteRequest, void>{
    constructor(private useCase: UserGroupAcceptInviteService){}
    
    async handle(request: UserGroupAcceptInviteRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: UserGroupAcceptInviteRequest): UserGroupAcceptInviteRequest{
        return{
            username: Username.format(request.username),
            inviteId: request.inviteId?.trim()
        }
    }
}