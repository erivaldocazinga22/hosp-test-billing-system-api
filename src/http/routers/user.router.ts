import { Router } from "express";

import * as userRepositories from "@/core/repositories/users";
import * as userUseCases from "@/core/usecases/users";

import { avatarUploadMiddleware } from "@/http/middlewares/avatar-upload.middleware";
import { EnsureRole as ensureRole } from "../middlewares/ensureRole.middleware";
import { ensureAuthenticated } from "@/http/middlewares/ensureAuthenticated";

import { NewPassword } from "@/infrastructure/utils/newPassword";
import { UserController } from "../controllers/user.controller";


export const router = Router();
const userController = new UserController(
    new userUseCases.ReadUserUseCase(new userRepositories.ReadUserRepository()),
    new userUseCases.ReadOneUserUseCase(new userRepositories.ReadOneUserRepository()),
    new userUseCases.CreateUserUseCase(
        new NewPassword(),
        new userRepositories.CreateUserRepository(),
        new userRepositories.UserAlreadyExistsRepository(),
    ),
    new userUseCases.UpdateUserUseCase(new userRepositories.UpdateUserRepository()),
    new userUseCases.DeleteUserUseCase(new userRepositories.DeleteUserRepository()),
    new userUseCases.AvatarUserUseCase(new userRepositories.AvatarUserRepository())
);

router.get("/", ensureAuthenticated, ensureRole.handle(["SUPER_ADMIN", "ADMIN"]), userController.findAll);
router.get("/:id", ensureAuthenticated, ensureRole.handle(["SUPER_ADMIN", "ADMIN"]), userController.findOne);
router.delete("/:id", ensureAuthenticated, ensureRole.handle(["SUPER_ADMIN"]), userController.delete);
router.post("/", ensureAuthenticated, ensureRole.handle(["SUPER_ADMIN", "ADMIN"]), userController.create);  
router.patch("/:id", ensureAuthenticated, ensureRole.handle(["SUPER_ADMIN", "ADMIN"]), userController.update);
router.put("/avatar", avatarUploadMiddleware.single("avatar"), ensureAuthenticated, userController.avatarUpdate);

export default { router };