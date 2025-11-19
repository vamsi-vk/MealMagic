const { v4: uuidv4 } = require('uuid');

// In-memory storage
let plates = [];

exports.getAllPlates = (req, res) => {
  try {
    let filteredPlates = [...plates];

    // Filter by userId
    if (req.query.userId) {
      filteredPlates = filteredPlates.filter(
        (plate) => plate.userId === req.query.userId
      );
    }

    res.json(filteredPlates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlateById = (req, res) => {
  try {
    const plate = plates.find((p) => p.id === req.params.id);
    if (!plate) {
      return res.status(404).json({ error: 'Plate not found' });
    }
    res.json(plate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPlate = (req, res) => {
  try {
    const { userId, meals, totalCalories, totalPrice } = req.body;

    if (!userId || !meals || !Array.isArray(meals)) {
      return res.status(400).json({ error: 'userId and meals array are required' });
    }

    const newPlate = {
      id: uuidv4(),
      userId,
      meals,
      totalCalories: totalCalories || 0,
      totalPrice: totalPrice || 0,
      createdAt: new Date().toISOString(),
    };

    plates.push(newPlate);
    res.status(201).json(newPlate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlate = (req, res) => {
  try {
    const index = plates.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Plate not found' });
    }

    plates[index] = { ...plates[index], ...req.body, id: req.params.id };
    res.json(plates[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlate = (req, res) => {
  try {
    const index = plates.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Plate not found' });
    }

    plates.splice(index, 1);
    res.json({ message: 'Plate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
