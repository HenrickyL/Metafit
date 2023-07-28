import { UserRemoveInviteRequest } from "@core/domain/DTOs/InviteDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { UserRemoveInviteService } from "./UserRemoveInviteService";
import { Text } from "@core/domain/middleware/Text";
import { Username } from "@core/domain/middleware";

export class UserRemoveInviteController implements IController<UserRemoveInviteRequest, void>{
    constructor(private useCase: UserRemoveInviteService){}
    async handle(request: UserRemoveInviteRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: UserRemoveInviteRequest): UserRemoveInviteRequest{
        return{
            id: Text.format(request.id),
            username: Username.format(request.username),
            inviteId: Text.format(request.inviteId),
            isReceived: request.isReceived
        }
    }
}