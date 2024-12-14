import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const readOneUserController: RequestHandler = async (request, response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(request.params.id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                roles: true,
                password: false,
                createdAt: true,
                updatedAt: true
            }
        });
        response.json({
            status: 200,
            message: "Usuário encontrado com sucesso!",
            data: user,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}