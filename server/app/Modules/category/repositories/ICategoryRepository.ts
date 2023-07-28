import { PaginationResponse } from "@core/domain/DTOs";
import { RegisterCategoryRequest, RetrieveAllCategoryRequest } from "@core/domain/DTOs/CategoryDTO";
import { ICategory } from "@core/domain/entities";

export interface ICategoryRepository {
  create(data: RegisterCategoryRequest): Promise<void>
  findByName(name: string, populate: boolean, validate?: boolean): Promise<ICategory>
  findById(id: number, populate: boolean, validate?: boolean): Promise<ICategory>
  findAll(pagination?: RetrieveAllCategoryRequest,populate?: boolean): Promise<PaginationResponse<ICategory>>
  validateListIds(categoriesIds: number[]): Promise<void>
}
