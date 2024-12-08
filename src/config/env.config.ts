import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("5500"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    CORS_ORIGIN: z.string(),
})

export const env = envSchema.parse(process.env);