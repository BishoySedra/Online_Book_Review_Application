import { Router } from "express";
import * as authControllers from "../controllers/auth.js";

const router = Router();

router.post("/auth/register", authControllers.register);
router.post("/auth/login", authControllers.login);

export default router;