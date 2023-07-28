import { IMiddleware } from "@core/infra/IMiddleware"
import { EnsureAuthenticatedMiddleware } from "@infra/middlewares/EnsureAuthenticatedMiddleware"

export function makeEnsureAuthenticatedMiddleware(): IMiddleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()
  return ensureAuthenticatedMiddleware
}
