import { Router } from "express";
import * as usersController from "@/http/controllers/user";
import { ensureAuthenticated } from "@/http/middlewares/ensureAuthenticated";
import { avatarUploadMiddleware } from "@/http/middlewares/avatar-upload.middleware";

export const router = Router();

router.put("/avatar", avatarUploadMiddleware.single("avatar"), ensureAuthenticated, usersController.avatarUpload);
router.get("/", usersController.findAll);
router.get("/:id", usersController.findOne);
router.post("", ensureAuthenticated, usersController.create);
router.patch("/:id", ensureAuthenticated, usersController.update);
router.delete("/:id", ensureAuthenticated, usersController.delete);

export default { router };