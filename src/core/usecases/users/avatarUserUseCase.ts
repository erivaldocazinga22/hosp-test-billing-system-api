import { AvatarUserRepository } from "@/core/repositories/users/avatarUserRepository";
import { UploadStream } from "cloudinary";

export class AvatarUserUseCase {
    constructor(private readonly avatarUserRepository: AvatarUserRepository) {}

    async executeUpdateAvatar(userId: number) {
        return await this.avatarUserRepository.executeUpdateAvatar(userId);
    }

    async executeDeleteAvatar(cloudinaryId: string): Promise<UploadStream> {
        return await this.avatarUserRepository.executeDeleteAvatar(cloudinaryId);
    }
}