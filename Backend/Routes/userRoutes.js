const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define your routes here
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

console.log('User routes loaded');

module.exports = router;
