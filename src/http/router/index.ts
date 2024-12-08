import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { validateController } from "../controllers/auth/validate.controller";
import * as usersController from "../controllers/users.controller";
import { authenticatedTokenMiddleware as authenticatedToken } from "../middlewares/authenticatedToken";

export const routers = Router();

routers.get("/", (request, response) => {
    response.send("<h1>Welcome in Billing Sistem API Test</h1>");
});


// Authentications routers
routers.post("/login", loginController);
routers.post("/validate", authenticatedToken, validateController);

// Users routers
routers.get("/users", usersController.findAll)

