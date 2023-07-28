import { RetrieveInvitesRequest, RetrieveInvitesPaginationResponse } from "@core/domain/DTOs/InviteDTO";
import { HttpResponse, Ok } from "@core/domain/HttpResponses";
import { SortOrder } from "@core/domain/enums";
import { FilterRetrieveInvitesFields } from "@core/domain/enums/FilterRetrieveInvitesFields";
import { SortRetrieveInvitesFields } from "@core/domain/enums/SortRetrieveInvitesFields";
import { Username } from "@core/domain/middleware";
import { Enum } from "@core/domain/middleware/Enum";
import { Numeric } from "@core/domain/middleware/Numeric";
import { Text } from "@core/domain/middleware/Text";
import { IController } from "@core/infra/IController";
import { RetrieveInvitesService } from "./RetrieveInvitesService";

export class RetrieveInvitesController implements IController<RetrieveInvitesRequest, RetrieveInvitesPaginationResponse>{
    constructor(private useCase:RetrieveInvitesService){}
    async handle(request: RetrieveInvitesRequest): Promise<HttpResponse<RetrieveInvitesPaginationResponse>>{
        request = this.formatData(request)
        const response = await this.useCase.execute(request)
        return Ok<RetrieveInvitesPaginationResponse>(response)
    }
    formatData(request: RetrieveInvitesRequest): RetrieveInvitesRequest{
        request = {
            id: Text.format(request.id),
            username: Username.format(request.username),
            filterField: Enum.format(request.filterField, FilterRetrieveInvitesFields, 'FilterRetrieveInvitesFields'),
            sortField: Enum.format(request.sortField, SortRetrieveInvitesFields, 'SortRetrieveInvitesFields'),
            skip: Numeric.formatSkip(request.skip),
            take: Numeric.formatTake(request.take),
            filterValue: Text.format(request.filterValue),
            sortOrder: Enum.format(request.sortOrder, SortOrder, 'SortOrder'),
        }
        return request

    }
    
}