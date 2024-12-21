import { RequestHandler } from "express";
import { JWTEncryptions } from "@/infrastructure/utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const ensureAuthenticated: RequestHandler = async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        response.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "O acesso requer autenticação válida. Por favor, faça login."
        });
        return;
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded: JwtPayload | string = JWTEncryptions.verifyToken(token);

        if (!decoded) {
            response.status(401).json({
                status: 401,
                error: "Unauthorized",
                message: "Sessão expirada ou inválida. Por favor, faça login novamente."
            });
            return;
        }

        request.body = {
            ...request.body,
            user: decoded
        };
        
        next();
    } catch {
        response.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Sessão expirada ou inválida. Por favor, faça login novamente."
        });
    }
};
