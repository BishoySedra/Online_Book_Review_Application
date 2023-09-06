import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import * as reviewControllers from "../controllers/review.js";

const router = Router();

router.put("/books/:id/reviews", authenticate, reviewControllers.addReview);

export default router;