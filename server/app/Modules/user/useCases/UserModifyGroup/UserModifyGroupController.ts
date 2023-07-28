import { ModifyGroupRequest } from "@core/domain/DTOs/GroupDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { Username } from "@core/domain/middleware";
import { Text } from "@core/domain/middleware/Text";
import { IController } from "@core/infra/IController";
import { UserModifyGroupService } from "./UserModifyGroupService";

export class UserModifyGroupController implements IController<ModifyGroupRequest, void>{
    constructor(private useCase: UserModifyGroupService){}
    async handle(request: ModifyGroupRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: ModifyGroupRequest): ModifyGroupRequest{
        return {
            currentUserId: Text.format(request.currentUserId),
            currentUsername: Username.format(request.currentUsername),
            groupId: Text.format(request.groupId),
            description: Text.format(request.description),
            name: Text.format(request.name),
            categoriesIds : request.categoriesIds? Array.from(new Set(request.categoriesIds)) : null
        }
    }

}