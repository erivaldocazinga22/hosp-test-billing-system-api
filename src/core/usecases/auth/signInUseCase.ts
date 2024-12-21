import { SignInRepository } from "@/core/repositories/auth/signInRepository";

export class SignInUseCase {
    constructor(private readonly signInRepository: SignInRepository) {}

    async userAlreadyExists (email: string) {
        return await this.signInRepository.userAlreadyExists(email);
    }

    async refreshToken (userId: number, expiresIn: number) {
        return await this.signInRepository.refreshToken(userId, expiresIn);
    }
}