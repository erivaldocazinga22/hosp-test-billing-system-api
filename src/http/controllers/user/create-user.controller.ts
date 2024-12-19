import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { RequestHandler } from "express";
import { prisma } from "@/core/config/prisma.config";
import { createUserSchema } from "@/core/models/user.model";

export const createUserController: RequestHandler = async (request, response) => {
    try {
        const { success, error, data: requestBody } = createUserSchema.safeParse(request.body);
        if (!success) throw new ZodError(error.issues);

        const userAlreadyExists = await prisma.user.findFirst({
            where: { email: requestBody.email },
        });
        
        if (userAlreadyExists) {
            response.status(409).json({
                status: 409,
                message: "User already exists"
            });
            return;
        }
        
        const hashedPassword = await bcrypt.hash(requestBody.password, 10);

        await prisma.user.create({
            data: {
                name: requestBody.name,
                email: requestBody.email,
                password: hashedPassword,
                roles: requestBody.role
            }
        });

        response.status(201).json({
            status: 201,
            message: "User created successfully"
        });

    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: "Alguma coisa deu errado nos campos fornecidos",
                errors: error.errors
            });
        } else {
            response.status(500).json({
                status: 500,
                message: "Internal server error"
            });
        }
    }
}