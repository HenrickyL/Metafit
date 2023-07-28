import { PaginationResponse } from "@core/domain/DTOs";
import { CategorySummaryResponse, RetrieveAllCategoryRequest } from "@core/domain/DTOs/CategoryDTO";
import { ICategory } from "@core/domain/entities";
import { SortOrder, SortRetrieveAllCategoriesFields } from "@core/domain/enums";
import { RequestTypeError } from "@core/domain/errors";
import { PaginationAdapter } from "@core/domain/middleware/PaginationAdapter";
import { IUseCase } from "@core/infra/IUseCase";
import { CategoryMapper } from "@modules/category/mapper/CategoryMapper";
import { ICategoryRepository } from "@modules/category/repositories/ICategoryRepository";

export class RetrieveAllCategoriesService implements IUseCase<RetrieveAllCategoryRequest , PaginationResponse<CategorySummaryResponse>>{
    constructor(private repository: ICategoryRepository){}
    async execute(request: RetrieveAllCategoryRequest): Promise<PaginationResponse<CategorySummaryResponse>> {
        this.validate(request)
        const categoriesPagination = await this.repository.findAll(request,false);
        const response: PaginationResponse<CategorySummaryResponse> = {
            data: PaginationAdapter.getDataArray(categoriesPagination.data).map(c => CategoryMapper.instance().toSummaryResponse(c)),
            pagination: categoriesPagination.pagination
        }
        return response
    }
    validate(request: RetrieveAllCategoryRequest): void{
        if(!Object.values(SortOrder).includes(request.sortOrder)){
            throw new RequestTypeError("SortOrder", request.sortOrder.toString())
        }
        if(!Object.values(SortRetrieveAllCategoriesFields).includes(request.sortField)){
            throw new RequestTypeError("SortField", request.sortField.toString())
        }
    }
}