const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);
console.log('doctor routes loaded');

module.exports = router;
