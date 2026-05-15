import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import * as reviewControllers from "../controllers/review.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book review management
 */

/**
 * @swagger
 * /books/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bookReview:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for this book
 */
router.get("/books/:id/reviews", reviewControllers.getReview);

/**
 * @swagger
 * /books/{id}/reviews:
 *   put:
 *     summary: Add or update a review for a book (requires authentication)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [review_text]
 *             properties:
 *               review_text:
 *                 type: string
 *                 example: Absolutely loved this book!
 *     responses:
 *       200:
 *         description: Review added or updated successfully
 *       401:
 *         description: Unauthorized — missing or invalid token
 */
router.put("/books/:id/reviews", authenticate, reviewControllers.addReview);

/**
 * @swagger
 * /books/{id}/reviews:
 *   delete:
 *     summary: Delete the authenticated user's review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       404:
 *         description: No review found for that user to delete
 */
router.delete("/books/:id/reviews", authenticate, reviewControllers.deleteReview);

export default router;