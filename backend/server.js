const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const mealsRouter = require('./routes/meals');
const categoriesRouter = require('./routes/categories');
const platesRouter = require('./routes/plates');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getServerUrl = (req) => {
  if (req && req.headers) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    if (host) {
      return `${protocol}://${host}`;
    }
  }
  return `http://localhost:${PORT}`;
};

// Swagger configuration
const getSwaggerOptions = (serverUrl) => ({
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
        url: serverUrl,
        description: 'API Server',
      },
    ],
    components: {
      schemas: {
        Meal: {
          type: 'object',
          required: ['name', 'category', 'price', 'calories'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier',
            },
            name: {
              type: 'string',
              description: 'Meal name',
            },
            category: {
              type: 'string',
              enum: ['breakfast', 'meals', 'snacks', 'desserts'],
              description: 'Meal category',
            },
            price: {
              type: 'number',
              description: 'Price in INR',
            },
            calories: {
              type: 'number',
              description: 'Calories per serving',
            },
            protein: {
              type: 'number',
              description: 'Protein in grams',
            },
            carbs: {
              type: 'number',
              description: 'Carbohydrates in grams',
            },
            fat: {
              type: 'number',
              description: 'Fat in grams',
            },
            description: {
              type: 'string',
              description: 'Meal description',
            },
            image: {
              type: 'string',
              description: 'Image URL',
            },
            isVeg: {
              type: 'boolean',
              description: 'Vegetarian status',
            },
          },
        },
        Category: {
          type: 'object',
          required: ['name', 'slug'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier',
            },
            name: {
              type: 'string',
              description: 'Category name',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly slug',
            },
            description: {
              type: 'string',
              description: 'Category description',
            },
            image: {
              type: 'string',
              description: 'Category image URL',
            },
          },
        },
        Plate: {
          type: 'object',
          required: ['userId', 'meals'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier',
            },
            userId: {
              type: 'string',
              description: 'User identifier',
            },
            meals: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of meal IDs',
            },
            totalCalories: {
              type: 'number',
              description: 'Total calories',
            },
            totalPrice: {
              type: 'number',
              description: 'Total price in INR',
            },
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
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
});

const serveSwagger = (req, res) => {
  const serverUrl = getServerUrl(req);
  const swaggerOptions = getSwaggerOptions(serverUrl);
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MealMagic API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css">
  <style>
    body { margin: 0; padding: 0; }
    .topbar { display: none; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        spec: ${JSON.stringify(swaggerSpec)},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
      window.ui = ui;
    };
  </script>
</body>
</html>
  `;
  res.send(html);
};

app.get('/', serveSwagger);
app.get('/api-docs', serveSwagger);

// Routes
app.use('/api/meals', mealsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/plates', platesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MealMagic API is running' });
});

app.get('/swagger.json', (req, res) => {
  const serverUrl = getServerUrl(req);
  const swaggerOptions = getSwaggerOptions(serverUrl);
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 MealMagic API server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
