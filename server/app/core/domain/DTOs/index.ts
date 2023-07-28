import { SortOrder } from "../enums"

export type AuthenticatedMiddlewareRequest = {
  accessToken?: string,
  authorization: string
}


export type AuthenticatedResponse = {
  userId: string,
  username: string,
  token: string
}


export interface PaginationRequest<SORT,FILTER=any>{
  sortOrder?: SortOrder
  skip?: number;
  take?: number;
  sortField?: SORT 
  filterField?: FILTER
  filterValue?: string
}


export interface PaginationInfo{
  totalCount: number | number[],
  pageCount: number | number[],
  currentPage: number,
  perPage: number
}
export interface PaginationResponse<T>{
  data: T[] | T,
  pagination:PaginationInfo
}

// {
//   "data": [
//     { "id": 1, "name": "Usuário 1" },
//     { "id": 2, "name": "Usuário 2" },
//     { "id": 3, "name": "Usuário 3" }
//   ],
//   "pagination": {
//     "total_count": 50,
//     "page_count": 5,
//     "current_page": 1,
//     "per_page": 3
//   }
// }