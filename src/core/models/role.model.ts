import z from "zod";

export const createRoleSchema = z.object({
    name: z.string().toUpperCase().refine(role => {
        return role.split(" ").join("_");
    })
});

export const updateRoleSchema = z.object({
    name: z.string().min(3).toUpperCase().refine(role => {
        return role.split(" ").join("_");
    }),
    permissions: z.array(z.string())
})