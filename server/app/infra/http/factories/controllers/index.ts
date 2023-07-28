import { PrismaCategoryRepository } from "@modules/category/repositories/prisma/PrismaCategoryRepository";
import { RegisterCategoryController } from "@modules/category/useCases/RegisterCategory/RegisterCategoryController";
import { RegisterCategoryService } from "@modules/category/useCases/RegisterCategory/RegisterCategoryService";
import { RetrieveAllCategoriesController } from "@modules/category/useCases/RetrieveAllCategories/RetrieveAllCategoriesController";
import { RetrieveAllCategoriesService } from "@modules/category/useCases/RetrieveAllCategories/RetrieveAllCategoriesService";
import { PrismaGroupRepository } from "@modules/group/repositories/prisma/PrismaGroupRepository";
import RegisterGroupController from "@modules/group/useCases/RegisterGroup/RegisterGroupController";
import { RegisterGroupService } from "@modules/group/useCases/RegisterGroup/RegisterGroupService";
import { RetrieveGroupsController } from "@modules/group/useCases/RetrieveGroups/RetrieveGroupsController";
import { RetrieveGroupsService } from "@modules/group/useCases/RetrieveGroups/RetrieveGroupsService";
import { PrismaUsersRepository } from "@modules/user/repositories/prisma/PrismaUserRepository";
import AuthenticateUserController from "@modules/user/useCases/AuthenticateUser/AuthenticateUserController";
import { AuthenticateUserService } from "@modules/user/useCases/AuthenticateUser/AuthenticateUserService";
import { ModifyUserController } from "@modules/user/useCases/ModifyUser/ModifyUserController";
import { ModifyUserService } from "@modules/user/useCases/ModifyUser/ModifyUserService";
import RegisterUserController from "@modules/user/useCases/RegisterUser/RegisterUserController";
import { RegisterUserService } from "@modules/user/useCases/RegisterUser/RegisterUserService";
import RetrieveAllUserController from "@modules/user/useCases/RetrieveAllUser/RetrieveAllUserController";
import { RetrieveAllUserService } from "@modules/user/useCases/RetrieveAllUser/RetrieveAllUserService";
import { RetrieveInvitesController } from "@modules/user/useCases/RetrieveInvites/RetrieveInvitesController";
import { RetrieveInvitesService } from "@modules/user/useCases/RetrieveInvites/RetrieveInvitesService";
import { RetrieveUserController } from "@modules/user/useCases/RetrieveUser/RetrieveUserController";
import { RetrieveUserService } from "@modules/user/useCases/RetrieveUser/RetrieveUserService";
import { UserFavoriteGroupController } from "@modules/user/useCases/UserFavoriteGroup/UserFavoriteGroupController";
import { UserFavoriteGroupService } from "@modules/user/useCases/UserFavoriteGroup/UserFavoriteGroupService";
import { UserGroupAcceptInviteController } from "@modules/user/useCases/UserGroupAcceptInvite/UserGroupAcceptInviteController";
import { UserGroupAcceptInviteService } from "@modules/user/useCases/UserGroupAcceptInvite/UserGroupAcceptInviteService";
import { UserGroupInviteUserController } from "@modules/user/useCases/UserGroupInviteUser/UserGroupInviteUserController";
import { UserGroupInviteUserService } from "@modules/user/useCases/UserGroupInviteUser/UserGroupInviteUserService";
import { UserGroupRegisterGoalController } from "@modules/user/useCases/UserGroupRegisterGoal/UserGroupRegisterGoalController";
import { UserGroupRegisterGoalService } from "@modules/user/useCases/UserGroupRegisterGoal/UserGroupRegisterGoalService";
import { UserModifyGoalController } from "@modules/user/useCases/UserModifyGoal/UserModifyGoalController";
import { UserModifyGoalService } from "@modules/user/useCases/UserModifyGoal/UserModifyGoalService";
import { UserModifyGroupController } from "@modules/user/useCases/UserModifyGroup/UserModifyGroupController";
import { UserModifyGroupService } from "@modules/user/useCases/UserModifyGroup/UserModifyGroupService";
import { UserRemoveInviteController } from "@modules/user/useCases/UserRemoveInvite/UserRemoveInviteController";
import { UserRemoveInviteService } from "@modules/user/useCases/UserRemoveInvite/UserRemoveInviteService";

