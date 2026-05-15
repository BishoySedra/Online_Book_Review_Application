import { asyncWrapper } from "../utils/asyncWrapper.js";
import * as ReviewServices from "../services/review.js";

export const addReview = asyncWrapper(async (req, res) => {
    const { user_id } = req.user;
    const book_id = req.params.id;
    const { review_text } = req.body;
    const result = await ReviewServices.upsertReview(user_id, book_id, review_text);
    res.json(result);
});

export const getReview = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewServices.fetchReviews(id);
    res.json(result);
});

export const deleteReview = asyncWrapper(async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    const result = await ReviewServices.removeReview(user_id, id);
    res.json(result);
});