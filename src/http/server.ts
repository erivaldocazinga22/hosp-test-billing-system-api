import "express-async-errors";
import express from "express";
import cors from "cors";
import { corsConfig } from "../config/cors.config";
import { env } from "../config/env.config";
import { routers } from "./router";
import { errorMiddleware } from "./middlewares/error.middleware";

const PORT = parseInt(env.PORT);

export const app = express()
    .use(cors(corsConfig))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/api", routers)
    .use(errorMiddleware)
    .listen(PORT, () => {
        console.log(`Server running...`);
    });