import express from 'express';

import {
    createBooking,
    getDoctorBookings,
    confirmBooking,
    cancelBooking,
    updateBooking,
    getUserBookings,
    rescheduleBooking,
    clearBookingHistory,
    getAllBookings,
    updateBookingStatus
} from '../controllers/bookingController.js';

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings for a specific doctor
router.get('/doctor/:doctorId', getDoctorBookings);

// Get all bookings for a specific user
router.get('/user/:userId', getUserBookings);

// Get all bookings in the system
router.get('/', getAllBookings);

// Confirm appointment
router.patch('/confirm/:bookingId', confirmBooking);

// Cancel appointment
router.patch('/cancel/:bookingId', cancelBooking);

// Update booking details
router.put('/edit/:bookingId', updateBooking);

// Update booking status
router.patch('/update/:bookingId', updateBookingStatus);

// Reschedule appointment
router.patch('/reschedule/:bookingId', rescheduleBooking);

// Clear appointment history for a specific doctor
router.delete('/clearhistory/:doctorId', clearBookingHistory);

export default router;
