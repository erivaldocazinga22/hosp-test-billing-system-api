import { ZodError } from "zod";
import { RequestHandler } from "express";

import { createUserSchema, queryUserSchema, updateUserSchema } from "@/core/entities/userEntity";

import { ReadUserUseCase } from "@/core/usecases/users/readUserUseCase";
import { ReadOneUserUseCase } from "@/core/usecases/users/readOneUserUseCase";
import { CreateUserUseCase } from "@/core/usecases/users/createUserUseCase";
import { UpdateUserUseCase } from "@/core/usecases/users/updateUserUseCase";
import { DeleteUserUseCase } from "@/core/usecases/users/deleteUserUseCase";
import { AvatarUserUseCase } from "@/core/usecases/users/avatarUserUseCase";

export class UserController {
    constructor(
        private readonly readUserUseCase: ReadUserUseCase,
        private readonly readOneUserUseCase: ReadOneUserUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly avatarUpdateUseCase: AvatarUserUseCase
    ) {}
    findAll: RequestHandler = async (request, response) => {
        try {
            const { success, error, data: requestQuery } = queryUserSchema.safeParse(request.query);
            if (!success) throw new ZodError(error.issues);

            const { page = 1, limit = 10 } = requestQuery;
            const data = await this.readUserUseCase.execute({
                page: Number(page),
                limit: Number(limit),
            });

            response.json({
                status: 200,
                message: "Usuários encontrados com sucesso.",
                data,
            });
        } catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json({
                    status: 400,
                    message: error.issues[0].message,
                });
                console.error("Erro de validação: ", error.issues);
            } else {
                response.status(500).json({
                    status: 500,
                    message: "Erro interno do servidor.",
                });
                console.error("Erro interno: ", error);
            }
        }
    };
    findOne: RequestHandler = async (request, response) => {
        try {
            const { id } = request.params;
            if (!id) {
                response.status(400).json({
                    status: 400,
                    message: "ID do usuário não fornecido.",
                });
                return; 
            }

            const user = await this.readOneUserUseCase.execute(Number(id));
            if (!user) {
                response.status(404).json({
                    status: 404,
                    message: "Usuário não encontrado.",
                });
                return;
            }
    
            response.json({
                status: 200,
                message: "Usuário encontrado com sucesso.",
                data: user,
            });
        } catch (error) {
            console.error("Erro interno: ", error);
            response.status(500).json({
                status: 500,
                message: "Erro interno do servidor.",
            });
        }
    };
    create: RequestHandler = async (request, response) => {
        try {
            const { success, error, data: requestBody } = createUserSchema.safeParse(request.body);
            if (!success) throw new ZodError(error.issues);
            
            const user = await this.createUserUseCase.execute({
                name: requestBody.name,
                email: requestBody.email,
                password: requestBody.password,
                role: requestBody.role,
            });

            if (!user) throw new Error("Erro ao criar usuário.");

            response.status(201).json({
                status: 201,
                message: "Usuário criado com sucesso.",
            });

        } catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json({
                    status: 400,
                    message: error.issues[0].message,
                });
            } else if (error instanceof Error) {
                response.status(400).json({
                    status: 400,
                    message: error.message,
                });
            } else {
                response.status(500).json({
                    status: 500,
                    message: "Erro interno do servidor.",
                });
            }
            console.error("Erro ao criar usuário: ", error);
        }
    };
    update: RequestHandler = async (request, response) => {
        const { id } = request.params;
        if (!id) {
            response.status(400).json({
                status: 400,
                message: "ID do usuário não fornecido.",
            });
            return;
        }

        try {
            const { success, error, data: requestBody } = updateUserSchema.safeParse(request.body);
            if (!success) throw new ZodError(error.issues);

            const user = await this.updateUserUseCase.execute(Number(id), {
                name: requestBody.name,
                email: requestBody.email
            });

            if (!user) {
                response.status(404).json({
                    status: 404,
                    message: "Usuário não encontrado.",
                });
                return;
            }

            response.json({
                status: 200,
                message: "Usuário atualizado com sucesso.",
            });

        } catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json({
                    status: 400,
                    message: error.errors,
                });
            } else {
                response.status(500).json({
                    status: 500,
                    message: "Erro interno do servidor.",
                });
            }
            console.error("Erro ao atualizar usuário: ", error);
        }

    };
    delete: RequestHandler = async (request, response) => {
        const { id } = request.params;
        if (!id) {
            response.status(400).json({
                status: 400,
                message: "ID do usuário não fornecido.",
            });
            return;
        }

        try {
            const user = await this.deleteUserUseCase.execute(Number(id));
            if (!user) {
                response.status(404).json({
                    status: 404,
                    message: "Usuário não encontrado.",
                });
                return;
            }

            response.json({
                status: 200,
                message: "Usuário deletado com sucesso.",
            });
        } catch (error) {
            console.error("Erro ao deletar usuário: ", error);
            response.status(500).json({
                status: 500,
                message: "Erro interno do servidor.",
            });
        }
    };
    avatarUpdate: RequestHandler = async (request, response) => {
        const { sub } = request.body.user;
        
        if (!sub) {
            response.status(400).json({
                status: 400,
                message: "Usuário não encontrado.",
            });
            return;
        }

        if (!request.file) {
            response.status(400).json({
                status: 400,
                message: "Nenhum arquivo enviado.",
            });
            return;
        }

        try {
            const fileUpload = await this.avatarUpdateUseCase.executeUpdateAvatar(Number(sub));

            const stream = fileUpload;
            stream.end(request.file.buffer);
            
            response.json({
                status: 200,
                message: "Avatar atualizado com sucesso.",
            });
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({
                    status: 400,
                    message: error.message,
                });
            } else {
                response.status(500).json({
                    status: 500,
                    message: "Erro interno do servidor.",
                });
            }
            console.error("Erro ao atualizar avatar: ", error);
        }

    };
}