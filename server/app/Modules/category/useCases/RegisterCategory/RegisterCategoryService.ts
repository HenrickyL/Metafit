import { baseCategories } from "@config/categories";
import { RegisterCategoryRequest } from "@core/domain/DTOs/CategoryDTO";
import { IUseCase } from "@core/infra/IUseCase";
import { ICategoryRepository } from "@modules/category/repositories/ICategoryRepository";

export class RegisterCategoryService implements IUseCase<RegisterCategoryRequest,void>{
    constructor(
        private repository: ICategoryRepository
        ) {}
    async execute(request: RegisterCategoryRequest): Promise<void> {
        await this.repository.create(request);
    }

    async RegisterBaseCategories(): Promise<void>{
        const listCategorires = baseCategories
        for(let request of listCategorires){
            const existCategory = await this.repository.findByName(request.name, false, false)
            if(!existCategory){
            await this.execute(request)
            }
        }
    }
}