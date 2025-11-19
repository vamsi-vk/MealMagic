const express = require('express');
const router = express.Router();
const platesController = require('../controllers/platesController');

/**
 * @swagger
 * /api/plates:
 *   get:
 *     summary: Get all plates
 *     tags: [Plates]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: List of plates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plate'
 */
router.get('/', platesController.getAllPlates);

/**
 * @swagger
 * /api/plates/{id}:
 *   get:
 *     summary: Get plate by ID
 *     tags: [Plates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plate details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plate'
 *       404:
 *         description: Plate not found
 */
router.get('/:id', platesController.getPlateById);

/**
 * @swagger
 * /api/plates:
 *   post:
 *     summary: Create a new plate
 *     tags: [Plates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plate'
 *     responses:
 *       201:
 *         description: Plate created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', platesController.createPlate);

/**
 * @swagger
 * /api/plates/{id}:
 *   put:
 *     summary: Update a plate
 *     tags: [Plates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plate'
 *     responses:
 *       200:
 *         description: Plate updated successfully
 *       404:
 *         description: Plate not found
 */
router.put('/:id', platesController.updatePlate);

/**
 * @swagger
 * /api/plates/{id}:
 *   delete:
 *     summary: Delete a plate
 *     tags: [Plates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plate deleted successfully
 *       404:
 *         description: Plate not found
 */
router.delete('/:id', platesController.deletePlate);

module.exports = router;
