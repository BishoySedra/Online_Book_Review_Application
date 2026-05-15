/**
 * Wraps an async Express route handler and forwards any thrown error to next(),
 * eliminating the need for repetitive try/catch blocks in every controller.
 *
 * @param {Function} fn - Async (req, res, next) handler
 * @returns {Function} Express middleware
 */
export const asyncWrapper = (fn) => (req, res, next) =>
    fn(req, res, next).catch(next);
