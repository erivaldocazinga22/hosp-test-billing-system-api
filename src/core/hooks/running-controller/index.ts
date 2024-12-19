import fs from "node:fs";
import path from "node:path";

const rootDir = path.join(__dirname, "../../../../");

export const runningController = async (): Promise<boolean> => {
    let isEnvaromentFile = false;
    let isPrismaConfig = false;

    // Verificação se existe o arquivo .env
    const envFilePath = path.join(rootDir, ".env");
    if (fs.existsSync(envFilePath)) {
        isEnvaromentFile = true;
        // Verificação se o prisma está conectado e rodando
        const prismaFilePath = path.join(rootDir, "prisma", "schema.prisma");
        // arquivo "schema.prisma"
        if (fs.existsSync(prismaFilePath)) {
            isPrismaConfig = true;
        }
    }

    console.log(`${isEnvaromentFile ? "✔️" : "✖️"} Arquivo .env foi encontrado com sucesso.`);
    console.log(`${isPrismaConfig ? "✔️" : "✖️"} Conexão com o Prisma estabelecida.`);
    
    return (isEnvaromentFile && isPrismaConfig)??false;
};