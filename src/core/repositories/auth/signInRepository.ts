import { prisma } from "@/infrastructure/db/prisma.config";

export class SignInRepository {
    async userAlreadyExists(email: string) {
        return await prisma.user.findFirst({
            where: { email },
            include: {
                RefreshToken: true
            }
        });
    }
    async refreshToken(userId: number, expiresIn: number) {
        return await prisma.refreshToken.create({
            data: {
                userId,
                expiresIn,
            }
        });
    }
}