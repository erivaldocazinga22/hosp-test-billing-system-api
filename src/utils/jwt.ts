import * as jwt from "jsonwebtoken";
import { env } from "../config/env.config";

const { JWT_SECRET } = env;

export const createToken = async (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: 1 * 24 * 60 * 60 * 1000 // ou '1d' que equivale a 1 days
    });
}
export const verifyToken = async (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}