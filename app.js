import Express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";
import cors from "cors"

// models
import user from "./models/user.js";
import book from "./models/book.js";
import review from "./models/review.js";

// routes
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middleware/not-found.js";

dotenv.config();


const app = Express();
app.use(cors());
// middleware
app.use(Express.json());

// routes
const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

// error handlers
app.use(notFoundHandler)

connectDB();

try {

    const port = process.env.PORT;
    app.listen(port, console.log(`Server running on port ${port}!`));

} catch (error) {

    console.log(error);

}