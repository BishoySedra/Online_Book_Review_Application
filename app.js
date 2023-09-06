import Express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";

// models
import user from "./models/user.js";
import book from "./models/book.js";
import review from "./models/review.js";

// routes
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";

dotenv.config();

const baseURL = "/api/v1";
const app = Express();

// middleware
app.use(Express.json());

// routes
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

connectDB();

const port = process.env.PORT;
app.listen(port, console.log(`Server running on port ${port}!`));