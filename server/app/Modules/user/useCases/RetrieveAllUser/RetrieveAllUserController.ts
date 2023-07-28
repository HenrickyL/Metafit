import { RetrieveAllUserRequest, UserResponse, UserSummaryResponse } from "@core/domain/DTOs/userDTO";
import { HttpResponse, Ok } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { RetrieveAllUserService } from "./RetrieveAllUserService";
import { SortOrder, SortRetrieveAllUserFields } from "@core/domain/enums";
import { Numeric } from "@core/domain/middleware/Numeric";
import { PaginationResponse } from "@core/domain/DTOs";

export default class RetrieveAllUserController implements IController<RetrieveAllUserRequest, PaginationResponse<UserResponse>> {
    constructor(private useCase: RetrieveAllUserService){}
    
    async handle (request: RetrieveAllUserRequest): Promise<HttpResponse<PaginationResponse<UserResponse>>>{
        request = this.formatData(request)
        const result = await this.useCase.execute(request)
        return Ok<PaginationResponse<UserResponse>>(result)
    }

    formatData(request: RetrieveAllUserRequest): RetrieveAllUserRequest{
        return {
            sortOrder: request.sortOrder || SortOrder.ASC,
            sortField: request.sortField || SortRetrieveAllUserFields.username,
            skip: Numeric.formatOr(request.skip,0),
            take: Numeric.formatOr(request.take,0)
        }
    }
}
