import { ICategory } from "@core/domain/entities";
import { ICategoryRepository } from "../ICategoryRepository";
import { CategoryMapper } from "@modules/category/mapper/CategoryMapper";
import { prisma } from "@infra/prisma";
import { CategoryAlreadyExistError, CategoryNotFoundByIdError, CategoryNotFoundByNameError } from "@modules/category/errors";
import { RegisterCategoryRequest, RetrieveAllCategoryRequest } from "@core/domain/DTOs/CategoryDTO";
import { PaginationInfo, PaginationResponse } from "@core/domain/DTOs";
import { Prisma } from "@prisma/client";

export class PrismaCategoryRepository implements ICategoryRepository{

    async create(data: RegisterCategoryRequest): Promise<void> {
        const exits = await this.findByName(data.name,false,false);
        if(exits){
            throw new CategoryAlreadyExistError(data.name)
        }
        await prisma.category.create({
            data:{
                name: data.name,
                imageUrl: data.imageUrl
            }
        })
    }
    async findByName(name: string, populate: boolean, validate?: boolean): Promise<ICategory> {
        const category = await prisma.category.findFirst({
            where:{name},
            include:{
                groups: populate
            }
        })
        if(validate && category){
            throw new CategoryNotFoundByNameError(name)
        }
        return CategoryMapper.instance().toEntity(category, populate)
    }

    async findById(id: number, populate: boolean, validate?: boolean): Promise<ICategory> {
        const category = await prisma.category.findUnique({
            where:{id: id},
            include:{
                groups: populate
            }
        })
        if(validate && category){
            throw new CategoryNotFoundByIdError(id)
        }
        return CategoryMapper.instance().toEntity(category, populate)
    }

    async findAll(pagination?: RetrieveAllCategoryRequest,populate?: boolean): Promise<PaginationResponse<ICategory>> {
        const query: Prisma.CategoryFindManyArgs = {}
        if(pagination){
            query['orderBy'] = {[pagination.sortField]: pagination.sortOrder}
            query['take'] = pagination.take
            query['skip'] = pagination.skip
        }
        if(populate){
            query['include'] = {groups: true}
        }
        const allCategories = await prisma.category.findMany(query)
        const totalCount = await prisma.category.count(); // Total de registros disponíveis na coleção
        const pageCount = Math.ceil(totalCount / pagination.take); // Total de páginas
        const currentPage = Math.floor(pagination.skip / pagination.take) + 1; // Página atual

        const paginationInfo: PaginationInfo = {
        totalCount: totalCount,
        pageCount: pageCount,
        currentPage: currentPage,
        perPage: pagination?.take,
        };
        return {
            data: allCategories.map( c=> CategoryMapper.instance().toResponse(c, populate)),
            pagination: paginationInfo
        }
    }

    async validateListIds(categoriesIds: number[]): Promise<void> {
        for(let categoryId of categoriesIds){
            const categoryExist = await prisma.category.findUnique({
                where:{
                    id: categoryId
                }
            }) 
            if(!categoryExist){
                throw new CategoryNotFoundByIdError(categoryId)
            }
        }
    }
}
