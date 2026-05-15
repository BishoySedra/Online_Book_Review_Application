import review from "../models/review.js";
import { ApiError } from "../utils/apiError.js";

export async function upsertReview(user_id, book_id, review_text) {
    const foundReview = await review.findOne({ where: { UserId: user_id, BookId: book_id } });

    if (foundReview) {
        await review.update({ review_text }, { where: { UserId: user_id, BookId: book_id } });
    } else {
        await review.create({ UserId: user_id, BookId: book_id, review_text });
    }

    return { message: "Review added/updated successfully!" };
}

export async function fetchReviews(book_id) {
    const bookReview = await review.findAll({
        attributes: ["review_text"],
        where: { BookId: book_id },
    });

    if (!bookReview.length) {
        throw new ApiError(404, "No review found for this book!");
    }

    return { message: "Reviews found for this book", bookReview };
}

export async function removeReview(user_id, book_id) {
    const deletedCount = await review.destroy({ where: { UserId: user_id, BookId: book_id } });

    if (!deletedCount) {
        throw new ApiError(404, "No review found for that user to delete!");
    }

    return { message: "Review deleted for that user successfully!" };
}
