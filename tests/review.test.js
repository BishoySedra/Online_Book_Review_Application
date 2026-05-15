import { describe, it, expect, beforeEach } from "bun:test";
import * as ReviewServices from "../services/review.js";
import user from "../models/user.js";
import book from "../models/book.js";
import { resetDb } from "./helpers/db.js";
import { TEST_BOOK } from "./fixtures/book.fixture.js";

let testUser;
let testBook;

beforeEach(async () => {
    await resetDb();
    testUser = await user.create({ username: "tester", password: "hashed_pw" });
    testBook = await book.create(TEST_BOOK);
});

describe("upsertReview", () => {
    it("creates a new review and returns success message", async () => {
        const result = await ReviewServices.upsertReview(testUser.id, testBook.id, "Great book!");
        expect(result).toEqual({ message: "Review added/updated successfully!" });
    });

    it("updates the review text when the user already reviewed the book", async () => {
        await ReviewServices.upsertReview(testUser.id, testBook.id, "Good book.");
        const result = await ReviewServices.upsertReview(testUser.id, testBook.id, "Actually, great book!");
        expect(result).toEqual({ message: "Review added/updated successfully!" });

        const { bookReview } = await ReviewServices.fetchReviews(testBook.id);
        expect(bookReview).toHaveLength(1);
        expect(bookReview[0].review_text).toBe("Actually, great book!");
    });

    it("throws ApiError 404 when the book does not exist", async () => {
        await expect(ReviewServices.upsertReview(testUser.id, 99999, "text")).rejects.toMatchObject({
            statusCode: 404,
            message: "No book found with this id to review!",
        });
    });
});

describe("fetchReviews", () => {
    it("returns reviews for a book", async () => {
        await ReviewServices.upsertReview(testUser.id, testBook.id, "Great book!");
        const result = await ReviewServices.fetchReviews(testBook.id);
        expect(result.message).toBe("Reviews found for this book");
        expect(result.bookReview).toHaveLength(1);
        expect(result.bookReview[0].review_text).toBe("Great book!");
    });

    it("throws ApiError 404 when no reviews exist for the book", async () => {
        await expect(ReviewServices.fetchReviews(testBook.id)).rejects.toMatchObject({
            statusCode: 404,
            message: "No review found for this book!",
        });
    });
});

// ── removeReview ──────────────────────────────────────────────────────────────

describe("removeReview", () => {
    it("deletes the review and returns success message", async () => {
        await ReviewServices.upsertReview(testUser.id, testBook.id, "Great book!");
        const result = await ReviewServices.removeReview(testUser.id, testBook.id);
        expect(result).toEqual({ message: "Review deleted for that user successfully!" });
    });

    it("review is no longer retrievable after deletion", async () => {
        await ReviewServices.upsertReview(testUser.id, testBook.id, "Great book!");
        await ReviewServices.removeReview(testUser.id, testBook.id);
        await expect(ReviewServices.fetchReviews(testBook.id)).rejects.toMatchObject({ statusCode: 404 });
    });

    it("throws ApiError 404 when the book does not exist", async () => {
        await expect(ReviewServices.removeReview(testUser.id, 99999)).rejects.toMatchObject({
            statusCode: 404,
            message: "No book found with this id to delete review!",
        });
    });

    it("throws ApiError 404 when the user has no review for the book", async () => {
        await expect(ReviewServices.removeReview(testUser.id, testBook.id)).rejects.toMatchObject({
            statusCode: 404,
            message: "No review found for that user to delete!",
        });
    });
});
