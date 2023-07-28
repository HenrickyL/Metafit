import { BadRequestException } from "@core/Exceptions"

export class ModifyUsernameError extends BadRequestException {
    constructor(username: string) {
      super(`The username  '${username}' already Exist.`)
      this.name = 'ModifyUsernameError'
    }
}