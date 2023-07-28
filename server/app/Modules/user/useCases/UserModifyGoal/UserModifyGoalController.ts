import { UserModifyGoalRequest } from "@core/domain/DTOs/GoalDTO";
import { HttpResponse, NoContent } from "@core/domain/HttpResponses";
import { IController } from "@core/infra/IController";
import { UserModifyGoalService } from "./UserModifyGoalService";
import { Text } from "@core/domain/middleware/Text";
import { Numeric } from "@core/domain/middleware/Numeric";
import { Username } from "@core/domain/middleware";

export class UserModifyGoalController implements IController<UserModifyGoalRequest,void>{
    constructor(private useCase: UserModifyGoalService){}
    async handle(request: UserModifyGoalRequest): Promise<HttpResponse<void>>{
        request = this.formatData(request)
        await this.useCase.execute(request)
        return NoContent()
    }
    formatData(request: UserModifyGoalRequest): UserModifyGoalRequest{
        return {
            currentUsername: Username.format(request.currentUsername),
            goalId: Text.format(request.goalId),
            groupId: Text.format(request.groupId),
            currentId: Text.format(request.currentId),
            title : Text.format(request.title),
            description: Text.format(request.description),
            progress: Numeric.format(request.progress),
            target: Numeric.format(request.target),
            frequency: Numeric.format(request.frequency),
            type: request.type,
            recurrence: request.recurrence,
            endDate: request.endDate,
            startDate: request.startDate
        }
    }
}