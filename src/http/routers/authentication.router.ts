import { Router } from "express";
import * as authController from "@/http/controllers/auth";
import { ensureAuthenticated } from "@/http/middlewares/ensureAuthenticated";
export const router = Router();

router.post("/login", authController.auth);
router.post("/validate", ensureAuthenticated, authController.validate);

export default { router };