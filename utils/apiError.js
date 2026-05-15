/**
 * Operational (expected) HTTP error.
 * Throw this from services to produce a specific HTTP status + message.
 */
export class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code (e.g. 400, 401, 404, 409)
     * @param {string} message    - Human-readable error message
     */
    constructor(statusCode, message) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
    }
}
