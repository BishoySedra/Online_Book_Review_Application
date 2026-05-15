import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

export const sequelize = isTest
    ? new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
      })
    : new Sequelize(
          process.env.DATABASE_NAME,
          process.env.DATABASE_USERNAME,
          process.env.DATABASE_PASSWORD,
          {
              host: process.env.DATABASE_HOST,
              dialect: "mysql",
              logging: false,
          }
      );

export async function connectDB() {
    if (isTest) return;
    try {
        console.log("Connected Database!");
    } catch (error) {
        console.log("Failed connecting to database", { message: error.message });
    }
}