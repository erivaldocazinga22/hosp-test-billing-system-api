import { RequestHandler } from "express";
import { JWTEncryptions } from "@/core/utils/jwt";

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
        const decoded = JWTEncryptions.verifyToken(token);
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
