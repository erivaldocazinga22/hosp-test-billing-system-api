import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";
import { createUserSchema } from "../../../core/models/user.model";
import { ZodError } from "zod";

export const createUserController: RequestHandler = async (request, response) => {
    try {
        const { success, error, data: requestBody } = createUserSchema.safeParse(request.body);
        if (!success) throw new Error(error.message);
        
        const hashedPassword = await bcrypt.hash(requestBody.password, 10);
        
        const user = await prisma.user.create({
            data: {
                name: requestBody.name,
                email: requestBody.email,
                password: hashedPassword,
                role: requestBody.role,
            },
        });

        response.status(201).json({
            status: 201,
            message: "User created successfully"
        });

    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: error.message,
                errors: error.errors
            });
        } else {
            console.log(error);
            response.status(500).json({
                status: 500,
                message: "Internal server error"
            });
        }
    }
}