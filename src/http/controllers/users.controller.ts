import { RequestHandler } from "express";
import { prisma } from "../../config/prisma.config";

export const findAll: RequestHandler = async (request, response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });

    response.json({
        status: 200,
        message: "Usuários encontrados com sucesso!",
        data: users
    });
}