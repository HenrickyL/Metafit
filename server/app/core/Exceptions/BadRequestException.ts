import { ErrorException } from "./ErrorException"

export class BadRequestException extends ErrorException {
    constructor(param: string) {
      super(param || `Bad Request Exception.`)
      this.name = 'Bad Request Exception'
      this._code = 400
    }
  }