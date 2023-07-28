import { ErrorException } from "./ErrorException"

export class NotFountException extends ErrorException {
    constructor(param: string) {
      super(param || `Not Found Exception.`)
      this.name = 'NotFoundException'
      this._code = 404
    }
  }