import "express-async-errors";
import "module-alias/register";
import "tsconfig-paths/register";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { router } from "./routers";
import compression from "compression";
import { corsOptions } from "@/core/config/cors.config";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors(corsOptions))
    .use(helmet())
    .use(compression({
        level: 9,
        threshold: 0,
        filter: (req, res) => req.headers["x-no-compression"] ? false : compression.filter(req, res),
    }))
    .use("/api", router)
    .use(errorMiddleware);
