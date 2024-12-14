import { RequestHandler } from "express";
import { createRoleSchema } from "../../../core/models/role.model";
import { ZodError } from "zod";
import { prisma } from "../../../config/prisma.config";

export const createRoleController: RequestHandler = async (request, response) => {
    try {
        const { success, error, data: requestBody } = createRoleSchema.safeParse(request.body);
        if (!success) throw new ZodError(error.issues);
        const roleName = requestBody.name.split(" ").join("_").trim();

        const roleAlreadyExists = await prisma.role.findFirst({
            where: { name: roleName }
        });

        if (roleAlreadyExists) {
            response.json({
                status: 400,
                message: "Role já cadastrada"
            });
            return;
        }

        await prisma.role.create({ data: { name: roleName }});

        response.status(201).json({
            status: 201,
            message: "Role criada com sucesso"
        });

    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: "Alguma coisa deu errado nos campos fornecidos",
                errors: error.errors
            });
        } else if (error instanceof Error) {
            response.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }
}