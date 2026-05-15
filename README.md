# Online Book Review API

A RESTful back-end API for managing books and user reviews. Built as the final project for the IBM Course *"Developing Back-End Apps with Node.js and Express"*, and extended with production-ready patterns including a layered architecture, centralised error handling, interactive Swagger documentation, and a full integration test suite.

---

## Features

- **User authentication** — register & login with JWT-based auth
- **Book management** — add books and search by ISBN, title, or author
- **Review system** — authenticated users can add, update, or delete their reviews
- **Layered architecture** — controllers → services → models (clear separation of concerns)
- **Centralised error handling** — `ApiError` class + global error-handler middleware (no repetitive try/catch in controllers)
- **Async wrapper** — `asyncWrapper` utility eliminates boilerplate try/catch blocks
- **Swagger UI** — interactive API documentation at `/docs`
- **Docker Compose** — one-command MySQL setup for local development
- **Integration tests** — real-service tests against SQLite in-memory DB, one script per service
- **CI** — GitHub Actions runs each service's tests in a parallel job on every push and PR

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express 5 |
| ORM | Sequelize 6 |
| Database (production) | MySQL 8 |
| Database (testing) | SQLite in-memory |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Password hashing | bcrypt |
| API Docs | swagger-jsdoc + swagger-ui-express |
| Test runner | Bun (bun:test) |
| Dev server | nodemon |
| Containerisation | Docker Compose |

---

## Project Structure

