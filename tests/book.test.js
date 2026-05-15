import { describe, it, expect, beforeEach } from "bun:test";
import * as BookServices from "../services/book.js";
import { resetDb } from "./helpers/db.js";
import { TEST_BOOK } from "./fixtures/book.fixture.js";

beforeEach(async () => {
    await resetDb();
});

describe("fetchAllBooks", () => {
    it("returns an empty array when no books exist", async () => {
        const result = await BookServices.fetchAllBooks();
        expect(result).toEqual([]);
    });

    it("returns all persisted books", async () => {
        await BookServices.createBook(TEST_BOOK);
        const result = await BookServices.fetchAllBooks();
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe(TEST_BOOK.title);
    });
});

describe("createBook", () => {
    it("adds a book and returns success message", async () => {
        const result = await BookServices.createBook(TEST_BOOK);
        expect(result).toEqual({ message: "Book Added Successfully!" });
    });

    it("persists the book to the database", async () => {
        await BookServices.createBook(TEST_BOOK);
        const all = await BookServices.fetchAllBooks();
        expect(all).toHaveLength(1);
        expect(all[0].ISBN).toBe(TEST_BOOK.ISBN);
    });

    it("throws ApiError 409 when the same book is added twice", async () => {
        await BookServices.createBook(TEST_BOOK);
        await expect(BookServices.createBook(TEST_BOOK)).rejects.toMatchObject({
            statusCode: 409,
            message: "Book Already Found!!",
        });
    });
});

describe("fetchBooksByISBN", () => {
    it("throws ApiError 400 when ISBN is not provided", async () => {
        await expect(BookServices.fetchBooksByISBN(undefined)).rejects.toMatchObject({ statusCode: 400 });
    });

    it("throws ApiError 404 when no book matches the ISBN", async () => {
        await expect(BookServices.fetchBooksByISBN("000-0")).rejects.toMatchObject({ statusCode: 404 });
    });

    it("returns books matching the ISBN", async () => {
        await BookServices.createBook(TEST_BOOK);
        const result = await BookServices.fetchBooksByISBN(TEST_BOOK.ISBN);
        expect(result).toHaveLength(1);
        expect(result[0].ISBN).toBe(TEST_BOOK.ISBN);
    });
});

// ── fetchBooksByTitle ─────────────────────────────────────────────────────────

describe("fetchBooksByTitle", () => {
    it("throws ApiError 400 when title is not provided", async () => {
        await expect(BookServices.fetchBooksByTitle(undefined)).rejects.toMatchObject({ statusCode: 400 });
    });

    it("throws ApiError 404 when no book matches the title", async () => {
        await expect(BookServices.fetchBooksByTitle("Unknown Title")).rejects.toMatchObject({ statusCode: 404 });
    });

    it("returns books matching the title", async () => {
        await BookServices.createBook(TEST_BOOK);
        const result = await BookServices.fetchBooksByTitle(TEST_BOOK.title);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe(TEST_BOOK.title);
    });
});

// ── fetchBooksByAuthor ────────────────────────────────────────────────────────

describe("fetchBooksByAuthor", () => {
    it("throws ApiError 400 when author is not provided", async () => {
        await expect(BookServices.fetchBooksByAuthor(undefined)).rejects.toMatchObject({ statusCode: 400 });
    });

    it("throws ApiError 404 when no book matches the author", async () => {
        await expect(BookServices.fetchBooksByAuthor("Unknown Author")).rejects.toMatchObject({ statusCode: 404 });
    });

    it("returns books matching the author", async () => {
        await BookServices.createBook(TEST_BOOK);
        const result = await BookServices.fetchBooksByAuthor(TEST_BOOK.author);
        expect(result).toHaveLength(1);
        expect(result[0].author).toBe(TEST_BOOK.author);
    });
});
