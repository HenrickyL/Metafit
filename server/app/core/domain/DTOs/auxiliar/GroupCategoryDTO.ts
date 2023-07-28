import { CategoryResponse } from "../CategoryDTO"
import { GroupResponse } from "../GroupDTO"

export type GroupCategoryResponse = {
    id:                 number
    groupId:            string
    categoryId:         number

    // group?:             GroupResponse
    // category?:          CategoryResponse
}