import { v2 as cloudinary, UploadStream } from "cloudinary";
import { prisma } from "@/infrastructure/db/prisma.config";

export class AvatarUserRepository {
    async executeUpdateAvatar(userId: number): Promise<UploadStream> {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        const cloudinaryStream = cloudinary.uploader.upload_stream({
            public_id: `billing_system-${uniqueSuffix}`,
            folder: "avatars",
            resource_type: "image",
            transformation: [
                { width: 500, height: 500, crop: "fill", gravity: "auto" }
            ]
        }, async (error, result) => {
            if (error || !result) {
                console.error(error);
                throw new Error("Cloudinary upload failed");
            }

            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    avatarUrl: result.secure_url
                }
            });

            if (!user) {
                throw new Error("Usuário não encontrado!");
            }

            return result;
        });

        return cloudinaryStream;

    }
    async executeDeleteAvatar(cloudinaryId: string) {
        const avatarCloudinary = await cloudinary.uploader.destroy(cloudinaryId);

        if (avatarCloudinary.result === "not found") {
            throw new Error("Imagem não encontrada na Cloudinary");
        }

        return avatarCloudinary;
    }
}