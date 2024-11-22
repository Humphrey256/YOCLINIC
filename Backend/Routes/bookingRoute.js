import express from "express";
import {
    createBooking,
    getUserBookings,
    getDoctorBookings,
    updateBookingStatus,
    confirmbooking,
    reschedulebooking,
    clearbookingHistory,
    getAllBookings, // Add this import for getting all bookings
} from "../controllers/bookingController.js";

const router = express.Router();

// Book an appointment
router.post("/", createBooking);  // Ensure this route is correctly defined

// Get all bookings for a specific user
router.get("/user/:userId", getUserBookings);

// Get all bookings for a specific doctor
router.get("/:doctorId", getDoctorBookings);  // Updated route for clarity

// Get all bookings
router.get("/", getAllBookings);  // New route to get all bookings

// Update booking status (for confirming appointment)
router.patch("/update/:bookingId", updateBookingStatus);  // Keep the route to update status

// Confirm appointment
router.patch("/confirm/:bookingId", confirmbooking);  // This route remains the same

// Reschedule appointment
router.patch("/reschedule/:bookingId", reschedulebooking);  // This route remains the same

// Clear appointment history for a specific doctor
router.delete("/clearhistory/:doctorId", clearbookingHistory);

export default router;
