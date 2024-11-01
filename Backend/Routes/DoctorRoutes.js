const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);

module.exports = router;
