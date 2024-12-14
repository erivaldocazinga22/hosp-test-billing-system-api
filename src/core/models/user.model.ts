import z from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.string().refine((body) => {
        const roles = body.split(" ").map((role) => role.toUpperCase());
        return roles.join("_");
    })
});

export const updateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});
