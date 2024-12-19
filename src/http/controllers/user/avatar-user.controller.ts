import path from "node:path";
import { RequestHandler } from "express";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/core/config/prisma.config";

export const avatarUserController: RequestHandler = async (request, response) => {
    try {
        if (!request.file) {
            response.status(400).json({ error: "No file uploaded" });
            return;
        }

        const extension = path.extname(request.file.originalname);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        console.log(extension);
        
        const fileUpload = await cloudinary.uploader.upload_stream({
            public_id: `billing_system-${uniqueSuffix}`,
            folder: "avatars",
            resource_type: "image",
            transformation: [
                { width: 500, height: 500, crop: "fill", gravity: "auto" }
            ]
        }, async (error, result) => {
            if (error) {
                console.error(error);
                return response.status(500).json({ error: "Cloudinary upload failed" });
            }

            await prisma.user.update({
                where: { id: parseInt(request.body.user.sub) },
                data: {
                    avatarUrl: result?.secure_url
                }
            });

            return response.status(200).json({
                message: "Upload successful",
                url: result?.secure_url,
            });
        });

        const stream = fileUpload;
        stream.end(request.file.buffer);
    } catch (error) {
        if (error instanceof Error) {
            response.json({
                message: "Falha ao alterar o avatar!",
                error: error.message,
            });
        } else {
            response.json({
                message: "Falha ao alterar o avatar!",
                error: error,
            });
        }
    }
};