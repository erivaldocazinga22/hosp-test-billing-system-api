import { RequestHandler } from "express";
import { verifyToken } from "../../utils/jwt";

export const authenticatedTokenMiddleware: RequestHandler = async (request, response, next) => {
    const headersAuth = request.headers['authorization'];
    if (!headersAuth) {
        response.status(401).json({
            status: 401,
            message: "Nenhum token fornecido."
        });
        throw new Error("Nenhum token fornecido.");
    }

    const token = headersAuth.split(" ")[1];
    
    if (!token) {
        response.status(401).json({ 
            status: 401, 
            message: "Nenhum token fornecido." 
        });
        throw new Error("Token inválido.");
    }
    
    try {
        const decoded = await verifyToken(token);
        if (!decoded) {
            response.status(401).json({ 
                status: 401, 
                message: "Usuário não autorizado." 
            });
        }
        
        request.body.user = decoded;
        request.body.token = token;
        next();
    } catch (error) {
        console.error(error);
        response.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}