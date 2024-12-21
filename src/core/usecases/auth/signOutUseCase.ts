import { SignOutRepository } from "@/core/repositories/auth/signOutRepository";

export class SignOutUseCase {
    constructor(private readonly signOutRepository: SignOutRepository) {}

    async execute(userId: number) {
        const refreshTokenExists = await this.signOutRepository.isRefreshTokenExists(userId);

        if (!refreshTokenExists) {
            throw new Error("Refresh token não encontrado. Usuário não está autenticado.");
        }

        const result = await this.signOutRepository.execute(userId);
        if (!result) {
            throw new Error("Erro ao realizar logout. Operação não concluída.");
        }

        return result;
    }
}
