import bcrypt from "bcrypt";

class NewPassword {
    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}

export const newPassword = new NewPassword();

