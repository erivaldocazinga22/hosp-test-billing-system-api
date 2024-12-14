import { Router } from "express";
import { authenticationController } from "../controllers/auth/authentication.controller";
import { validateController } from "../controllers/auth/validate.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import * as usersController from "../controllers/user";
import * as rolesController from "../controllers/role";
import { avatarUploadMiddleware } from "../middlewares/avatar-upload.middleware";

export const routers = Router();

routers.get("/", (request, response) => {
    response.send("<h1>Welcome in Billing Sistem API Test</h1>");
});


// Authentications routers
routers.post("/login", authenticationController);
routers.post("/validate", ensureAuthenticated, validateController);

// Users routers
routers.put("/users/avatar", avatarUploadMiddleware.single("avatar"), ensureAuthenticated, usersController.avatarUpload);
routers.get("/users", usersController.findAll);
routers.get("/users/:id", usersController.findOne);
routers.post("/users", ensureAuthenticated, usersController.create);
routers.patch("/users/:id", ensureAuthenticated, usersController.update);
routers.delete("/users/:id", ensureAuthenticated, usersController.delete);

// roles routers
routers.get("/roles", rolesController.findAll);
routers.get("/roles/:id", rolesController.findOne);
routers.post("/roles", ensureAuthenticated, rolesController.create);
routers.patch("/roles/:id", ensureAuthenticated, rolesController.update);
routers.delete("/roles/:id", ensureAuthenticated, rolesController.delete);
