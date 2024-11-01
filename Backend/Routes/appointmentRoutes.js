const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new appointment (Patient only)
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyPatient, appointmentController.createAppointment);

// Get all appointments (Admin or Doctor only)
router.get('/', authMiddleware.verifyToken, authMiddleware.verifyRole(['Admin', 'Doctor']), appointmentController.getAllAppointments);

// Update appointment status (Doctor only)
router.put('/:id/status', authMiddleware.verifyToken, authMiddleware.verifyDoctor, appointmentController.updateAppointmentStatus);

// Delete an appointment (Admin only)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, appointmentController.deleteAppointment);

module.exports = router;
