import bcrypt from "bcrypt";

export class NewPassword {
    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
