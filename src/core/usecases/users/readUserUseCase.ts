import { IReadUserRequest } from "@/core/entities/userEntity";
import { ReadUserRepository } from "@/core/repositories/users/readUserRepository";

export class ReadUserUseCase {
    constructor(private readonly readUserRepository: ReadUserRepository) {}

    async execute({ limit, page }: IReadUserRequest) {
        const users = await this.readUserRepository.execute({ limit, page });
        
        if (!users) return null;

        const countUser = await this.readUserRepository.countUsers();
        const lastPage = Math.ceil(countUser / limit);
        
        return {
            data: users,
            pagination: {
                path: "/users",
                previusPage: Number(page) > 1 ? Number(page) - 1 : false,
                currentPage: Number(page),
                nextPage: Number(page) < lastPage ? Number(page) + 1 : lastPage,
                lastPage,
                total: countUser
            }
        };
    }
    
}