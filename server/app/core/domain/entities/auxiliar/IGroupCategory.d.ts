import { ICategory, IEntity, IGroup } from "..";

export interface IGroupCategory extends IEntity{
    id:             number
    groupId:        string
    categoryId:     number

    group?:         IGroup
    category?:      ICategory
}

