import user from "../models/user.js";
import { hashPassword, compare_hashed_passwords } from "../utils/hashing.js";
import { createToken } from "../utils/tokens.js";
import { ApiError } from "../utils/apiError.js";

export async function registerUser(username, password) {
    const foundUser = await user.findOne({ where: { username } });
    if (foundUser) {
        throw new ApiError(409, "This user is already registered!");
    }

    const hashedPassword = await hashPassword(password);
    await user.create({ username, password: hashedPassword });

    return { message: "User registered successfully!" };
}

export async function loginUser(username, password) {
    const registeredUser = await user.findOne({ where: { username } });
    if (!registeredUser) {
        throw new ApiError(401, "Invalid Credentials!");
    }

    const is_matched = await compare_hashed_passwords(password, registeredUser.password);
    if (!is_matched) {
        throw new ApiError(401, "Invalid Credentials!");
    }

    const token = createToken(registeredUser.id, username);
    return { message: "User logged in successfully!", token };
}