```
├── app.js                      # Entry point — wires middleware, routes, swagger
├── docker-compose.yml          # MySQL container setup
├── .env.example                # Environment variable template
│
├── config/
│   ├── connection.js           # Sequelize instance — MySQL (prod) / SQLite (test)
│   └── swagger.js              # Swagger/OpenAPI spec configuration
│
├── models/                     # Sequelize model definitions
│   ├── user.js
│   ├── book.js
│   └── review.js
│
├── services/                   # Business logic (pure functions, throw ApiError)
│   ├── auth.js
│   ├── book.js
│   └── review.js
│
├── controllers/                # Thin HTTP layer — parse request, call service, respond
│   ├── auth.js
│   ├── book.js
│   └── review.js
│
├── routes/                     # Express routers + Swagger JSDoc annotations
│   ├── auth.js
│   ├── book.js
│   └── review.js
│
├── middleware/
│   ├── authenticate.js         # JWT verification middleware
│   ├── error-handler.js        # Global Express error handler
│   └── not-found.js            # 404 handler
│
├── utils/
│   ├── asyncWrapper.js         # Wraps async handlers — forwards errors to next()
│   ├── apiError.js             # Operational HTTP error class
│   ├── hashing.js              # bcrypt helpers
│   └── tokens.js               # JWT helpers
│
└── tests/
    ├── setup.js                # Bun preload — sets SALT_ROUNDS & TOKEN_SECRET_KEY defaults
    ├── auth.test.js            # Auth service integration tests
    ├── book.test.js            # Book service integration tests
    ├── review.test.js          # Review service integration tests
    ├── helpers/
    │   └── db.js               # resetDb() — drops & recreates all tables (SQLite)
    └── fixtures/
        └── book.fixture.js     # Shared TEST_BOOK constant
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for the MySQL container) **or** a locally running MySQL 8 instance

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project folder**:

   ```bash
   cd <project-folder>
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Then open `.env` and fill in your values (see [Environment Variables](#environment-variables) below).

5. **Start the MySQL container** (requires Docker):

   ```bash
   docker compose up -d
   ```

6. **Start the development server**:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:<PORT>/api/v1` and the Swagger UI at `http://localhost:<PORT>/docs`.

---

## Environment Variables

Copy `.env.example` to `.env` and set the following:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `DATABASE_HOST` | MySQL host | `127.0.0.1` |
| `DATABASE_NAME` | MySQL database name | `book_review_db` |
| `DATABASE_USERNAME` | MySQL user | `book_user` |
| `DATABASE_PASSWORD` | MySQL user password | `book_password` |
| `DATABASE_ROOT_PASSWORD` | MySQL root password (Docker) | `rootpassword` |
| `TOKEN_SECRET_KEY` | Secret key for signing JWTs | `your_jwt_secret` |
| `SALT_ROUNDS` | bcrypt salt rounds | `10` |

> When running the app **locally** against the Docker container, set `DATABASE_HOST=127.0.0.1`.
>
> Tests never read `.env` — `NODE_ENV=test` activates SQLite and `tests/setup.js` supplies safe fallback values for `SALT_ROUNDS` and `TOKEN_SECRET_KEY` automatically.

---

## Running with Docker

The `docker-compose.yml` file provides a ready-to-use MySQL 8 container with a named volume for data persistence.

```bash
# Start the database container in the background
docker compose up -d

# Stop the container
docker compose down

# Stop and remove all data (volume)
docker compose down -v
```

---

## Testing

Tests use [Bun's built-in test runner](https://bun.sh/docs/cli/test) and run against a **SQLite in-memory database** — no MySQL or Docker required. Each test file gets a clean database state via `resetDb()` in `beforeEach`.

### Run all tests

```bash
npm test
```

### Run tests for a single service

```bash
npm run test:auth      # Auth service only   (8 tests)
npm run test:book      # Book service only   (14 tests)
npm run test:review    # Review service only (9 tests)
```

### Watch mode (re-runs on file save)

```bash
npm run test:watch
```

### How it works

| Concern | Solution |
|---|---|
| No real DB needed | `NODE_ENV=test` switches Sequelize dialect to `sqlite :memory:` |
| Missing env vars in CI | `tests/setup.js` (preloaded by Bun) sets safe fallback values with `??=` |
| Clean state per test | `resetDb()` calls `sequelize.sync({ force: true })` in `beforeEach` |
| No mocks | Tests call real service functions against the real ORM / real SQLite DB |

---

## Continuous Integration

GitHub Actions runs the three test jobs **in parallel** on every push and pull request to any branch. Each job is independent so a failure in one service does not block the others.

```
push / pull_request
        │
        ├── test-auth    (ubuntu-latest) → npm run test:auth
        ├── test-book    (ubuntu-latest) → npm run test:book
        └── test-review  (ubuntu-latest) → npm run test:review
```

No database service container is needed in CI — SQLite in-memory is used automatically.

---

## API Documentation

Interactive Swagger UI is available at:

```
http://localhost:<PORT>/docs
```

Authenticated endpoints require a `Bearer <token>` header. Obtain the token via `POST /api/v1/auth/login`, then click **Authorize** in the Swagger UI and paste the token.

---

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | No | Register a new user |
| POST | `/api/v1/auth/login` | No | Login and receive a JWT |

### Books

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/books` | No | Get all books |
| POST | `/api/v1/books` | No | Add a new book |
| POST | `/api/v1/books/byISBN` | No | Search books by ISBN |
| POST | `/api/v1/books/byTitle` | No | Search books by title |
| POST | `/api/v1/books/byAuthor` | No | Search books by author |

### Reviews

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/books/:id/reviews` | No | Get all reviews for a book |
| PUT | `/api/v1/books/:id/reviews` | **Yes** | Add or update your review |
| DELETE | `/api/v1/books/:id/reviews` | **Yes** | Delete your review |

---

## Architecture

```
Request → Route → Controller → Service → Model → Database
                      ↓            ↓
               asyncWrapper    ApiError (thrown)
                      ↓            ↓
              errorHandler middleware (caught)
                      ↓
               JSON error response
```

- **Services** contain all business logic and throw `ApiError` for expected failures.
- **Controllers** are thin — they only parse HTTP input, call a service, and send the response.
- **`asyncWrapper`** removes the need for try/catch in every controller by forwarding errors to Express's `next()`.
- **`errorHandler`** middleware distinguishes operational `ApiError`s (returns their status code) from unexpected errors (returns 500 without leaking internals).

