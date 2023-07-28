import { RegisterCategoryRequest } from "@core/domain/DTOs/CategoryDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { RegisterCategoryService } from "./RegisterCategoryService";
import { Text } from "@core/domain/middleware/Text";

export class RegisterCategoryController implements IController<RegisterCategoryRequest, void>{
    constructor(private useCase: RegisterCategoryService){
        useCase.RegisterBaseCategories()
        .then(()=>{console.info('[System]->RegisterBaseCategories')})
        .catch(e => console.error('[System]->RegisterRegisterBaseCategories Error'))
    }

    async handle(request: RegisterCategoryRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: RegisterCategoryRequest):RegisterCategoryRequest{
        return{
            name: Text.format(request.name),
            imageUrl: Text.format(request.imageUrl)
        }
    }

}