import { RegisterGroupRequest } from "@core/domain/DTOs/GroupDTO";
import { HttpResponse, NoContent, Ok } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { RegisterGroupService } from "./RegisterGroupService";
import { Password, Username } from "@core/domain/middleware";
import { Text } from "@core/domain/middleware/Text";
import { Url } from "@core/domain/middleware/Url";

export default class RegisterGroupController implements IController<RegisterGroupRequest, void> {
    constructor(private useCase: RegisterGroupService){}
    
    async handle(request: RegisterGroupRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }

    formatData(request: RegisterGroupRequest): RegisterGroupRequest{
        return {
            name: Text.format(request.name),
            ownerUsername: Username.format(request.ownerUsername),
            description: request.description?.trim(),
            isPrivate: request.isPrivate,
            password: Password.format(request.password),
            imageUrl: Url.format(request.imageUrl)
        }
    }
}