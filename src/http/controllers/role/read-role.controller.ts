import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";

export const readRoleController: RequestHandler = async (request, response) => {
    try {
        const roles = await prisma.role.findMany();
        response.json({
            status: 200,
            message: "Roles encontradas com sucesso!",
            data: roles
        });
    } catch (error) {
        response.status(400).json({
            status: 400,
            message: "Falha ao listar as roles"
        });
    }
}