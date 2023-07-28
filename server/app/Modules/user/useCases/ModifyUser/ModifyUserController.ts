import { ModifyUserRequest } from "@core/domain/DTOs/userDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { ModifyUserService } from "./ModifyUserService";
import { Email, Username } from "@core/domain/middleware";
import { Url } from "@core/domain/middleware/Url";
import { Text } from "@core/domain/middleware/Text";

export class ModifyUserController implements IController<ModifyUserRequest, void>{
    constructor(private useCase: ModifyUserService){}
    async handle(request: ModifyUserRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: ModifyUserRequest): ModifyUserRequest{
        return{
            id: Text.format(request.id),
            email: Email.format(request.email),
            currentUsername: Username.format(request.currentUsername),
            imageUrl:  Url.format(request.imageUrl),
            name: Text.format(request.name),
            username:  Username.format(request.username),
        }
    }

}