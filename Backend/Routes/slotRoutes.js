const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, slotController.createSlot);
router.get('/', authMiddleware, slotController.getAllSlots);
router.put('/:id', authMiddleware, slotController.updateSlot);
router.delete('/:id', authMiddleware, slotController.deleteSlot);
console.log('Slot routes loaded');

module.exports = router;
