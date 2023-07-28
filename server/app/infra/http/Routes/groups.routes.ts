import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import express from "express";
import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { PrismaUseCasesControllers } from "../factories/controllers";


const groupRouter = express.Router()

groupRouter.get('(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?(/filter/:filterField=:filterValue)?', adaptRoute(PrismaUseCasesControllers.getRetrieveGroupsController()))
groupRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterGroupRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         createdById:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - name
 *         - createdById
 *
 *     GroupResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdById:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponse'
 *         goals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GoalResponse'
 *         achievements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AchievementResponse'
 *
 * /groups:
 *   post:
 *     summary: RegisterGroup
 *     description: Cria um novo grupo
 *     tags:
 *       - Groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterGroupRequest'
 *     responses:
 *       200:
 *         description: Grupo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupResponse'
 *       400:
 *         description: Alguns campos obrigatórios estão faltando ou inválidos
 */
groupRouter.post('/', adaptRoute(PrismaUseCasesControllers.getRegisterGroupController()))


export { groupRouter }
