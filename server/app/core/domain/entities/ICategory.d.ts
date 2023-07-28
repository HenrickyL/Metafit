import { IEntity, IGroupCategory } from ".";

export interface ICategory extends IEntity{
    id:         number
    name:       string
    imageUrl?:  string
    groups?:    IGroupCategory[]
}

