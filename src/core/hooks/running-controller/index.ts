import fs from "node:fs";
import path from "node:path";

const rootDir = path.join(__dirname, "../../../../");

export const runningController = async (): Promise<boolean> => {
    let isPrismaConfig = false;

    // Verificação se o prisma está conectado e rodando
    const prismaFilePath = path.join(rootDir, "prisma", "schema.prisma");
    // arquivo "schema.prisma"
    if (fs.existsSync(prismaFilePath)) {
        isPrismaConfig = true;
    }

    console.log(`${isPrismaConfig ? "✔️" : "✖️"} Conexão com o Prisma estabelecida.`);
    
    return (isPrismaConfig)??false;
};