export abstract class PrismaUseCasesControllers{
    //repository
    private static _categoryRepository:PrismaCategoryRepository;
    private static getCategoryRepository():PrismaCategoryRepository{
        if(!PrismaUseCasesControllers._categoryRepository){
            PrismaUseCasesControllers._categoryRepository = new PrismaCategoryRepository()
        }
        return PrismaUseCasesControllers._categoryRepository
    }
    private static _userRepository:PrismaUsersRepository;
    private static getUserRepository():PrismaUsersRepository{
        if(!PrismaUseCasesControllers._userRepository){
            PrismaUseCasesControllers._userRepository = new PrismaUsersRepository()
        }
        return PrismaUseCasesControllers._userRepository
    }
    private static _groupRepository:PrismaGroupRepository;
    private static getGroupRepository():PrismaGroupRepository{
        if(!PrismaUseCasesControllers._groupRepository){
            PrismaUseCasesControllers._groupRepository = new PrismaGroupRepository()
        }
        return PrismaUseCasesControllers._groupRepository
    }
    //service
    private static _retrieveUserService: RetrieveUserService;
    private static getRetrieveUserService():RetrieveUserService{
        if(!PrismaUseCasesControllers._retrieveUserService){
            PrismaUseCasesControllers
            ._retrieveUserService = 
                new RetrieveUserService(PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._retrieveUserService
    }
    private static _retrieveAllUserService:RetrieveAllUserService
    private static getRetrieveAllUserService():RetrieveAllUserService{
        if(!PrismaUseCasesControllers._retrieveAllUserService){
            PrismaUseCasesControllers
            ._retrieveAllUserService = 
                new RetrieveAllUserService(PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._retrieveAllUserService
    }
    private static _registerUserService: RegisterUserService
    private static getRegisterUserService():RegisterUserService{
        if(!PrismaUseCasesControllers._registerUserService){
            PrismaUseCasesControllers
            ._registerUserService = 
                new RegisterUserService(PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._registerUserService
    }
    private static _registerGroupService: RegisterGroupService
    private static getRegisterGroupService():RegisterGroupService{
        if(!PrismaUseCasesControllers._registerGroupService){
            PrismaUseCasesControllers
            ._registerGroupService = 
                new RegisterGroupService(
                    PrismaUseCasesControllers.getGroupRepository(),
                    PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._registerGroupService
    }
    private static _authenticateUserService: AuthenticateUserService
    private static getAuthenticateUserService():AuthenticateUserService{
        if(!PrismaUseCasesControllers._authenticateUserService){
            PrismaUseCasesControllers
            ._authenticateUserService = 
                new AuthenticateUserService(
                    PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._authenticateUserService
    }
    private static _retrieveGroupsService: RetrieveGroupsService
    private static getRetrieveGroupsService():RetrieveGroupsService{
        if(!PrismaUseCasesControllers._retrieveGroupsService){
            PrismaUseCasesControllers
            ._retrieveGroupsService = 
                new RetrieveGroupsService(
                    PrismaUseCasesControllers.getGroupRepository(),
                    PrismaUseCasesControllers.getUserRepository(),
                    PrismaUseCasesControllers.getCategoryRepository())
        }
        return PrismaUseCasesControllers._retrieveGroupsService
    }
    private static _userGroupInviteUserService: UserGroupInviteUserService
    private static getUserGroupInviteUserService():UserGroupInviteUserService{
        if(!PrismaUseCasesControllers._userGroupInviteUserService){
            PrismaUseCasesControllers
            ._userGroupInviteUserService = 
                new UserGroupInviteUserService(
                    PrismaUseCasesControllers.getGroupRepository(),
                    PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._userGroupInviteUserService
    }
    private static _userGroupAcceptInviteService: UserGroupAcceptInviteService;
    private static getUserGroupAcceptInviteService(): UserGroupAcceptInviteService{
        if(!PrismaUseCasesControllers._userGroupAcceptInviteService){
            PrismaUseCasesControllers
            ._userGroupAcceptInviteService = 
                new UserGroupAcceptInviteService(
                    PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._userGroupAcceptInviteService
    }
    private static _userGroupRegisterGoalService : UserGroupRegisterGoalService;
    private static getUserGroupRegisterGoalService(): UserGroupRegisterGoalService{
        if(!PrismaUseCasesControllers._userGroupRegisterGoalService){
            PrismaUseCasesControllers
            ._userGroupRegisterGoalService = 
                new UserGroupRegisterGoalService(
                    PrismaUseCasesControllers.getUserRepository(),
                    PrismaUseCasesControllers.getGroupRepository()
                    )
        }
        return PrismaUseCasesControllers._userGroupRegisterGoalService
    }
    private static _registerCategoryService : RegisterCategoryService;
    private static getRegisterCategoryService(): RegisterCategoryService{
        if(!PrismaUseCasesControllers._registerCategoryService){
            PrismaUseCasesControllers
            ._registerCategoryService = 
                new RegisterCategoryService(
                    PrismaUseCasesControllers.getCategoryRepository()
                    )
        }
        return PrismaUseCasesControllers._registerCategoryService
    }

    private static _retrieveAllCategoriesService : RetrieveAllCategoriesService;
    private static getRetrieveAllCategoriesService(): RetrieveAllCategoriesService{
        if(!PrismaUseCasesControllers._retrieveAllCategoriesService){
            PrismaUseCasesControllers
            ._retrieveAllCategoriesService = 
                new RetrieveAllCategoriesService(
                    PrismaUseCasesControllers.getCategoryRepository()
                    )
        }
        return PrismaUseCasesControllers._retrieveAllCategoriesService
    }
    private static _modifyUserService : ModifyUserService;
    private static getModifyUserService(): ModifyUserService{
        if(!PrismaUseCasesControllers._modifyUserService){
            PrismaUseCasesControllers
            ._modifyUserService = 
                new ModifyUserService(
                    PrismaUseCasesControllers.getUserRepository()
                    )
        }
        return PrismaUseCasesControllers._modifyUserService
    }

    private static _userModifyGroupService : UserModifyGroupService;
    private static getUserModifyGroupService(): UserModifyGroupService{
        if(!PrismaUseCasesControllers._userModifyGroupService){
            PrismaUseCasesControllers
            ._userModifyGroupService = 
                new UserModifyGroupService(
                    PrismaUseCasesControllers.getUserRepository(),
                    PrismaUseCasesControllers.getGroupRepository(),
                    PrismaUseCasesControllers.getCategoryRepository())
        }
        return PrismaUseCasesControllers._userModifyGroupService
    }

    private static _userFavoriteGroupService : UserFavoriteGroupService;
    private static getUserFavoriteGroupService(): UserFavoriteGroupService{
        if(!PrismaUseCasesControllers._userFavoriteGroupService){
            PrismaUseCasesControllers
            ._userFavoriteGroupService = 
                new UserFavoriteGroupService(
                    PrismaUseCasesControllers.getUserRepository(),
                    PrismaUseCasesControllers.getGroupRepository())
        }
        return PrismaUseCasesControllers._userFavoriteGroupService
    }

    private static _userModifyGoalService : UserModifyGoalService;
    private static getUserModifyGoalService(): UserModifyGoalService{
        if(!PrismaUseCasesControllers._userModifyGoalService){
            PrismaUseCasesControllers
            ._userModifyGoalService = 
                new UserModifyGoalService(
                    PrismaUseCasesControllers.getUserRepository(),
                    PrismaUseCasesControllers.getGroupRepository())
        }
        return PrismaUseCasesControllers._userModifyGoalService
    }

    private static _retrieveInvitesService : RetrieveInvitesService;
    private static getRetrieveInvitesService(): RetrieveInvitesService{
        if(!PrismaUseCasesControllers._retrieveInvitesService){
            PrismaUseCasesControllers
            ._retrieveInvitesService = 
                new RetrieveInvitesService(
                    PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._retrieveInvitesService
    }

    private static _userRemoveInviteService : UserRemoveInviteService;
    private static getUserRemoveInviteService(): UserRemoveInviteService{
        if(!PrismaUseCasesControllers._userRemoveInviteService){
            PrismaUseCasesControllers
            ._userRemoveInviteService = 
                new UserRemoveInviteService(
                    PrismaUseCasesControllers.getUserRepository())
        }
        return PrismaUseCasesControllers._userRemoveInviteService
    }
    
    //CONTROLLER----------------------------------------------------
    private static _retrieveUserController: RetrieveUserController;
    public static getRetrieveUserController():RetrieveUserController{
        if(!PrismaUseCasesControllers._retrieveUserController){
            PrismaUseCasesControllers
            ._retrieveUserController = 
                new RetrieveUserController(PrismaUseCasesControllers.getRetrieveUserService())
        }
        return PrismaUseCasesControllers._retrieveUserController
    }
    private static _retrieveAllUserController :RetrieveAllUserController
    public static getRetrieveAllUserController():RetrieveAllUserController{
        if(!PrismaUseCasesControllers._retrieveAllUserController){
            PrismaUseCasesControllers
            ._retrieveAllUserController = 
                new RetrieveAllUserController(PrismaUseCasesControllers.getRetrieveAllUserService())
        }
        return PrismaUseCasesControllers._retrieveAllUserController
    }
    private static _registerUserController: RegisterUserController
    public static getRegisterUserController():RegisterUserController{
        if(!PrismaUseCasesControllers._registerUserController){
            PrismaUseCasesControllers
            ._registerUserController = 
                new RegisterUserController(PrismaUseCasesControllers.getRegisterUserService())
        }
        return PrismaUseCasesControllers._registerUserController
    }
    private static _registerGroupController: RegisterGroupController
    public static getRegisterGroupController():RegisterGroupController{
        if(!PrismaUseCasesControllers._registerGroupController){
            PrismaUseCasesControllers
            ._registerGroupController = 
                new RegisterGroupController(PrismaUseCasesControllers.getRegisterGroupService())
        }
        return PrismaUseCasesControllers._registerGroupController
    }
    private static _authenticateUserController: AuthenticateUserController
    public static getAuthenticateUserController():AuthenticateUserController{
        if(!PrismaUseCasesControllers._authenticateUserController){
            PrismaUseCasesControllers
            ._authenticateUserController = 
                new AuthenticateUserController(PrismaUseCasesControllers.getAuthenticateUserService())
        }
        return PrismaUseCasesControllers._authenticateUserController
    }
    private static _retrieveGroupsController: RetrieveGroupsController
    public static getRetrieveGroupsController():RetrieveGroupsController{
        if(!PrismaUseCasesControllers._retrieveGroupsController){
            PrismaUseCasesControllers
            ._retrieveGroupsController = 
                new RetrieveGroupsController(PrismaUseCasesControllers.getRetrieveGroupsService())
        }
        return PrismaUseCasesControllers._retrieveGroupsController
    }
    private static _userGroupInviteUserController: UserGroupInviteUserController
    public static getUserGroupInviteUserController():UserGroupInviteUserController{
        if(!PrismaUseCasesControllers._userGroupInviteUserController){
            PrismaUseCasesControllers
            ._userGroupInviteUserController = 
                new UserGroupInviteUserController(PrismaUseCasesControllers.getUserGroupInviteUserService())
        }
        return PrismaUseCasesControllers._userGroupInviteUserController
    }
    private static _userGroupAcceptInviteController: UserGroupAcceptInviteController
    public static getUserGroupAcceptInviteController(): UserGroupAcceptInviteController{
        if(!PrismaUseCasesControllers._userGroupAcceptInviteController){
            PrismaUseCasesControllers._userGroupAcceptInviteController = 
                new UserGroupAcceptInviteController(PrismaUseCasesControllers.getUserGroupAcceptInviteService())
        }
        return PrismaUseCasesControllers._userGroupAcceptInviteController;
    }
    private static _userGroupRegisterGoalController: UserGroupRegisterGoalController;
    public static getUserGroupRegisterGoalController(): UserGroupRegisterGoalController{
        if(!PrismaUseCasesControllers._userGroupRegisterGoalController){
            PrismaUseCasesControllers._userGroupRegisterGoalController = 
                new UserGroupRegisterGoalController(PrismaUseCasesControllers.getUserGroupRegisterGoalService())
        }
        return PrismaUseCasesControllers._userGroupRegisterGoalController;
    }

    private static _registerCategoryController: RegisterCategoryController;
    public static getRegisterCategoryController(): RegisterCategoryController{
        if(!PrismaUseCasesControllers._registerCategoryController){
            PrismaUseCasesControllers._registerCategoryController = 
                new RegisterCategoryController(PrismaUseCasesControllers.getRegisterCategoryService())
        }
        return PrismaUseCasesControllers._registerCategoryController;
    }

    private static _retrieveAllCategoriesController: RetrieveAllCategoriesController;
    public static getRetrieveAllCategoriesController(): RetrieveAllCategoriesController{
        if(!PrismaUseCasesControllers._retrieveAllCategoriesController){
            PrismaUseCasesControllers._retrieveAllCategoriesController = 
                new RetrieveAllCategoriesController(PrismaUseCasesControllers.getRetrieveAllCategoriesService())
        }
        return PrismaUseCasesControllers._retrieveAllCategoriesController;
    }

    private static _modifyUserController: ModifyUserController;
    public static getModifyUserController(): ModifyUserController{
        if(!PrismaUseCasesControllers._modifyUserController){
            PrismaUseCasesControllers._modifyUserController = 
                new ModifyUserController(PrismaUseCasesControllers.getModifyUserService())
        }
        return PrismaUseCasesControllers._modifyUserController;
    }

    private static _userModifyGroupController: UserModifyGroupController;
    public static getUserModifyGroupController(): UserModifyGroupController{
        if(!PrismaUseCasesControllers._userModifyGroupController){
            PrismaUseCasesControllers._userModifyGroupController = 
                new UserModifyGroupController(PrismaUseCasesControllers.getUserModifyGroupService())
        }
        return PrismaUseCasesControllers._userModifyGroupController;
    }

    private static _userFavoriteGroupController: UserFavoriteGroupController;
    public static getUserFavoriteGroupController(): UserFavoriteGroupController{
        if(!PrismaUseCasesControllers._userFavoriteGroupController){
            PrismaUseCasesControllers._userFavoriteGroupController = 
                new UserFavoriteGroupController(PrismaUseCasesControllers.getUserFavoriteGroupService())
        }
        return PrismaUseCasesControllers._userFavoriteGroupController;
    }

    private static _userModifyGoalController: UserModifyGoalController;
    public static getUserModifyGoalController(): UserModifyGoalController{
        if(!PrismaUseCasesControllers._userModifyGoalController){
            PrismaUseCasesControllers._userModifyGoalController = 
                new UserModifyGoalController(PrismaUseCasesControllers.getUserModifyGoalService())
        }
        return PrismaUseCasesControllers._userModifyGoalController;
    }

    private static _retrieveInvitesController: RetrieveInvitesController;
    public static getRetrieveInvitesController(): RetrieveInvitesController{
        if(!PrismaUseCasesControllers._retrieveInvitesController){
            PrismaUseCasesControllers._retrieveInvitesController = 
                new RetrieveInvitesController(PrismaUseCasesControllers.getRetrieveInvitesService())
        }
        return PrismaUseCasesControllers._retrieveInvitesController;
    }

    private static _userRemoveInviteController: UserRemoveInviteController;
    public static getUserRemoveInviteController(): UserRemoveInviteController{
        if(!PrismaUseCasesControllers._userRemoveInviteController){
            PrismaUseCasesControllers._userRemoveInviteController = 
                new UserRemoveInviteController(PrismaUseCasesControllers.getUserRemoveInviteService())
        }
        return PrismaUseCasesControllers._userRemoveInviteController;
    }
}