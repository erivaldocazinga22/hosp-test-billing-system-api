import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const deleteUserController: RequestHandler = async (request, response) => {
    await prisma.user.delete({
        where: {
            id: parseInt(request.params.id)
        }
    });
    response.json({
        status: 200,
        message: "Usuário deletado com sucesso!"
    });
}