import url from "node:url";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

function extractPublicId(imageUrl: string): string {
	const pathSegments = url.parse(imageUrl).pathname?.split("/");
	return pathSegments?.[pathSegments.length - 1]?.split(".")[0] || "";
}

const run = async () => {
  	const users = await prisma.user.findMany();
	for (const user of users) {
		const avatarURL = user.avatarUrl;
		if (avatarURL) {
			const publicId = extractPublicId(avatarURL);
			if (publicId) {
				try {
					await cloudinary.uploader.destroy(publicId);
					console.log(`Imagem ${publicId} excluída da Cloudinary`);
				} catch (error) {
					console.error(`Erro ao excluir a imagem ${publicId}:`, error);
				}
			}
		}
	 }

  	await prisma.refreshToken.deleteMany();
  	await prisma.user.deleteMany();

  	const newUsers = [
		{
			name: "Billing System",
			email: "billing.system@superadmin.com",
			password: bcrypt.hashSync("1q2w3e4r5##", 10),
			roles: "SUPER_ADMIN",
		},
		{
			name: "João Sacala",
			email: "joaosacala@gmail.com",
			password: bcrypt.hashSync("password", 10),
			roles: "ADMIN",
		},
  	];

  	await Promise.all(newUsers.map((user) => prisma.user.create({ data: user })));
  	console.log("Seed function finished successfully.");
};

run()
  	.then(async () => {
    	await prisma.$disconnect();
  	})
  	.catch(async (error) => {
    	console.error("Erro durante o seed:", error);
    	await prisma.$disconnect();
  	});
