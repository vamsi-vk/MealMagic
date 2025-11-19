# MealMagic

MealMagic is a full-stack sample project for Indian meal planning and simple ordering. It contains a Next.js frontend (TypeScript) and a small Express-based backend API that uses in-memory data and auto-generated Swagger docs.

This repository is intended as a learning/demo project and a starting point for building a production app.

## Contents

- `FrontEnd/` — Next.js 13 (app router) TypeScript frontend, UI components, public assets and styles.
- `backend/` — Node.js + Express API with simple in-memory storage, Swagger docs, and routes for meals, categories, and plates.

## Quick start (local development)

Requirements
- Node.js 18+ and npm or pnpm

Run backend

1. Open a terminal in `backend/`
2. Install and run:

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000`. API docs are available at `/api-docs`.

Run frontend

1. Open a terminal in `FrontEnd/`
2. Install and run:

```bash
cd FrontEnd
pnpm install
pnpm dev
```

The Next.js app typically runs on `http://localhost:3000`.

Note: The frontend expects the backend API at `http://localhost:5000`. If you change ports or host, update the frontend config or CORS settings accordingly.

## Project overview

Backend
- Entry: `backend/server.js`
- Routes: `backend/routes/*` (`/api/meals`, `/api/categories`, `/api/plates`)
- Controllers: `backend/controllers/*` implement in-memory CRUD operations
- API docs: Swagger UI served from `/api-docs` and JSON at `/swagger.json`

Frontend
- Next.js app in `FrontEnd/` with components under `FrontEnd/components` and pages under `FrontEnd/app`.

## API summary

- GET /api/meals — list meals (query: `category`, `isVeg`)
- GET /api/meals/:id — meal details
- POST /api/meals — create meal
- PUT /api/meals/:id — update meal
- DELETE /api/meals/:id — delete meal

- GET /api/categories — list categories
- GET /api/categories/:id — category details
- POST /api/categories — create category
- PUT /api/categories/:id — update category
- DELETE /api/categories/:id — delete category

- GET /api/plates — list plates (query: `userId`)
- GET /api/plates/:id — plate details
- POST /api/plates — create plate
- PUT /api/plates/:id — update plate
- DELETE /api/plates/:id — delete plate

See `backend/routes/*.js` and `backend/controllers/*.js` for request/response shapes.

## Environment variables

Create a `.env` file in `backend/` for production or custom settings. Example:

```
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url_if_using_one
```

## Deployment notes

- The `backend/` folder contains a `vercel.json` and documentation for deploying to Vercel. For production, replace in-memory storage with a database and add proper configuration for environment variables, logging, and error handling.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Open a PR with a clear description

## License

MIT
# MealMagic