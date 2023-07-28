import { FavoriteRequest } from "@core/domain/DTOs/GroupDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { Username } from "@core/domain/middleware";
import { Text } from "@core/domain/middleware/Text";
import { IController } from "@core/infra/IController";
import { UserFavoriteGroupService } from "./UserFavoriteGroupService";

export class UserFavoriteGroupController implements IController<FavoriteRequest, void>{
    constructor(private useCase: UserFavoriteGroupService){}
    async handle(request: FavoriteRequest) : Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: FavoriteRequest): FavoriteRequest{
        return{
            groupId: Text.format(request.groupId),
            currentUserId: Text.format(request.currentUserId),
            currentUsername: Username.format(request.currentUsername)
        }
    }
}