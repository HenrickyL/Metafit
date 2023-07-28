import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import express from "express";
import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { PrismaUseCasesControllers } from "../factories/controllers";


const categoryRouter = express.Router()

categoryRouter.get('(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?', adaptRoute(PrismaUseCasesControllers.getRetrieveAllCategoriesController()))
categoryRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))
categoryRouter.post('/', adaptRoute(PrismaUseCasesControllers.getRegisterCategoryController()))


export { categoryRouter}
