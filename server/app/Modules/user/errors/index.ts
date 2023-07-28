import { InvalidPasswordErrors } from "@modules/user/domain/enums"
import { BadRequestException, ErrorException, NotFountException, UnauthorizedException } from "@core/Exceptions"

export class InvalidUsernameOrPasswordError extends BadRequestException{
  constructor() {
    super(`Invalid username/password combination.`)
    this.name = 'InvalidUsernameOrPasswordError'
  }
}
  
export class InvalidUsernameLengthError extends BadRequestException {
  constructor(username: string) {
    super(`The username '${username}' must have at least 3 characters.`)
    this.name = 'InvalidUsernameError'
  }
}

export class InvalidEmailError extends BadRequestException {
  constructor(email: string) {
    super(`The email format '${email}' is invalid.`)
    this.name = 'InvalidEmailError'
  }
}
export class InvalidUrlError extends BadRequestException {
  constructor(url: string) {
    super(`The Url format '${url}' is invalid.`)
    this.name = 'InvalidUrlError'
  }
}

export class InvalidPasswordError extends BadRequestException{
  constructor(errors:InvalidPasswordErrors[]) {
    const message = errors.map(x=>InvalidPasswordErrors[x]).join(', ')
    super(`The password must have between ${message}.`)
    this.name = 'InvalidPasswordError'
  }
}

export class UserAlreadyExistError extends BadRequestException {
  constructor(username: string) {
    super(`The username '${username}' already exists.`)
    this.name = 'UserAlreadyExistError'
  }
}

export class EmailAlreadyExistError extends BadRequestException {
  constructor(email: string) {
    super(`The email '${email}' already exists.`)
    this.name = 'EmailAlreadyExistError'
  }
}

export class UserNotFound extends NotFountException {
  constructor(id: string) {
    super(`The user with id '${id}' not found.`)
    this.name = 'UserNotFound'
  }
}

export class UsernameNotFound extends BadRequestException {
  constructor(username: string) {
    super(`The user with username '${username}' not found.`)
    this.name = 'UsernameNotFound'
  }
}



export class UsernameNotBeNullError extends ErrorException {
  constructor() {
    super(`Internal Error. Username not be null.`)
    this.name = 'UsernameNotBeNull'
  }
}

export class EmailNotBeNullError extends ErrorException {
  constructor() {
    super(`Email not be null.`)
    this.name = 'EmailNotBeNullError'
  }
}

export class PasswordAccessNotAllowed extends ErrorException {
  constructor() {
    super(`Password access not allowed.`)
    this.name = 'PasswordAccessNotAllowed'
  }
}

export class UserIdNotBeNullError extends BadRequestException {
  constructor() {
    super(`User id not be null.`)
    this.name = 'UserIdNotBeNullError'
  }
}

export class UserNotInGroupError  extends BadRequestException {
  constructor(username: string, groupId: string) {
    super(`The user '${username}' does not belong to the group with ID '${groupId}'.`)
    this.name = 'userNotInGroupError'
  }
}

export class GoalNotInGroupError  extends BadRequestException {
  constructor(goalId: string, groupId: string) {
    super(`The goal '${goalId}' does not belong to the group with ID '${groupId}'.`)
    this.name = 'GoalNotInGroupError'
  }
}
