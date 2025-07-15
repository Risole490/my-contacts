# Copilot Instructions for MyContacts API

## Project Overview
- This is a RESTful API for managing contacts and categories, built with Node.js, Express, and PostgreSQL.
- The codebase is organized by domain: controllers, repositories, middlewares, and utilities under `src/app/`.
- Database schema and setup scripts are in `src/database/`.

## Architecture & Data Flow
- Controllers (e.g., `ContactController.js`, `CategoryController.js`) handle HTTP requests and responses.
- Repositories (e.g., `ContactsRepository.js`, `CategoriesRepository.js`) encapsulate all database access logic using SQL queries.
- Middlewares (e.g., `cors.js`, `errorHandler.js`) are used for cross-cutting concerns like error handling and CORS.
- Utilities (e.g., `isValidUUID.js`) provide helper functions for validation and other common tasks.
- Routes are defined in `src/routes.js` and wired up in `src/index.js`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Run development server:** `npm run dev` (starts Express at `http://localhost:3001`)
- **Database setup:**
  - Use `src/database/schema.sql` to initialize tables.
  - Example: `psql -U <user> -d <db> -f src/database/schema.sql`
- **Environment variables:**
  - Store DB config in `.env` at project root (see README for template).
- **Linting:**
  - Run ESLint using config in `eslint.config.js`.

## Project-Specific Patterns
- All database IDs are UUIDs, validated via `isValidUUID.js`.
- Error handling is centralized in `errorHandler.js` middleware; controllers should forward errors.
- CORS is enabled for `http://localhost:3000` via `cors.js` middleware.
- Controllers do not contain SQL; all queries are in repositories.
- Use async/await for all database and controller logic.

## Integration Points
- PostgreSQL is required; ensure the `uuid-ossp` extension is enabled for UUID generation.
- No ORM is used; direct SQL queries are written in repository files.
- API endpoints are documented in the README and follow REST conventions.

## Key Files & Directories
- `src/app/controllers/` — HTTP request handling
- `src/app/repositories/` — SQL queries and DB logic
- `src/app/middlewares/` — CORS and error handling
- `src/app/utils/` — Validation helpers
- `src/database/schema.sql` — DB schema
- `src/routes.js` — Route definitions
- `src/index.js` — App entry point

## Example: Adding a New Resource
1. Create a repository for DB logic in `src/app/repositories/`.
2. Create a controller in `src/app/controllers/`.
3. Add routes in `src/routes.js`.
4. Update schema if needed in `src/database/schema.sql`.

---
If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.
