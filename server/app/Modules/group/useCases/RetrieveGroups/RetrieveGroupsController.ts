import { RetrieveGroupsPaginationResponse, RetrieveGroupsRequest, RetrieveGroupsResponse } from "@core/domain/DTOs/GroupDTO";
import { HttpResponse, Ok } from "@core/domain/HttpResponses";
import { Username } from "@core/domain/middleware";
import { IController } from "@core/infra/IController";
import { RetrieveGroupsService } from "./RetrieveGroupsService";
import { SortOrder, SortRetrieveGroupsFields } from "@core/domain/enums";
import { Numeric } from "@core/domain/middleware/Numeric";
import { Text } from "@core/domain/middleware/Text";
import { Url } from "@core/domain/middleware/Url";

export class RetrieveGroupsController implements IController<RetrieveGroupsRequest, RetrieveGroupsPaginationResponse>{
    constructor(private useCase: RetrieveGroupsService){}
    async handle(request: RetrieveGroupsRequest): Promise<HttpResponse<RetrieveGroupsPaginationResponse>>{
        request = this.formatData(request)
        const result = await this.useCase.execute(request)
        return Ok<RetrieveGroupsPaginationResponse>(result)
    }
    formatData(request: RetrieveGroupsRequest) : RetrieveGroupsRequest{
        return{
            id: request.id?.trim(),
            username: Username.format(request.username),
            sortOrder: request.sortOrder || SortOrder.ASC,
            sortField: request.sortField || SortRetrieveGroupsFields.name,
            skip: Numeric.formatOr(request.skip, 0),
            take: Numeric.formatOr(request.take, 10),
            filterField: request.filterField,
            filterValue: Text.format(request.filterValue),
        }
    }

}