const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mealsRouter = require('../routes/meals');
const categoriesRouter = require('../routes/categories');
const platesRouter = require('../routes/plates');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SERVER_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:5000';

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MealMagic API',
      version: '1.0.0',
      description: 'API documentation for MealMagic - Indian meal planning and ordering platform',
      contact: {
        name: 'MealMagic Team',
        email: 'support@mealmagic.com',
      },
    },
    servers: [
      {
        url: SERVER_URL,
        description: 'API Server',
      },
    ],
    components: {
      schemas: {
        Meal: {
          type: 'object',
          required: ['name', 'category', 'price', 'calories'],
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            name: { type: 'string', description: 'Meal name' },
            category: {
              type: 'string',
              enum: ['breakfast', 'meals', 'snacks', 'desserts'],
              description: 'Meal category',
            },
            price: { type: 'number', description: 'Price in INR' },
            calories: { type: 'number', description: 'Calories per serving' },
            protein: { type: 'number', description: 'Protein in grams' },
            carbs: { type: 'number', description: 'Carbohydrates in grams' },
            fat: { type: 'number', description: 'Fat in grams' },
            description: { type: 'string', description: 'Meal description' },
            image: { type: 'string', description: 'Image URL' },
            isVeg: { type: 'boolean', description: 'Vegetarian status' },
          },
        },
        Category: {
          type: 'object',
          required: ['name', 'slug'],
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            name: { type: 'string', description: 'Category name' },
            slug: { type: 'string', description: 'URL-friendly slug' },
            description: { type: 'string', description: 'Category description' },
            image: { type: 'string', description: 'Category image URL' },
          },
        },
        Plate: {
          type: 'object',
          required: ['userId', 'meals'],
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            userId: { type: 'string', description: 'User identifier' },
            meals: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of meal IDs',
            },
            totalCalories: { type: 'number', description: 'Total calories' },
            totalPrice: { type: 'number', description: 'Total price in INR' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Error message' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './backend/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MealMagic API Documentation',
  customfavIcon: '/favicon.ico',
};

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// API Routes
app.use('/api/meals', mealsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/plates', platesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MealMagic API is running' });
});

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
