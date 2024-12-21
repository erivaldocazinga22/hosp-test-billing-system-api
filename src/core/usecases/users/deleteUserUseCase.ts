import { DeleteUserRepository } from "@/core/repositories/users/deleteUserRepository";

export class DeleteUserUseCase {
    constructor(private readonly deleteUserRepository: DeleteUserRepository) {}
    async execute(id: number): Promise<boolean> {
        const user = await this.deleteUserRepository.execute(id);
        return user;
    }
}