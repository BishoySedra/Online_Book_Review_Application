import Express from "express";
import connectDB from "./config/connection.js";

const app = Express();

connectDB();

const port = 3000;
app.listen(port, console.log(`server is running on port ${port}`));