import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const readOneRoleController: RequestHandler = async (request, response) => {
    try {
        const role = await prisma.role.findFirst({
            where: {
                id: request.params.id
            },
            select: {
                id: true,
                name: true,
                permissions: true
            }
        });

        response.json({
            status: 200,
            message: "Role encontrada com sucesso!",
            data: role
        });
    } catch (error) {
        response.status(400).json({
            status: 400,
            message: "Falha ao listar as roles"
        });
    }
}