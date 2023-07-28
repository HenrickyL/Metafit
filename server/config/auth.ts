import { AuthenticatedUserSessionsData } from "@core/domain/DTOs/AuthenticationDTO";
import { RegisterUserRequest } from "@core/domain/DTOs/userDTO";
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config())
interface IAuth{
  port: string
  secretKey: string
  expireIn: string
}

export const admCredentials: RegisterUserRequest = {
  username:  process.env.ADM_USERNAME || "admin",
  email: "myAdmin@gmail.com",
  password: process.env.ADM_PASSWORD || "Admin@12345",
  name: "admin"
}

export const auth : IAuth = {
  port: process.env.API_PORT || process.env.PORT,
  secretKey: process.env.APP_SECRET,
  expireIn: `${2}h` 
};
export const appUrl:string = `'http://${process.env.DOMAIN}:${auth.port}'`
export abstract class InSection{
    static auth: AuthenticatedUserSessionsData

    static IsEqualUsername(username: string): boolean{
      return this.auth.InSessionUsername.toLocaleLowerCase() == username.toLocaleLowerCase()
    }
}