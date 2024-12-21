import { prisma } from "@/infrastructure/db/prisma.config";

export class DeleteUserRepository {
    async execute(id: number): Promise<boolean> {
        const user = await prisma.user.delete({
            where: { id }
        });
        console.log("DELETE USER: ", user);
        return user ? true : false;
    }
}