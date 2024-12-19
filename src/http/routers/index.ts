import express from "express";
import userRouter from "./user.router";
import authenticationRouter from "./authentication.router";

export const router = express.Router();

router.use("/", authenticationRouter.router);
router.use("/users", userRouter.router);
