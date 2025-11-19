const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let meals = [
  {
    id: '1',
    name: 'Masala Dosa',
    category: 'breakfast',
    price: 120,
    calories: 350,
    protein: 8,
    carbs: 55,
    fat: 12,
    description: 'Crispy rice crepe filled with spiced potato masala',
    image: '/masala-dosa-breakfast.jpg',
    isVeg: true,
  },
  {
    id: '2',
    name: 'Butter Chicken',
    category: 'meals',
    price: 280,
    calories: 520,
    protein: 35,
    carbs: 25,
    fat: 32,
    description: 'Tender chicken in rich tomato-butter gravy',
    image: '/butter-chicken-naan.jpg',
    isVeg: false,
  },
  {
    id: '3',
    name: 'Pani Puri',
    category: 'snacks',
    price: 60,
    calories: 180,
    protein: 4,
    carbs: 32,
    fat: 5,
    description: 'Crispy puris filled with tangy tamarind water',
    image: '/pani-puri-plate.jpg',
    isVeg: true,
  },
  {
    id: '4',
    name: 'Rasmalai',
    category: 'desserts',
    price: 150,
    calories: 280,
    protein: 6,
    carbs: 42,
    fat: 10,
    description: 'Soft cottage cheese dumplings in sweet milk',
    image: '/rasmalai-bowl.jpg',
    isVeg: true,
  },
];

exports.getAllMeals = (req, res) => {
  try {
    let filteredMeals = [...meals];

    // Filter by category
    if (req.query.category) {
      filteredMeals = filteredMeals.filter(
        (meal) => meal.category === req.query.category
      );
    }

    // Filter by vegetarian status
    if (req.query.isVeg !== undefined) {
      const isVeg = req.query.isVeg === 'true';
      filteredMeals = filteredMeals.filter((meal) => meal.isVeg === isVeg);
    }

    res.json(filteredMeals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMealById = (req, res) => {
  try {
    const meal = meals.find((m) => m.id === req.params.id);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMeal = (req, res) => {
  try {
    const { name, category, price, calories, protein, carbs, fat, description, image, isVeg } = req.body;

    if (!name || !category || !price || !calories) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMeal = {
      id: uuidv4(),
      name,
      category,
      price,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      description: description || '',
      image: image || '',
      isVeg: isVeg !== undefined ? isVeg : true,
    };

    meals.push(newMeal);
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMeal = (req, res) => {
  try {
    const index = meals.findIndex((m) => m.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    meals[index] = { ...meals[index], ...req.body, id: req.params.id };
    res.json(meals[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMeal = (req, res) => {
  try {
    const index = meals.findIndex((m) => m.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    meals.splice(index, 1);
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
