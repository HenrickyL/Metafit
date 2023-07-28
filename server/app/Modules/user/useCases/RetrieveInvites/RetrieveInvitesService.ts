import { RetrieveInvitesRequest, RetrieveInvitesPaginationResponse } from "@core/domain/DTOs/InviteDTO";
import { PaginationAdapter } from "@core/domain/middleware/PaginationAdapter";
import { IUseCase } from "@core/infra/IUseCase";
import { InviteMapper } from "@modules/user/domain/Invite/mapper/InviteMapper";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

export class RetrieveInvitesService implements IUseCase<RetrieveInvitesRequest, RetrieveInvitesPaginationResponse>{
    constructor(private repository: IUsersRepository){}
    async execute(request: RetrieveInvitesRequest): Promise<RetrieveInvitesPaginationResponse> {
        await this.validateAsync(request)
        const user = await this.repository.retrieveInvites(request)
        const response :RetrieveInvitesPaginationResponse= {
            data: {
                receivedInvites: user.receivedInvites?.map((i)=>InviteMapper.instance().toResponse(i, true)),
                sendedInvites: user.sendedInvites?.map((i)=>InviteMapper.instance().toResponse(i, true))
            },
            pagination: 
                PaginationAdapter.getInfo(
                    [user.receivedInvites?.length, user.sendedInvites?.length],
                    request.skip, request.take)
        }
        return response
    }
    async validateAsync(request: RetrieveInvitesRequest): Promise<void>{
        if(request.id){
            await this.repository.findById(request.id, false, true)
        }else{
            await this.repository.findByUsername(request.username, false, true)
        }
    }
    
}