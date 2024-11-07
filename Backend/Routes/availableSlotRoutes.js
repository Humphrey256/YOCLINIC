const express = require('express');
const availableSlotController = require('../controllers/availableSlotController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new available slot (Doctor only)
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyDoctor, availableSlotController.createAvailableSlot);

// Get available slots for a specific doctor
router.get('/:doctorId', authMiddleware.verifyToken, availableSlotController.getAvailableSlots);

// Update a slot (Doctor only)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyDoctor, availableSlotController.updateAvailableSlot);

// Delete a slot (Doctor only)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyDoctor, availableSlotController.deleteAvailableSlot);

module.exports = router;
