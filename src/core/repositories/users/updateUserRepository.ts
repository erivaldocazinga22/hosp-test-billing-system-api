import { IUpdateUserRequest } from "@/core/entities/userEntity";
import { prisma } from "@/infrastructure/db/prisma.config";
import { User } from "@prisma/client";

export class UpdateUserRepository {
    async execute(userId: number, requestBody: IUpdateUserRequest): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                name: requestBody.name,
                email: requestBody.email
            }
        });

        return user;
    }
}