# MealMagic — Architecture

This document explains the high-level architecture, main modules, data shapes, and integration points for the MealMagic project. Use it to onboard contributors and plan next steps (database integration, auth, persistence).

## High level

- Frontend: Next.js 13 (app router) TypeScript application located in `FrontEnd/`.
- Backend: Node.js + Express REST API in `backend/` exposing CRUD operations for meals, categories and user plates. Currently uses in-memory arrays for persistence (easy to replace with a DB).
- API documentation is generated with `swagger-jsdoc` and served from the backend.

The two parts communicate over HTTP (CORS enabled on the backend). The frontend fetches JSON endpoints on `/api/*`.

## Backend modules

- `server.js` — app entry point. Configures middleware, Swagger generation, routes, and error handling. Exports the Express `app` to allow tests or external runners to import it.
- `routes/*.js` — route definitions annotated with JSDoc/Swagger comments. Each route forwards requests to controllers.
- `controllers/*.js` — business logic and data access. Right now controllers use in-memory arrays; each controller implements CRUD and simple filtering.
- `package.json` — lists dependencies: `express`, `cors`, `uuid`, `swagger-jsdoc`, `swagger-ui-express` and dev `nodemon`.

## Data shapes (summary)

- Meal
  - id: string
  - name: string
  - category: string (enum: `breakfast`, `meals`, `snacks`, `desserts`)
  - price: number
  - calories: number
  - protein, carbs, fat: number
  - description: string
  - image: string (URL or path)
  - isVeg: boolean

- Category
  - id: string
  - name: string
  - slug: string
  - description: string
  - image: string

- Plate
  - id: string
  - userId: string
  - meals: array of meal IDs (strings)
  - totalCalories: number
  - totalPrice: number
  - createdAt: ISO timestamp

## Request flows

- Create meal (POST /api/meals): frontend sends JSON -> controller validates required fields, generates UUID, appends to in-memory array, returns 201 with created object.
- Get meals (GET /api/meals): supports `category` and `isVeg` query filters.
- Plates are user-specific collections of meal IDs representing a user's selected plate.

## Where to extend / production readiness

1. Persistence: add a `models/` directory and integrate a DB (MongoDB with Mongoose, Postgres with Prisma or Sequelize). Replace in-memory arrays in controllers with model queries.
2. Authentication & Authorization: add JWT-based auth or OAuth and protect plate endpoints per-user.
3. Validation: add request validation (Joi, express-validator, or zod) to strengthen input checks.
4. Testing: add unit tests for controllers and integration tests for routes. Exported `app` in `server.js` enables supertest style tests.
5. Logging & Monitoring: add structured logging (winston/pino), request tracing, and health checks for dependencies.

## Deployment considerations

- Environment variables: `PORT`, `NODE_ENV`, and database connection strings.
- CORS: currently allows all origins. Restrict in production to frontend domain.
- Scaling: move to a proper DB and containerize or deploy on a managed platform (Vercel for frontend, Vercel/Heroku/AWS/GCP for backend).

## Diagram (text)

Frontend (Next.js) <--> Backend (Express) <--> Database (future)

API Docs: `/api-docs` (swagger UI)

