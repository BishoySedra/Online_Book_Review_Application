import { ApiError } from "../utils/apiError.js";

/**
 * Global Express error-handling middleware.
 * - ApiError instances → return their own statusCode + message.
 * - Unexpected errors  → 500 with a generic message (no leak of internals).
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    res.status(500).json({ message: "Internal Server Error!!" });
}
