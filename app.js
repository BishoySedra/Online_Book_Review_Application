import Express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./config/connection.js";
import { swaggerSpec } from "./config/swagger.js";
import cors from "cors";

// models
import user from "./models/user.js";
import book from "./models/book.js";
import review from "./models/review.js";

// routes
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";

// middleware
import notFoundHandler from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());

// swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

// error handlers (order matters: notFound then global error handler)
app.use(notFoundHandler);
app.use(errorHandler);

connectDB();

try {
    const port = process.env.PORT;
    app.listen(port, console.log(`Server running on port ${port}!`));
} catch (error) {
    console.log(error);
}