import { User } from "@prisma/client";
import { prisma } from "@/infrastructure/db/prisma.config";

export class ReadOneUserRepository {
    async execute(id: number): Promise<Omit<User, "password" | "updatedAt"> | null> {
        const user = await prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                roles: true,
                password: false,
                createdAt: true,
                updatedAt: false
            }
        });
        return user;
    }
}