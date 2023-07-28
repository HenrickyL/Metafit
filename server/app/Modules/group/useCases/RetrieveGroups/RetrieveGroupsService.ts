import { RetrieveGroupsPaginationResponse, RetrieveGroupsRequest } from "@core/domain/DTOs/GroupDTO";
import { IUser } from "@core/domain/entities";
import { FilterRetrieveGroupsFields, SortOrder, SortRetrieveGroupsFields } from "@core/domain/enums";
import { RequestCategoryIdTypeError, RequestTypeError } from "@core/domain/errors";
import { PaginationAdapter } from "@core/domain/middleware/PaginationAdapter";
import { IUseCase } from "@core/infra/IUseCase";
import { ICategoryRepository } from "@modules/category/repositories/ICategoryRepository";
import { GroupMapper } from "@modules/group/mapper/GroupMapper";
import { IGroupsRepository } from "@modules/group/repositories/IGroupsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class RetrieveGroupsService implements IUseCase<RetrieveGroupsRequest, RetrieveGroupsPaginationResponse>{
    private mapper: GroupMapper = GroupMapper.instance()

    constructor(
        private repository: IGroupsRepository,
        private userRepository: IUsersRepository,
        private categoryRepository: ICategoryRepository){}
    //////////////////////////
    async execute(request: RetrieveGroupsRequest): Promise<RetrieveGroupsPaginationResponse> {
        this.validate(request)
        await this.validateAsync(request)
        let user: IUser;
        if(request.id){
            user = await this.userRepository.findById(request.id, true, true)
        }else if(request.username){
            user = await this.userRepository.findByUsername(request.username, true, true)
        }
        const groupsPagination = await this.repository.findAllByUser(user, request)
        const result: RetrieveGroupsPaginationResponse = {
            data: PaginationAdapter.getDataArray(groupsPagination.data).map(g=>this.mapper.toRetrieveGroupsResponse(g, true,user)),
            pagination: groupsPagination.pagination
        }
        return result
        
    }
   
    

    validate(request: RetrieveGroupsRequest) : void{
        if(request.sortOrder && !Object.values(SortOrder).includes(request.sortOrder)){
            throw new RequestTypeError("SortOrder", request.sortOrder.toString())
        }
        if(request.sortField && !Object.values(SortRetrieveGroupsFields).includes(request.sortField)){
            throw new RequestTypeError("SortField", request.sortField.toString())
        }
        if(request.filterField && !Object.values(FilterRetrieveGroupsFields).includes(request.filterField)){
            throw new RequestTypeError("FilterField", request.filterField.toString())
        }
        if(request.filterField && request.filterField == FilterRetrieveGroupsFields.categoryId){
            if (!request.filterValue  || isNaN(parseInt(request.filterValue))) {
                throw new RequestCategoryIdTypeError(request.filterValue)
            }
        }
    }
    async validateAsync(request: RetrieveGroupsRequest): Promise<void>{
        if(request.filterField == FilterRetrieveGroupsFields.categoryId){
            if (!request.filterValue  || isNaN(parseInt(request.filterValue))) {
            this.categoryRepository.validateListIds([parseInt(request.filterValue)])
            }
        }
    }
}