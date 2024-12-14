import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";
import { updateRoleSchema } from "../../../core/models/role.model";
import { ZodError } from "zod";

export const updateRoleController: RequestHandler = async (request, response) => {
    try {
        const { success, error, data: requestBody } = updateRoleSchema.safeParse(request.body);
        if (!success) throw new ZodError(error.issues);

        const { name, permissions } = requestBody;

        const PermissionsPromisses = permissions.map(permission => {
            return prisma.role.update({
                where: { id: request.params.id },
                data: { 
                    name,
                    permissions: {
                        connectOrCreate: {
                            where: { name: permission },
                            create: { name: permission }
                        }
                    }
                }
            });
        })

        const updatedRole = await Promise.all(PermissionsPromisses);

        response.json({
            status: 200,
            message: "Role actualizada com sucesso",
            data: updatedRole
        });
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: error.message,
                errors: error.errors
            })

        } else if (error instanceof Error) {
            response.status(400).json({
                status: 400,
                message: error.message
            })
            
        } else {
            response.status(400).json({
                status: 400,
                message: "Algo deu errado na actualização da role"
            })
        }
            
    }
}