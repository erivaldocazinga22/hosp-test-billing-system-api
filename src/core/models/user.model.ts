import z from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "EMPLOYEE"]),
});

export const updateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});
