import { Router } from "express";
import * as bookControllers from "../controllers/book.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/books", bookControllers.getAllBooks);

/**
 * @swagger
 * /books/byISBN:
 *   post:
 *     summary: Search books by ISBN
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ISBN]
 *             properties:
 *               ISBN:
 *                 type: string
 *                 example: 978-3-16-148410-0
 *     responses:
 *       200:
 *         description: Matching books found
 *       400:
 *         description: ISBN not provided
 *       404:
 *         description: No book found with this ISBN
 */
router.post("/books/byISBN", bookControllers.getBooksByISBN);

/**
 * @swagger
 * /books/byTitle:
 *   post:
 *     summary: Search books by title
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Clean Code
 *     responses:
 *       200:
 *         description: Matching books found
 *       400:
 *         description: Title not provided
 *       404:
 *         description: No book found with this title
 */
router.post("/books/byTitle", bookControllers.getBooksByTitle);

/**
 * @swagger
 * /books/byAuthor:
 *   post:
 *     summary: Search books by author
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [author]
 *             properties:
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *     responses:
 *       200:
 *         description: Matching books found
 *       400:
 *         description: Author not provided
 *       404:
 *         description: No book found by this author
 */
router.post("/books/byAuthor", bookControllers.getBooksByAuthor);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ISBN, title, author]
 *             properties:
 *               ISBN:
 *                 type: string
 *                 example: 978-3-16-148410-0
 *               title:
 *                 type: string
 *                 example: Clean Code
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *     responses:
 *       201:
 *         description: Book added successfully
 *       409:
 *         description: Book already exists
 */
router.post("/books", bookControllers.addBook);

export default router;