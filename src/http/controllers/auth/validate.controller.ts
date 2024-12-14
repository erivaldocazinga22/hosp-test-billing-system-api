import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const validateController: RequestHandler = async (request, response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(request.body.user.sub)
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            }
        });
        response.json({
            status: 200,
            message: "Usuário validado com sucesso!",
            data: user
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            status: 500,
            message: "Internal server error",
            data: request.body
        });
    }
}