import { ZodError } from "zod";
import { RequestHandler } from "express";
import { prisma } from "@/core/config/prisma.config";
import { updateUserSchema } from "@/core/models/user.model";

export const updateUserController: RequestHandler = async (request, response) => {
    try {
        const userId = +request.params.id;
        if (!userId) throw new Error("Invalida Params. ID não fornecido.");
        
        const { success, error, data: requestBody } = updateUserSchema.safeParse(request.body);
        if (!success) throw new Error(error.message);

        await prisma.user.update({
            where: { id: userId },
            data: {
                name: requestBody.name,
                email: requestBody.email,
            }
        });
        
        response.json({
            status: 200,
            message: "Usuário atualizado com sucesso."
        });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: error.message.replace("data.", ""),
                data: error.errors
            });
        } else {
            console.log("Error", error);
            response.status(500).json({
                status: 500,
                message: "Internal server error"
            });
        }
    }
};