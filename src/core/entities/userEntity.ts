import z from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "EMPLOYEE"])
});


export const updateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});


// Read User
export const queryUserSchema = z.object({
    page: z.string().optional(),
    limit: z.string().optional()
});

export type IUpdateUserRequest = z.infer<typeof updateUserSchema>;
export type ICreateUser = z.infer<typeof createUserSchema>;
export type IQueryUser = z.infer<typeof queryUserSchema>;
export type IReadUserRequest = {
    limit: number;
    page: number;
}
