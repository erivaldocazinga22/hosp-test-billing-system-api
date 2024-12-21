import { User } from "@prisma/client";
import { ReadOneUserRepository } from "@/core/repositories/users/readOneUserRepository";

export class ReadOneUserUseCase {
    constructor(private readonly readOneUserRepository: ReadOneUserRepository) {}
    async execute(id: number): Promise<Omit<User, "password" | "updatedAt"> | null> {
        const user = await this.readOneUserRepository.execute(id);
        return  user;
    }
}