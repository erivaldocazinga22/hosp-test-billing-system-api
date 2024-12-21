import { IReadUserRequest } from "@/core/entities/userEntity";
import { prisma } from "@/infrastructure/db/prisma.config";
import { User } from "@prisma/client";

export class ReadUserRepository {
    async execute({ limit, page }: IReadUserRequest): Promise<Omit<User, "password" | "updatedAt">[] | null> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                roles: true,
                password: false,
                createdAt: true,
                updatedAt: false
            },
            orderBy: {
                name: "asc"
            },
            skip: (Number(page) - 1) * limit, // offset
            take: limit // limit
        });

        if (users.length === 0) {
            return null;
        }
        
        return users;
    }

    async countUsers(): Promise<number> {
        return await prisma.user.count();
    }
}