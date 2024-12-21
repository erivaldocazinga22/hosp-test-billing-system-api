import { ICreateUser } from "@/core/entities/userEntity";
import { prisma } from "@/infrastructure/db/prisma.config";
import { User } from "@prisma/client";

export class CreateUserRepository {
    async execute({ name, email, password, role }: ICreateUser): Promise<User | null> {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                roles: role
            }
        });

        return user;
    }
}