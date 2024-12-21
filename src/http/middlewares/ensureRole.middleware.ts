import { UserAlreadyExistsRepository } from "@/core/repositories/users/userAlreadyExistsRepository";
import { Request, Response, NextFunction } from "express";

type Roles = "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE";

export class EnsureRole {
    public static handle(allowedRoles: Roles[]): (request: Request, response: Response, next: NextFunction) => void {
        return (request: Request, response: Response, next: NextFunction) => {
            const user = request.body.user as  { iat: number, exp: number, sub: string };
            
            if (!user) {
                response.status(403).json({
                    status: 403,
                    error: "Forbidden",
                    message: "Usuário não autorizado para esta operação.",
                });
                return;
            }
            const userAlreadyExists = new UserAlreadyExistsRepository();
            userAlreadyExists.execute(+user.sub).then((user) => {
                if (!user) {
                    response.status(403).json({
                        status: 403,
                        error: "Forbidden",
                        message: "Usuário não encontrado.",
                    });
                    return;
                }

                if(!allowedRoles.includes(user.roles as Roles)) {
                    response.status(403).json({
                        status: 403,
                        error: "Forbidden",
                        userAlreadyExists,
                        message: "Você não tem permissão para realizar esta ação.",
                    });
                    return;
                }
                next();
            }).catch((error) => {
                throw new Error(error);
            });
        };
    }
}
