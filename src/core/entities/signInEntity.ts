import z from "zod";

export const signInRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(), 
});

export type ISignInRequestDTO = z.infer<typeof signInRequestSchema>;