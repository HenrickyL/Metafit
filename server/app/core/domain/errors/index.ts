import { BadRequestException, ErrorException, NotFountException } from "@core/Exceptions"

export class IdNotBeNullError extends ErrorException {
  constructor() {
    super(`Internal Error. id not be null.`)
    this.name = 'IdNotBeNull'
  }
}

export class RequestTypeError extends BadRequestException {
  constructor(name: string, value: string) {
    super(`Type Error in Request param '${name}' and value '${value}'.`)
    this.name = 'RequestTypeError'
  }
}

export class RequestCategoryIdTypeError extends BadRequestException {
  constructor(value: string) {
    super(`Type Error in Request param 'CategoryId' with value '${value}' needs to be an integer.`)
    this.name = 'RequestCategoryIdTypeError'
  }
}

export class RequestCategoryIdNotFoundError extends NotFountException {
  constructor( value: string) {
    super(`Value Error in Request param 'CategoryId' with value '${value}' Not Found.`)
    this.name = 'RequestCategoryIdNotFoundError'
  }
}