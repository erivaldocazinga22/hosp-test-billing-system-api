import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const readUserController: RequestHandler = async (request, response) => {
    try {
        const users = await prisma.user.findMany({
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
            message: "Usuários encontrados com sucesso!",
            data: users,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}