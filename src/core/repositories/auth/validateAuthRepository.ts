import { prisma } from "@/infrastructure/db/prisma.config";
import { User } from "@prisma/client";

type ValidateAuthRepositoryReturn = {
    user: Omit<User, "password" | "updatedAt"> | null;
    refreshToken: string | null;
}

export class ValidateAuthRepository {
    async execute(userId: number): Promise<ValidateAuthRepositoryReturn> {
        const user = await prisma.user.findFirst({
            where: { id: userId },
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

        const refreshToken = await prisma.refreshToken.findFirst({
            where: { userId }
        });

        return { user, refreshToken: refreshToken?.id??null }; 
    }
}