const express = require('express');
const router = express.Router();
const { checkAuth, checkRole } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardsController');
// Debugging: Log imported modules
console.log('Loaded dashboardController:', dashboardController);


// Patient routes
router.get('/patient/slots', checkAuth, checkRole('patient'), dashboardController.viewAvailableSlots); // <-- Callback function
router.get('/patient/appointments', checkAuth, checkRole('patient'), dashboardController.viewAppointments); // <-- Callback function
router.post('/patient/book', checkAuth, checkRole('patient'), dashboardController.bookAppointment); // <-- Callback function
router.get('/patient/notifications', checkAuth, checkRole('patient'), dashboardController.viewNotifications); // <-- Callback function

// Doctor routes
router.post('/doctor/slots', checkAuth, checkRole('doctor'), dashboardController.addAvailableSlots); // <-- Callback function
router.get('/doctor/appointments', checkAuth, checkRole('doctor'), dashboardController.viewRequestedAppointments); // <-- Callback function
router.put('/doctor/appointments/:id', checkAuth, checkRole('doctor'), dashboardController.updateAppointmentStatus); // <-- Callback function

// Admin routes
router.get('/admin/users', checkAuth, checkRole('admin'), dashboardController.viewUsers); // <-- Callback function
router.post('/admin/users', checkAuth, checkRole('admin'), dashboardController.addUser); // <-- Callback function
router.put('/admin/users/:id', checkAuth, checkRole('admin'), dashboardController.updateUser); // <-- Callback function
router.delete('/admin/users/:id', checkAuth, checkRole('admin'), dashboardController.deleteUser); // <-- Callback function
router.get('/admin/appointments', checkAuth, checkRole('admin'), dashboardController.viewAllAppointments); // <-- Callback function

module.exports = router;
