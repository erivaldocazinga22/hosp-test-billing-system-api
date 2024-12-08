import z from "zod";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { prisma } from "../../../config/prisma.config";
import { createToken } from "../../../utils/jwt";

export const loginController: RequestHandler = async (request, response) => {
    const generateLoginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });
    try {
        const { email, password } = generateLoginSchema.parse(request.body);
        const user = await prisma.user.findFirst({
             where: { email },
        });

        if (!user) {
            response.status(404).json({
                status: 404,
                message: "User not found"
            })
            throw new Error("User not exist");
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            response.status(401).json({
                status: 401,
                message: "Incorrect credentials"
            })
            throw new Error("Incorrect credentials");
        }
        
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        const token = await createToken({ userId: user.id, expiresAt });

        const login = await prisma.authentication.create({
            data: { token, userId: user.id, expiresAt }
        });

        response.json({
            status: 200,
            message: "Authentication successful",
            data: { token: login.token }
        }); 
    } catch (error) {
        console.error(error);
        response.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}
