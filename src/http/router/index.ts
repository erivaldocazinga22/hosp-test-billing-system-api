import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { validateController } from "../controllers/auth/validate.controller";
import * as usersController from "../controllers/users";
import { authenticatedTokenMiddleware as authenticatedToken } from "../middlewares/authenticatedToken";

export const routers = Router();

routers.get("/", (request, response) => {
    response.send("<h1>Welcome in Billing Sistem API Test</h1>");
});


// Authentications routers
routers.post("/login", loginController);
routers.post("/validate", authenticatedToken, validateController);

// Users routers
routers.get("/users", usersController.findAll);
routers.get("/users/:id", usersController.findOne);
routers.post("/users", authenticatedToken, usersController.create);
routers.patch("/users/:id", authenticatedToken, usersController.update);
routers.delete("/users/:id", authenticatedToken, usersController.delete);

