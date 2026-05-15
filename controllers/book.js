import { asyncWrapper } from "../utils/asyncWrapper.js";
import {
    fetchAllBooks,
    createBook,
    fetchBooksByISBN,
    fetchBooksByTitle,
    fetchBooksByAuthor,
} from "../services/book.js";

export const getAllBooks = asyncWrapper(async (req, res) => {
    const books = await fetchAllBooks();
    res.json(books);
});

export const addBook = asyncWrapper(async (req, res) => {
    const result = await createBook(req.body);
    res.status(201).json(result);
});

export const getBooksByISBN = asyncWrapper(async (req, res) => {
    const { ISBN } = req.body;
    const foundBooks = await fetchBooksByISBN(ISBN);
    res.json({ message: "Books are Found!!", foundBooks });
});

export const getBooksByTitle = asyncWrapper(async (req, res) => {
    const { title } = req.body;
    const foundBooks = await fetchBooksByTitle(title);
    res.json({ message: "Books are Found!!", foundBooks });
});

export const getBooksByAuthor = asyncWrapper(async (req, res) => {
    const { author } = req.body;
    const foundBooks = await fetchBooksByAuthor(author);
    res.json({ message: "Books are Found!!", foundBooks });
});

