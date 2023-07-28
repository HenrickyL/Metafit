import { IGroupCategory } from "@core/domain/entities";
import { IMapper } from "@core/infra/IMapper";
import { GroupCategoryModel } from "../domain/GroupCategoryModel";
import { GroupCategoryResponse } from "@core/domain/DTOs/auxiliar/GroupCategoryDTO";
import { CategoryMapper } from "@modules/category/mapper/CategoryMapper";
import { GroupMapper } from "@modules/group/mapper/GroupMapper";

export class GroupCategoryMapper implements IMapper<IGroupCategory, GroupCategoryModel>{
    private static _instance : GroupCategoryMapper;
    public static  instance():GroupCategoryMapper{
        if(!GroupCategoryMapper._instance){
            GroupCategoryMapper._instance = new GroupCategoryMapper()
        }
        return GroupCategoryMapper._instance;
      }
    private constructor(){}
    ///////////////////
    toEntity(model: GroupCategoryModel, populate?: boolean): IGroupCategory {
        if(!model) return null
        const response: IGroupCategory = {
            id: model.id,
            categoryId: model.categoryId,
            groupId: model.groupId
        }
        if(populate){
            response.category = model.category ? 
                CategoryMapper.instance().toEntity(model.category, populate) : null
            response.group = model.group ?
                GroupMapper.instance().toEntity(model.group) : null
        }
        return response
    }
   
    toResponse(entity: IGroupCategory, populate: boolean, doublePopulate?: boolean): GroupCategoryResponse {
        return {
            id: entity.id,
            categoryId: entity.categoryId,
            groupId: entity.groupId,
            // category: populate ?CategoryMapper.instance().toResponse(entity.category, doublePopulate) : null,
            // group: populate ?  GroupMapper.instance().toResponse(entity.group) : null
        }
    }

}