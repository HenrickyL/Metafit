import { BadRequestException, ErrorException, NotFountException } from "@core/Exceptions"

export class GroupIdNotFound extends NotFountException {
    constructor(id: string) {
      super(`The group with id '${id}' not found.`)
      this.name = 'GroupIdNotFound'
    }
  }

export class GroupNameNotBeNullError extends BadRequestException {
  constructor() {
    super(`Group name not be null.`)
    this.name = 'NameNotBeNullError'
  }
}

export class GroupNameByUsernameAlreadyExistError extends BadRequestException {
  constructor(name: string, username: string) {
    super(`Group name '${name}' already exists for this user '${username}'`)
    this.name = 'GroupNameByUsernameAlreadyExistError'
  }
}

export class GroupIdNotBeNullError extends BadRequestException {
  constructor() {
    super(`Group id not be null.`)
    this.name = 'GroupIdNotBeNullError'
  }
}

export class IdAndUsernameNotBeNullError extends BadRequestException {
  constructor() {
    super(`Id and Username not be null.`)
    this.name = 'IdAndUsernameNotBeNullError'
  }
}

export class GroupIdNotCreatedByUserError extends NotFountException {
  constructor(groupId: string, username: string) {
    super(`The group with id '${groupId}' not created by user '${username}'.`)
    this.name = 'GroupIdNotCreatedByUserError'
  }
}