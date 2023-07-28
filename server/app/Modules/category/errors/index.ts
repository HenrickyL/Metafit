import { BadRequestException, NotFountException } from "@core/Exceptions"

export class CategoryNotFoundByIdError extends NotFountException {
    constructor(id: number) {
      super(`The category with id '${id}' not found.`)
      this.name = 'CategoryNotFoundByIdError'
    }
}

export class CategoryNotFoundByNameError extends NotFountException {
    constructor(name: string) {
      super(`The category with name '${name}' not found.`)
      this.name = 'CategoryNotFoundByNameError'
    }
}

export class CategoryAlreadyExistError extends BadRequestException {
  constructor(name: string) {
    super(`The category with name '${name}' already exists.`)
    this.name = 'CategoryAlreadyExistError'
  }
}