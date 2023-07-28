import { PaginationInfo } from "../DTOs";

export abstract class PaginationAdapter{
    public static getInfo(totalCount: number | number[], skip: number, take: number):PaginationInfo{
        totalCount = totalCount
        const pageCount = Array.isArray(totalCount)? 
            totalCount.map(x=>Math.ceil(x / take)): 
            Math.ceil(totalCount / take); // Total de páginas
        const currentPage = Math.floor(skip / take) + 1; // Página atual
        const paginationInfo: PaginationInfo = {
            totalCount: totalCount,
            pageCount: pageCount,
            currentPage: currentPage,
            perPage: take,
        };
        return paginationInfo
    } 

    public static getDataArray<T>(value: T | T[]): T[]{
        return Array.isArray(value) ? value: []
    }
    public static getData<T>(value: T | T[]): T{
        if(Array.isArray(value)){
            throw new Error('Pagination Data not be array')
        }
        return value
    }
}