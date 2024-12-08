import { env } from "./env.config";
import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: env.CORS_ORIGIN || "0.0.0.0",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT"]
}