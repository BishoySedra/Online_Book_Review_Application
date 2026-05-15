import { describe, it, expect, beforeEach } from "bun:test";
import * as AuthServices from "../services/auth.js";
import { ApiError } from "../utils/apiError.js";
import user from "../models/user.js";
import { resetDb } from "./helpers/db.js";

// Reset DB tables before every test for a clean slate
beforeEach(async () => {
    await resetDb();
});

describe("registerUser", () => {
    it("registers a new user and returns success message", async () => {
        const result = await AuthServices.registerUser("alice", "password123");
        expect(result).toEqual({ message: "User registered successfully!" });
    });

    it("persists the user to the database", async () => {
        await AuthServices.registerUser("alice", "password123");
        const found = await user.findOne({ where: { username: "alice" } });
        expect(found).not.toBeNull();
        expect(found.username).toBe("alice");
    });

    it("stores the password as a hash, not plain text", async () => {
        await AuthServices.registerUser("alice", "password123");
        const found = await user.findOne({ where: { username: "alice" } });
        expect(found.password).not.toBe("password123");
    });

    it("throws ApiError 409 when username already exists", async () => {
        await AuthServices.registerUser("alice", "password123");
        await expect(AuthServices.registerUser("alice", "password123")).rejects.toMatchObject({
            statusCode: 409,
            message: "This user is already registered!",
        });
    });

    it("throws an ApiError instance on duplicate username", async () => {
        await AuthServices.registerUser("bob", "password123");
        try {
            await AuthServices.registerUser("bob", "password123");
            expect(true).toBe(false); // should not reach here
        } catch (err) {
            expect(err).toBeInstanceOf(ApiError);
        }
    });
});

describe("loginUser", () => {
    beforeEach(async () => {
        await AuthServices.registerUser("alice", "password123");
    });

    it("returns a JWT token on valid credentials", async () => {
        const result = await AuthServices.loginUser("alice", "password123");
        expect(result.message).toBe("User logged in successfully!");
        expect(typeof result.token).toBe("string");
        expect(result.token.length).toBeGreaterThan(0);
    });

    it("throws ApiError 401 when user does not exist", async () => {
        await expect(AuthServices.loginUser("ghost", "password123")).rejects.toMatchObject({
            statusCode: 401,
            message: "Invalid Credentials!",
        });
    });

    it("throws ApiError 401 on wrong password", async () => {
        await expect(AuthServices.loginUser("alice", "wrongpassword")).rejects.toMatchObject({
            statusCode: 401,
            message: "Invalid Credentials!",
        });
    });
});
