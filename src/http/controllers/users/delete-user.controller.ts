import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const deleteUserController: RequestHandler = async (request, response) => {
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(request.params.id)
            }
        });
        response.json({
            status: 200,
            message: "Usuário deletado com sucesso!"
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}