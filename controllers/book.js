import { asyncWrapper } from "../utils/asyncWrapper.js";
import * as BookServices from "../services/book.js";

export const getAllBooks = asyncWrapper(async (req, res) => {
    const books = await BookServices.fetchAllBooks();
    res.json(books);
});

export const addBook = asyncWrapper(async (req, res) => {
    const result = await BookServices.createBook(req.body);
    res.status(201).json(result);
});

export const getBooksByISBN = asyncWrapper(async (req, res) => {
    const { ISBN } = req.body;
    const foundBooks = await BookServices.fetchBooksByISBN(ISBN);
    res.json({ message: "Books are Found!!", foundBooks });
});

export const getBooksByTitle = asyncWrapper(async (req, res) => {
    const { title } = req.body;
    const foundBooks = await BookServices.fetchBooksByTitle(title);
    res.json({ message: "Books are Found!!", foundBooks });
});

export const getBooksByAuthor = asyncWrapper(async (req, res) => {
    const { author } = req.body;
    const foundBooks = await BookServices.fetchBooksByAuthor(author);
    res.json({ message: "Books are Found!!", foundBooks });
});

