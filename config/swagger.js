import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Online Book Review API",
            version: "1.0.0",
            description:
                "RESTful API for managing books and user reviews. Built with Node.js, Express, Sequelize, and MySQL.",
            contact: {
                name: "GitHub Repository",
            },
        },
        servers: [
            {
                url: "/api/v1",
                description: "API v1",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter the JWT token obtained from the /auth/login endpoint.",
                },
            },
            schemas: {
                Book: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        ISBN: { type: "string", example: "978-3-16-148410-0" },
                        title: { type: "string", example: "Clean Code" },
                        author: { type: "string", example: "Robert C. Martin" },
                    },
                },
                Review: {
                    type: "object",
                    properties: {
                        review_text: {
                            type: "string",
                            example: "An excellent read for every developer!",
                        },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Error description" },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
