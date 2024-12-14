import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const deleteRoleController: RequestHandler = async (request, response) => {
    try {
        await prisma.role.delete({
            where: { id: request.params.id }
        });

        response.json({
            status: 200,
            message: "Role deletada com sucesso"
        });
    } catch (error) {
        response.json({
            status: 400,
            message: "Erro ao deletar a role"
        });
    }
}