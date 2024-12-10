import { env } from "./env.config";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const run = async () => {
    console.log("Seed function Running...");
    
    await prisma.authentication.deleteMany();
    await prisma.user.deleteMany();

    const passwordHash = bcrypt.hashSync("password", 10);
    const user = await prisma.user.create({
        data: {
            name: "João Sacala",
            email: "joaosacala@example.com",
            role: "ADMIN",
            password: passwordHash
        }
    });

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: "1h" });

    const authentication = await prisma.authentication.create({
        data: {
            userId: user.id,
            token,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        }
    });

    console.log("Seed function finished successfully.");
    console.log("User created:", user);
    console.log("Authentication token:", authentication);
}

run()
    .then(async () => {
        await prisma.$disconnect();
    }).catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
    })