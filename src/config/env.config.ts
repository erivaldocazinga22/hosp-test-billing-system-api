import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("5500").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "PORT deve ser um número positivo válido.",
    }),
    DATABASE_URL: z.string().url({ message: "DATABASE_URL deve ser uma URL válida." }),
    CORS_ORIGIN: z.string(),
    JWT_SECRET_ACCESS: z.string().min(16, { message: "JWT_SECRET_ACCESS deve ter pelo menos 16 caracteres." }),
    JWT_SECRET_REFRESH: z.string().min(16, { message: "JWT_SECRET_REFRESH deve ter pelo menos 16 caracteres." }),
    CLOUDINARY_CLOUD_NAME: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "A string deve conter letras e números"),
    CLOUDINARY_API_KEY: z.string().regex(/^[0-9]+$/, "A string deve conter apenas números"),
    CLOUDINARY_API_SECRET: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "A string deve conter letras e números")
});

export const env = envSchema.parse(process.env);