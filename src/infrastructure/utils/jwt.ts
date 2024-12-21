import { sign, SignOptions, verify } from "jsonwebtoken";
import { env } from "@/config/env.config";


export class JWTEncryptions {
    private static secretKey: string = env.JWT_SECRET_ACCESS;
    private static expiresIn: number = 15 * 60 * 1000; // 15 minutos em milissegundos
    
    public static generateToken(payload: object, options?: SignOptions) {
        return sign(payload, this.secretKey, {
            expiresIn: options?.expiresIn || this.expiresIn,
            algorithm: options?.algorithm || "HS512",
            ...options
        });
    }
    public static verifyToken(token: string) {
        try {
            return verify(token, this.secretKey, {
                algorithms: ["HS512"],
                maxAge: this.expiresIn,
                ignoreExpiration: false
            });
        } catch (error) {
            console.error("Error: ", error);
            throw new Error("Token inválido!");
        }
    }
}