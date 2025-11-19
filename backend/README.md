# MealMagic Backend API

Backend API for MealMagic - Indian meal planning and ordering platform built with Node.js, Express, and Swagger.

## Features

- RESTful API with CRUD operations
- Swagger/OpenAPI documentation
- In-memory data storage (easily replaceable with database)
- CORS enabled for frontend integration
- Organized MVC architecture

## Installation

\`\`\`bash
cd backend
npm install
\`\`\`

## Running the Server

Development mode with auto-reload:
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm start
\`\`\`

The server will start on `http://localhost:5000`

## API Documentation

Once the server is running, access the interactive Swagger documentation at:
\`\`\`
http://localhost:5000/api-docs
\`\`\`

## API Endpoints

### Meals
- `GET /api/meals` - Get all meals (supports filtering by category and isVeg)
- `GET /api/meals/:id` - Get meal by ID
- `POST /api/meals` - Create new meal
- `PUT /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Plates
- `GET /api/plates` - Get all plates (supports filtering by userId)
- `GET /api/plates/:id` - Get plate by ID
- `POST /api/plates` - Create new plate
- `PUT /api/plates/:id` - Update plate
- `DELETE /api/plates/:id` - Delete plate

## Example Requests

### Create a Meal
\`\`\`bash
curl -X POST http://localhost:5000/api/meals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Paneer Tikka",
    "category": "snacks",
    "price": 180,
    "calories": 320,
    "protein": 18,
    "carbs": 12,
    "fat": 22,
    "description": "Grilled cottage cheese with spices",
    "isVeg": true
  }'
\`\`\`

### Get Meals by Category
\`\`\`bash
curl http://localhost:5000/api/meals?category=breakfast
\`\`\`

### Create a Plate
\`\`\`bash
curl -X POST http://localhost:5000/api/plates \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "meals": ["1", "2", "3"],
    "totalCalories": 1050,
    "totalPrice": 460
  }'
\`\`\`

## Project Structure

\`\`\`
backend/
├── server.js              # Main application entry point
├── routes/                # API route definitions
│   ├── meals.js
│   ├── categories.js
│   └── plates.js
├── controllers/           # Business logic
│   ├── mealsController.js
│   ├── categoriesController.js
│   └── platesController.js
├── package.json
└── README.md
\`\`\`

## Database Integration

Currently using in-memory storage. To integrate a database:

1. Install database driver (e.g., `mongoose` for MongoDB, `pg` for PostgreSQL)
2. Create models in a `models/` directory
3. Update controllers to use database queries instead of in-memory arrays
4. Add database connection configuration

## Environment Variables

Create a `.env` file for configuration:

\`\`\`
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url
\`\`\`

## CORS Configuration

CORS is enabled for all origins by default. For production, update the CORS configuration in `server.js`:

\`\`\`javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
