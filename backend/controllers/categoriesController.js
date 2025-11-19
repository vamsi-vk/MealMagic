const { v4: uuidv4 } = require('uuid');

// In-memory storage
let categories = [
  {
    id: '1',
    name: 'Morning Rituals',
    slug: 'breakfast',
    description: 'Start your day with authentic Indian breakfast',
    image: '/masala-dosa-breakfast.jpg',
  },
  {
    id: '2',
    name: 'Midday Nourishment',
    slug: 'meals',
    description: 'Hearty meals for lunch and dinner',
    image: '/north-indian-thali.jpg',
  },
  {
    id: '3',
    name: 'Evening Delights',
    slug: 'snacks',
    description: 'Perfect snacks for tea time',
    image: '/pani-puri-plate.jpg',
  },
  {
    id: '4',
    name: 'Sweet Endings',
    slug: 'desserts',
    description: 'Traditional Indian desserts',
    image: '/rasmalai-bowl.jpg',
  },
];

exports.getAllCategories = (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = (req, res) => {
  try {
    const category = categories.find((c) => c.id === req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = (req, res) => {
  try {
    const { name, slug, description, image } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const newCategory = {
      id: uuidv4(),
      name,
      slug,
      description: description || '',
      image: image || '',
    };

    categories.push(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = (req, res) => {
  try {
    const index = categories.findIndex((c) => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    categories[index] = { ...categories[index], ...req.body, id: req.params.id };
    res.json(categories[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = (req, res) => {
  try {
    const index = categories.findIndex((c) => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    categories.splice(index, 1);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
