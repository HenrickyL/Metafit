import { BadRequestException } from "@core/Exceptions"

export class GoalAlreadyExistError  extends BadRequestException {
    constructor(title: string, groupId: string) {
      super(`The goal with title '${title}' already exist in group '${groupId}'.`)
      this.name = 'GoalAlreadyExistError'
    }
}