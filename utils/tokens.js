import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function decodeToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
}


export function createToken(user_id, username) {
    return jwt.sign({ user_id, username }, process.env.TOKEN_SECRET_KEY);
}