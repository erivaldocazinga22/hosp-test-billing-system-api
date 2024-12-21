import { ValidateAuthRepository } from "@/core/repositories/auth/validateAuthRepository";
import { JWTEncryptions } from "@/infrastructure/utils/jwt";

export class ValidateAuthUseCase {
    constructor(private readonly validateAuthRepository: ValidateAuthRepository) {}

    async execute(userId: number) {
        return await this.validateAuthRepository.execute(userId);
    }
    
    isTokenValid(accessToken: string): boolean {
        try {
            const decoded = JWTEncryptions.verifyToken(accessToken);
            if (!decoded || typeof decoded === "string") return false;

            const { exp } = decoded;
            if (!exp) return false; 

            const currentTime = Math.floor(Date.now() / 1000);

            return exp > currentTime;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
