import { env } from "./env.config";

export const corsOptions = {
    origin: env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204
};