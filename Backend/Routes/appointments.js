const express = require('express');
const router = express.Router();
const { Appointment } = require('../controllers/appointmentController'); // Modify the path based on your project structure

router.post('/appointments',Appointment);// Route to book an appointment

module.exports = router;
