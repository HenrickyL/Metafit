import {Category, GroupCategory } from "@prisma/client"

export interface CategoryModel extends Category{
    groups?:        GroupCategory[]
}