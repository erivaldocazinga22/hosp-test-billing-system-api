import dayjs from "dayjs";
import { ZodError } from "zod";
import { RequestHandler, Response } from "express";

import { signInRequestSchema } from "@/core/entities/signInEntity";
import { SignInUseCase } from "@/core/usecases/auth/signInUseCase";
import { SignOutUseCase } from "@/core/usecases/auth/signOutUseCase";
import { JWTEncryptions } from "@/infrastructure/utils/jwt";
import { NewPassword } from "@/infrastructure/utils/newPassword";
import { ValidateAuthUseCase } from "@/core/usecases/auth/validateAuthUseCase";

export class AuthController {
    constructor(
        private readonly signInUseCase: SignInUseCase,
        private readonly signOutUseCase: SignOutUseCase,
        private readonly validateAuthUseCase: ValidateAuthUseCase
    ) {}

    public signIn: RequestHandler = async (request, response) => {
        try {
            const parseResult = signInRequestSchema.safeParse(request.body);

            if (!parseResult.success) {
                throw new ZodError(parseResult.error.issues);
            }

            const requestBody = parseResult.data;
            const user = await this.signInUseCase.userAlreadyExists(requestBody.email);
            if (!user) throw new Error("Nome de usuário ou senha incorretos.");

            const isPasswordValid = await new NewPassword().comparePassword(
                requestBody.password,
                user.password
            );

            if (!isPasswordValid) throw new Error("Nome de usuário ou senha incorretos.");

            const token = JWTEncryptions.generateToken(
                {},
                { subject: user.id.toString(), expiresIn: "15m" }
            );

            if (user.RefreshToken?.id) {
                response.json({
                    status: 200,
                    message: "Autenticação bem-sucedida com token de atualização.",
                    data: { token },
                });
                return;
            }

            const expiresIn = dayjs().add(7, "days").unix();
            await this.signInUseCase.refreshToken(user.id, expiresIn);

            response.json({
                status: 200,
                message: "Autenticação bem-sucedida.",
                data: { token },
            });
        } catch (error) {
            this.handleError(response, error);
        }
    };

    public signOut: RequestHandler = async (request, response) => {
        try {
            const { sub } = request.body.user;

            const result = await this.signOutUseCase.execute(Number(sub));
            if (!result) throw new Error("Erro ao fazer logout.");

            response.json({
                status: 200,
                message: "Logout realizado com sucesso.",
            });
        } catch (error) {
            this.handleError(response, error);
        }
    };

    public validate: RequestHandler = async (request, response) => {
        try {
            const { sub } = request.body.user;
            const authorizationHeader = request.headers.authorization;

            if (!authorizationHeader) {
                throw new Error("Token não fornecido.");
            }

            const [, token] = authorizationHeader.split(" ");
            const userAuthorized = await this.validateAuthUseCase.execute(Number(sub));

            if (!userAuthorized.user) throw new Error("Usuário não encontrado.");
            if (!userAuthorized.refreshToken) {
                throw new Error("Token de atualização não encontrado. Usuário não está autenticado.");
            }

            const isAccessTokenValid = this.validateAuthUseCase.isTokenValid(token);

            if (!isAccessTokenValid) {
                throw new Error("Token de acesso expirado. Reautenticação necessária.");
            }

            response.json({
                status: 200,
                message: "Usuário autenticado.",
                data: userAuthorized.user,
            });
        } catch (error) {
            this.handleError(response, error);
        }
    };

    private handleError(response: Response, error: Error | ZodError | any) {
        if (error instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: "Erro de validação.",
                errors: error.errors,
            });
        } else if (error instanceof Error) {
            response.status(401).json({
                status: 401,
                message: error.message,
            });
        } else {
            response.status(500).json({
                status: 500,
                message: "Erro interno do servidor.",
            });
        }

        console.error("Erro: ", error);
    }
}
