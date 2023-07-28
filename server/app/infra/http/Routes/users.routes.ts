import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import express from "express";
import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { PrismaUseCasesControllers } from "../factories/controllers";


const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(PrismaUseCasesControllers.getRegisterUserController()))
usersRouter.get('(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?', adaptRoute(PrismaUseCasesControllers.getRetrieveAllUserController()))
usersRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
 *         - name
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /users:
 *   post:
 *     summary: RegisterUser
 *     description: Cria um usuário 
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: InvalidPasswordError -> The password must have at least 8 characters, one number, and at least one uppercase letter
 *              
 */
usersRouter.get('/id=:id', adaptRoute(PrismaUseCasesControllers.getRetrieveUserController()))
usersRouter.put('/id=:id', adaptRoute(PrismaUseCasesControllers.getModifyUserController()))
usersRouter.get('/id=:id/groups(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?', adaptRoute(PrismaUseCasesControllers.getRetrieveGroupsController()))
usersRouter.get('/:username', adaptRoute(PrismaUseCasesControllers.getRetrieveUserController()))
usersRouter.put('/:currentUsername', adaptRoute(PrismaUseCasesControllers.getModifyUserController()))
/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveGroupsResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         ownerId:
 *           type: string
 *         isPrivate:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         owner:
 *           $ref: '#/components/schemas/UserSummaryResponse'
 *       required:
 *         - id
 *         - name
 *         - description
 *         - ownerId
 *         - isPrivate
 *         - createdAt
 *     UserSummaryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *       required:
 *         - id
 *         - username
 *     PaginationInfo:
 *       type: object
 *       properties:
 *         totalCount:
 *           type: number
 *         pageCount:
 *           type: number
 *         currentPage:
 *           type: number
 *         perPage:
 *           type: number
 *       required:
 *         - totalCount
 *         - pageCount
 *         - currentPage
 *         - perPage
 *     RetrieveGroupsPaginationResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveGroupsResponse'
 *         pagination:
 *           $ref: '#/components/schemas/PaginationInfo'
 *       required:
 *         - data
 *         - pagination
 * 
 * /users/{username}/groups:
 *   get:
 *     summary: Retrieve Groups
 *     description: |
 *       Retrieve groups associated with a user.
 *       URL: https://example.com/users/{username}/groups(/sort/{sortField}/{sortOrder})?(/page/{take}/{skip})?(/filter/{filterField}={filterValue})?
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         description: User's username
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sortField
 *         description: Field to sort the groups by
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - isPrivate
 *             - owner
 *             - createdAt
 *             - updatedAt
 *             - categories
 *       - in: path
 *         name: sortOrder
 *         description: Sort order for the groups
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *       - in: path
 *         name: take
 *         description: Number of groups to retrieve
 *         schema:
 *           type: integer
 *       - in: path
 *         name: skip
 *         description: Number of groups to skip
 *         schema:
 *           type: integer
 *       - in: path
 *         name: filterField
 *         description: Field to filter the groups by
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - isPrivate
 *             - description
 *             - owner
 *             - member
 *             - categoryId
 *             - createdAt
 *             - updatedAt
 *       - in: path
 *         name: filterValue
 *         description: Value to filter the groups by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RetrieveGroupsPaginationResponse'
 *             example:
 *               data:
 *                 - id: "1"
 *                   name: "Group 1"
 *                   description: "This is group 1"
 *                   ownerId: "123"
 *                   isPrivate: true
 *                   createdAt: "2023-07-01T12:00:00Z"
 *                   updatedAt: "2023-07-01T14:00:00Z"
 *               pagination:
 *                 totalCount: 1
 *                 pageCount: 1
 *                 currentPage: 1
 *                 perPage: 10
 */

usersRouter.get('/:username/groups(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?(/filter/:filterField=:filterValue)?', adaptRoute(PrismaUseCasesControllers.getRetrieveGroupsController()))
usersRouter.post('/:senderUsername/groups/invite', adaptRoute(PrismaUseCasesControllers.getUserGroupInviteUserController()))
usersRouter.post('/:username/groups/invite/accept', adaptRoute(PrismaUseCasesControllers.getUserGroupAcceptInviteController()))
usersRouter.post('/:username/groups/goals', adaptRoute(PrismaUseCasesControllers.getUserGroupRegisterGoalController()))

usersRouter.put('/id=:currentUserId/groups/:groupId', adaptRoute(PrismaUseCasesControllers.getUserModifyGroupController()))
usersRouter.put('/:currentUsername/groups/:groupId', adaptRoute(PrismaUseCasesControllers.getUserModifyGroupController()))

usersRouter.put('/id=:currentUserId/groups/:groupId/goals/:goalId', adaptRoute(PrismaUseCasesControllers.getUserModifyGoalController()))
usersRouter.put('/:currentUsername/groups/:groupId/goals/:goalId', adaptRoute(PrismaUseCasesControllers.getUserModifyGoalController()))

usersRouter.patch('/id=:currentUserId/groups/:groupId', adaptRoute(PrismaUseCasesControllers.getUserFavoriteGroupController()))
usersRouter.patch('/:currentUsername/groups/:groupId', adaptRoute(PrismaUseCasesControllers.getUserFavoriteGroupController()))

usersRouter.get('/id=:id/invites(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?(/filter/:filterField=:filterValue)?', adaptRoute(PrismaUseCasesControllers.getRetrieveInvitesController()))
usersRouter.get('/:username/invites(/sort/:sortField?/:sortOrder?)?(/page/:take?/:skip?)?(/filter/:filterField=:filterValue)?', adaptRoute(PrismaUseCasesControllers.getRetrieveInvitesController()))

usersRouter.delete('/id=:id/invites/:inviteId', adaptRoute(PrismaUseCasesControllers.getUserRemoveInviteController()))
usersRouter.delete('/:username/invites/:inviteId', adaptRoute(PrismaUseCasesControllers.getUserRemoveInviteController()))

export { usersRouter }
