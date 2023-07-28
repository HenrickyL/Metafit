import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter"
import express from "express"
import { PrismaUseCasesControllers } from "../factories/controllers"

const sessionsRouter = express.Router()

sessionsRouter.post('/', adaptRoute(PrismaUseCasesControllers.getAuthenticateUserController()))

export { sessionsRouter }
