import review from "../models/review.js";

export async function addReview(req, res) {
    try {
        // data to be stored
        const { user_id } = req.user;
        const book_id = req.params.id;
        const { review_text } = req.body;
        // console.log(user_id, book_id, review_text);

        // check if the review is found or not to decide to create a new one or update the existing one
        const foundReview = await review.findOne({ where: { UserId: user_id, BookId: book_id } })

        if (foundReview) {
            const newReview = await review.update({ review_text }, { where: { UserId: user_id, BookId: book_id } });
            return res.json({ message: `Review added/updated successfully!` });
        }

        // execute adding review operation
        const newReview = await review.create({ UserId: user_id, BookId: book_id, review_text });
        res.json({ message: `Review added/updated successfully!` });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error!!" });

    }
}