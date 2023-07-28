import { PaginationRequest } from "."
import { SortRetrieveAllCategoriesFields } from "../enums"
import { GoalSummaryResponse } from "./GoalDTO"
import { GroupCategoryResponse } from "./auxiliar/GroupCategoryDTO"

export interface CategoryResponse extends CategorySummaryResponse{
    groups?:          GroupCategoryResponse[]
    goals?:           GoalSummaryResponse[]
}

export interface CategorySummaryResponse {
    id:               number
    imageUrl?:        string
    name:             string
}

export type RegisterCategoryRequest = {
    name:             string
    imageUrl?:        string
}

export interface RetrieveAllCategoryRequest extends PaginationRequest<SortRetrieveAllCategoriesFields> {
}