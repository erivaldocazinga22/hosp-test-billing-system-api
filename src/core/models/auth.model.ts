import z from "zod";

export const generateLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});