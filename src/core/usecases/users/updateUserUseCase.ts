import { IUpdateUserRequest } from "@/core/entities/userEntity";
import { UpdateUserRepository } from "@/core/repositories/users/updateUserRepository";
import { User } from "@prisma/client";

export class UpdateUserUseCase {
    constructor(private readonly updateUserRepository: UpdateUserRepository) {}
        
    async execute(userId: number, requestBody: IUpdateUserRequest): Promise<User | null> {
        const user = await this.updateUserRepository.execute(userId, requestBody);
        return user;
    }
}