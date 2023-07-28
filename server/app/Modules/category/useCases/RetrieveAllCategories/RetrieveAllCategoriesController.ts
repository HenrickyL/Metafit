import { CategorySummaryResponse, RetrieveAllCategoryRequest } from "@core/domain/DTOs/CategoryDTO";
import { HttpResponse, Ok } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { RetrieveAllCategoriesService } from "./RetrieveAllCategoriesService";
import { PaginationResponse } from "@core/domain/DTOs";
import { Numeric } from "@core/domain/middleware/Numeric";
import { SortOrder, SortRetrieveAllCategoriesFields } from "@core/domain/enums";

export class RetrieveAllCategoriesController implements IController<RetrieveAllCategoryRequest, PaginationResponse<CategorySummaryResponse>>{
    constructor(private useCase: RetrieveAllCategoriesService){}
    async handle(request: RetrieveAllCategoryRequest) : Promise<HttpResponse<PaginationResponse<CategorySummaryResponse>>>{
        request = this.formatData(request)
        const response = await this.useCase.execute(request)
        return Ok<PaginationResponse<CategorySummaryResponse>>(response)
    }
    formatData(request: RetrieveAllCategoryRequest): RetrieveAllCategoryRequest{
        return {
            skip: Numeric.formatOr(request.skip,0),
            take: Numeric.formatOr(request.take,10),
            sortOrder: request.sortOrder ?? SortOrder.ASC,
            sortField: request.sortField ?? SortRetrieveAllCategoriesFields.name
        }
    }
}