import { Category, Group, GroupCategory } from "@prisma/client";

export interface GroupCategoryModel extends GroupCategory{
    group?:         Group
    category?:      Category
}