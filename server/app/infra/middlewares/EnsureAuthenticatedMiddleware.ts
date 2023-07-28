import { IMiddleware } from "@core/infra/IMiddleware";
import { AuthenticatedMiddlewareRequest } from "@core/domain/DTOs";
import { HttpResponse} from "@core/domain/HttpResponses";
import { AccessDeniedError } from '@modules/user/errors/AuthenticateUserErrors';
import { JWT } from '@core/infra/jwt';
import { InSection } from "@config/auth";

export class EnsureAuthenticatedMiddleware implements IMiddleware<AuthenticatedMiddlewareRequest> {
  handle(request: AuthenticatedMiddlewareRequest): HttpResponse{
    const { accessToken,authorization } = request
    if(authorization){
      const token = accessToken || authorization.split(' ')[1]
      if (token && token != 'undefined') {
          const decoded = JWT.decodeToken(token)
          const [userId, username] = decoded.sub.split('@')
          InSection.auth = {
            inSessionUserId: userId,
            InSessionUsername: username,
            token
          }
          return
      }
    }
    throw new AccessDeniedError();
  }
}