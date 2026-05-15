import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    });

export async function connectDB() {
    try {
        // const connectedDataBase = await sequelize.sync();
        console.log("Connected Database!");
    } catch (error) {
        console.log("Failed connecting to database", { message: error.message });
    }
}