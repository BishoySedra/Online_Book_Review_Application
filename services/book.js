import book from "../models/book.js";
import { ApiError } from "../utils/apiError.js";

export async function fetchAllBooks() {
    return await book.findAll();
}

export async function createBook(data) {
    const foundBook = await book.findOne({ where: data });
    if (foundBook) {
        throw new ApiError(409, "Book Already Found!!");
    }

    await book.create(data);
    return { message: "Book Added Successfully!" };
}

export async function fetchBooksByISBN(ISBN) {
    if (!ISBN) {
        throw new ApiError(400, "Please, provide a valid ISBN Code!");
    }

    const foundBooks = await book.findAll({ where: { ISBN } });
    if (!foundBooks.length) {
        throw new ApiError(404, "No book found with this ISBN Code!");
    }

    return foundBooks;
}

export async function fetchBooksByTitle(title) {
    if (!title) {
        throw new ApiError(400, "Please, provide a valid title!");
    }

    const foundBooks = await book.findAll({ where: { title } });
    if (!foundBooks.length) {
        throw new ApiError(404, "No book found with this title!");
    }

    return foundBooks;
}

export async function fetchBooksByAuthor(author) {
    if (!author) {
        throw new ApiError(400, "Please, provide a valid author name!");
    }

    const foundBooks = await book.findAll({ where: { author } });
    if (!foundBooks.length) {
        throw new ApiError(404, "No book found with this author name!");
    }

    return foundBooks;
}
