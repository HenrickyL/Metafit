import { IMapper } from "@core/infra/IMapper";
import { CategoryModel } from "../domain/CategoryModel";
import { ICategory } from "@core/domain/entities";
import { CategoryResponse, CategorySummaryResponse } from "@core/domain/DTOs/CategoryDTO";
import { GroupCategoryMapper } from "@modules/group/domain/groupCategory/mapper/GroupCategoryMapper";

export class CategoryMapper implements IMapper<ICategory, CategoryModel>{
    private static _instance : CategoryMapper;
    public static  instance():CategoryMapper{
        if(!CategoryMapper._instance){
            CategoryMapper._instance = new CategoryMapper()
        }
        return CategoryMapper._instance;
      }
    private constructor(){}
    /////////////////////
    toEntity(model: CategoryModel, populate?: boolean): ICategory {
        if(!model) return null
        const response: ICategory = {
            ...model
        }
        if(populate){
            response.groups = model.groups
                ?.map((g)=> GroupCategoryMapper.instance().toEntity(g))
        }
        return response;
    }
    toResponse(entity: ICategory, populate: boolean, doublePopulate?: boolean): CategoryResponse {
        return {
            id: entity.id,
            name: entity.name,
            imageUrl: entity.imageUrl,
            groups: populate ? entity.groups?.map((g)=> GroupCategoryMapper.instance().toResponse(g, doublePopulate)) : null
        }
    }
    toModel(entity: ICategory): CategoryModel {
        return{
            id: entity.id,
            imageUrl: entity.imageUrl,
            name: entity.name,
        }
    }

    toSummaryResponse(entity: ICategory): CategorySummaryResponse {
        return {
            id: entity.id,
            imageUrl: entity.imageUrl,
            name: entity.name,
        }
    }


}