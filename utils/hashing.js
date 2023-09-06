import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export async function compare_hashed_passwords(passwordInput, storedHashedPassword) {
    try {
        return await bcrypt.compare(passwordInput, storedHashedPassword);
    } catch (error) {
        console.log(error);
    }
}
