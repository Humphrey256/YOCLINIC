const express = require('express');
const userController = require('../controllers/userController');
const { checkAuth, checkRole } = require('../middleware/authMiddleware'); // Correctly import your middleware
const router = express.Router();

// Check if userController is loaded correctly
console.log('userController:', userController);

// Get all users (Admin only)
router.get('/', checkAuth, checkRole('admin'), userController.getAllUsers);

// Delete a user (Admin only)
router.delete('/:id', checkAuth, checkRole('admin'), userController.deleteUser);

module.exports = router;
