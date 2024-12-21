import { ICreateUser } from "@/core/models/user.model";
import { CreateUserRepository } from "@/core/repositories/users/createUserRepository";
import { UserAlreadyExistsRepository } from "@/core/repositories/users/userAlreadyExistsRepository";
import { NewPassword } from "@/infrastructure/utils/newPassword";

export class CreateUserUseCase {
    constructor(
        private readonly newPassword: NewPassword,
        private readonly createUserRepository: CreateUserRepository, 
        private readonly userAlreadyExists: UserAlreadyExistsRepository
    ) {}
    async execute({ name, email, password, role }: ICreateUser): Promise<any> {
        const userAlreadyExists = await this.userAlreadyExists.execute(-1, email);
        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }
        const hashPassword = await this.newPassword.hashPassword(password);
        const user = await this.createUserRepository.execute({ 
            name, 
            email, 
            password: hashPassword,
            role
        });
        return user;
    }
}