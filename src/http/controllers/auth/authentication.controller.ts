import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { RequestHandler } from "express";
import { JWTEncryptions } from "@/core/utils/jwt";
import { prisma } from "@/core/config/prisma.config";
import { generateLoginSchema } from "@/core/models/auth.model";

export const authenticationController: RequestHandler = async (request, response) => {
    try {
        const { success, error, data: requestBody } = generateLoginSchema.safeParse(request.body);

        if (!success) throw new ZodError(error.issues);
    
        const userAlreadyExists = await prisma.user.findFirst({
             where: { email: requestBody.email },
        });

        if (!userAlreadyExists) throw new Error("Usuário ou senha incorretos");
        
        const isPasswordValid = bcrypt.compare(requestBody.password, userAlreadyExists.password);

        if (!isPasswordValid) throw new Error("Usuário ou senha incorretos");

        const token = JWTEncryptions.generateToken({}, {
            subject: String(userAlreadyExists.id),
            expiresIn: "15m"
        });
        
        const refreshTokenExists = await prisma.refreshToken.findFirst({
            where: {
                userId: userAlreadyExists.id,
                expiresIn: { gte: dayjs().unix() }
            }
        });
        
        if (refreshTokenExists) {
            response.json({
                status: 200,
                message: "Authentication successful with refresh token",
                data: { token }
            });
            return;
        }

        await prisma.refreshToken.create({
            data: {
                userId: userAlreadyExists.id,
                expiresIn: dayjs().add(7, "days").unix(), // 7 dias de expiração
            }
        });

        response.json({
            status: 200,
            message: "Authentication successful",
            data: { token }
        }); 
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(401).json({
                status: 401,
                message: error.message.trim()
            });
        } else if (error instanceof Error) {
            response.status(401).json({
                status: 401,
                message: error.message
            });
        }
    }
}
