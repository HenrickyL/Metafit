import { BadRequestException } from "@core/Exceptions"

export class InvalidJWTTokenError extends BadRequestException {
    constructor() {
      super(`The JWT token is invalid.`)
      this._code = 401
      this.name = 'InvalidJWTTokenError'
    }
  }

  export class JWTTokenExpiredError extends BadRequestException {
    constructor() {
      super(`The JWT token has expired.`)
      this._code = 401
      this.name = 'JWTTokenExpiredError'
    }
  }

  