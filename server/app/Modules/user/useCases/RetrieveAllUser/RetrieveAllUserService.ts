import { PaginationResponse } from "@core/domain/DTOs";
import { RetrieveAllUserRequest, UserResponse, UserSummaryResponse } from "@core/domain/DTOs/userDTO";
import { SortOrder, SortRetrieveAllUserFields } from "@core/domain/enums";
import { RequestTypeError } from "@core/domain/errors";
import { PaginationAdapter } from "@core/domain/middleware/PaginationAdapter";
import { IUseCase } from "@core/infra/IUseCase";
import { UserMapper } from "@modules/user/mapper/UserMapper";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class RetrieveAllUserService implements IUseCase<RetrieveAllUserRequest, PaginationResponse<UserResponse>>{
    private mapper: UserMapper = UserMapper.instance()
    constructor(
        private repository: IUsersRepository){}

    async execute(request: RetrieveAllUserRequest): Promise<PaginationResponse<UserResponse>> {
        this.validate(request)
        const allUserPagination = await this.repository.findByAll(request);
        const response :PaginationResponse<UserResponse>= {
            data: PaginationAdapter.getDataArray(allUserPagination.data).map((u)=>this.mapper.toResponse(u)),
            pagination: allUserPagination.pagination
        }
        return response
        
    }

    validate(request: RetrieveAllUserRequest): void{
        if(!Object.values(SortOrder).includes(request.sortOrder)){
            throw new RequestTypeError("SortOrder", request.sortOrder.toString())
        }
        if(!Object.values(SortRetrieveAllUserFields).includes(request.sortField)){
            throw new RequestTypeError("SortField", request.sortField.toString())
        }
    }
}