import { prisma } from "@/infrastructure/db/prisma.config";
import { User } from "@prisma/client";

export class UserAlreadyExistsRepository {
    async execute(id: number, email?: string): Promise<User | null> {
        const where = email ? { email } : { id };
        const user = await prisma.user.findFirst({
            where,
        });
        return user;
    }
}