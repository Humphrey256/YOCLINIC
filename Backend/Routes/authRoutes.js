const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Register and Login routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
