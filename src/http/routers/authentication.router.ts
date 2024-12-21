import { Router } from "express";
import { ensureAuthenticated } from "@/http/middlewares/ensureAuthenticated";
import { AuthController } from "@/http/controllers/auth.controller";

import * as authRepositories from "@/core/repositories/auth";
import * as authUseCases from "@/core/usecases/auth";

export const router = Router();

const authController = new AuthController(
    new authUseCases.SignInUseCase(new authRepositories.SignInRepository()),
    new authUseCases.SignOutUseCase(new authRepositories.SignOutRepository()),
    new authUseCases.ValidateAuthUseCase(new authRepositories.ValidateAuthRepository())
);

router.post("/login", authController.signIn);
router.post("/logout", ensureAuthenticated, authController.signOut);
router.post("/validate", ensureAuthenticated, authController.validate);

export default { router };