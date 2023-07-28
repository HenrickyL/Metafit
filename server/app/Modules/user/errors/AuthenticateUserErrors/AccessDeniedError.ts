import { UnauthorizedException } from "@core/Exceptions"

export class AccessDeniedError extends UnauthorizedException {
    constructor() {
      super(`Access denied.`)
      this.name = 'AccessDeniedError'
    }
  }