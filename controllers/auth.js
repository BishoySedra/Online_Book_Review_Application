import { asyncWrapper } from "../utils/asyncWrapper.js";
import { registerUser, loginUser } from "../services/auth.js";

export const register = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const result = await registerUser(username, password);
    res.status(201).json(result);
});

export const login = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    res.json(result);
});