import { RegisterGoalRequest } from "@core/domain/DTOs/GoalDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { GoalType } from "@core/domain/enums/GoalType";
import { Username } from "@core/domain/middleware";
import { IController } from "@core/infra/IController";
import { UserGroupRegisterGoalService } from "./UserGroupRegisterGoalService";
import { Numeric } from "@core/domain/middleware/Numeric";

export class UserGroupRegisterGoalController implements IController<RegisterGoalRequest, void>{
    constructor(private useCase: UserGroupRegisterGoalService){}

    async handle(request: RegisterGoalRequest):Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: RegisterGoalRequest): RegisterGoalRequest{
        return{
            categoryId: Numeric.format(request.categoryId),
            groupId: request.groupId?.trim(),
            username: Username.format(request.username),
            title: request.title?.trim(),
            description: request.description?.trim(),
            type: request.type || GoalType.ONCE,
            recurrence: request.recurrence,
            target: request.target,
            startDate: request.startDate || new Date(),
            endDate:request.endDate,
            frequency: request.frequency
        }
    }

}