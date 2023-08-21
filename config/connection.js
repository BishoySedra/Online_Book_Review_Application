import mongoose from "mongoose";

const connectionURL = `mongodb+srv://Bishoy_Sedra:g3qPZnXEEMvHJP4a@cluster0.bjccfxf.mongodb.net/books`;

async function connectDB() {
    try {
        await mongoose.connect(connectionURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;