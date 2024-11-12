import express from "express";
import {
    createBooking,
    getUserBookings,
    getDoctorBookings,
    updateBookingStatus
} from "../controllers/bookingController.js";

const router = express.Router();

// Book an appointment
router.post("/book", createBooking);

// Get user bookings
router.get("/user/:userId", getUserBookings);

// Get doctor bookings
router.get("/doctor/:doctorId", getDoctorBookings);

// Update booking status
router.patch("/:bookingId/status", updateBookingStatus);

export default router;
