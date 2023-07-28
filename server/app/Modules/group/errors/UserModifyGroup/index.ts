import { BadRequestException } from "@core/Exceptions"
import { UnAllowedError } from "@modules/user/errors/AuthenticateUserErrors"

export class ModifyGroupUserNotBelongGroupError extends BadRequestException {
    constructor(username: string) {
      super(`The user with name '${username}' can't be owner because he doesn't belong to the group.`)
      this.name = 'ModifyGroupUserNotBelongGroupError'
    }
  }


  export class ModifyGroupNameAlreadyExistError extends BadRequestException {
    constructor(username: string, groupName: string) {
      super(`The user named '${username}' already has a group named '${groupName}'.`)
      this.name = 'ModifyGroupNameAlreadyExistError'
    }
  }

  export class ModifyGroupUserIsNotOwnerGroupError extends BadRequestException {
    constructor(username: string, groupName: string) {
      super(`The user named '${username}' is Not Owner of the group with name '${groupName}'.`)
      this.name = 'ModifyGroupUserIsNotOwnerGroupError'
    }
  }