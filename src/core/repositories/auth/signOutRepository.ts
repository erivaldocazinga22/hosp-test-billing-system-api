import { prisma } from "@/infrastructure/db/prisma.config";

export class SignOutRepository {
    async execute (userId: number) {
        return await prisma.refreshToken.delete({
            where: { userId },
        });
    }

    async isRefreshTokenExists(userId: number): Promise<boolean> {
        const refreshToken = await prisma.refreshToken.findFirst({
            where: { userId }
        });
        return refreshToken ? true : false; 
    }
}