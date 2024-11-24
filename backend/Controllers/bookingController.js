import mongoose from "mongoose";
import Booking from "../models/BookingSchema.js";  // Ensure the collection name matches your MongoDB schema
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import { sendNotification } from "../utils/notificationService.js"; // Assuming a notification service

// Controller to handle booking requests
export const createBooking = async (req, res) => {
    console.log("Booking controller reached");

    try {
        const { doctorId, userId, bookingDate, time, reason, patientName, phoneNumber } = req.body;

        console.log("Booking request received:", req.body);

        if (!doctorId || !userId || !bookingDate || !time || !reason || !patientName || !phoneNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid user ID or doctor ID" });
        }

        const doctor = await Doctor.findById(doctorId);
        const user = await User.findById(userId);

        if (!doctor || !user) {
            return res.status(404).json({ message: "Doctor or User not found" });
        }

        const newBooking = new Booking({
            doctor: doctorId,
            user: userId,
            bookingDate,
            time,
            reason,
            patientName,
            phoneNumber,
            status: 'pending' // Default status
        });

        const savedBooking = await newBooking.save();

        if (!savedBooking) {
            return res.status(500).json({ message: "Failed to save booking" });
        }

        console.log("Booking saved:", savedBooking);

        // Send notification to the doctor
        sendNotification(
            doctor.email,
            `New booking request from ${patientName}. Scheduled for ${new Date(bookingDate).toLocaleString()} at ${time}.`
        );

        // Send notification to the user (patient)
        sendNotification(
            user.email,
            `Your booking request with Dr. ${doctor.name} is pending confirmation. Scheduled for ${new Date(bookingDate).toLocaleString()} at ${time}.`
        );

        res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
    } catch (error) {
        console.error("Error during booking creation:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Confirm the booking
export const confirmbooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId).populate("doctor");
        if (!booking) return res.status(404).json({ message: "booking not found" });

        // Confirm the booking by changing the status
        booking.status = 'confirmed';
        await booking.save();

        // Send notification to patient about confirmation
        const patient = await User.findById(booking.user);
        if (patient) {
            sendNotification(
                patient.email,
                `Your booking with Dr. ${booking.doctor.name} has been confirmed. Scheduled on ${new Date(booking.bookingDate).toLocaleString()} at ${booking.time}.`
            );
        }

        // Optionally, send a confirmation to the doctor as well
        if (booking.doctor) {
            sendNotification(
                booking.doctor.email,
                `booking with ${booking.patientName} has been confirmed. Scheduled on ${new Date(booking.bookingDate).toLocaleString()} at ${booking.time}.`
            );
        }

        res.status(200).json({ message: "booking confirmed successfully", booking });
    } catch (error) {
        console.error("Error confirming booking:", error);
        res.status(500).json({ message: "Failed to confirm booking" });
    }
};

// Get all bookings for a specific user
export const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ user: userId }).populate("doctor", "name");
        res.status(200).json({
            message: "Bookings retrieved successfully",
            bookings
        });
    } catch (error) {
        console.error("Get Bookings Error:", error);
        res.status(500).json({ message: "Failed to retrieve bookings" });
    }
};
// Get all bookings for a specific doctor
export const getDoctorBookings = async (req, res) => {

    const { doctorId } = req.params;

    console.log("Fetching bookings for Doctor ID:", doctorId);

    // Validate doctorId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: "Invalid doctor ID format" });
    }

    try {
        // Find bookings associated with this doctor
        const bookings = await Booking.find({ doctor: doctorId }).populate("user", "name");

        if (!bookings || bookings.length === 0) {
            console.log("No bookings found for this doctor.");
            return res.status(404).json({ message: "No bookings found for this doctor" });
        }

        console.log("Bookings retrieved successfully:", bookings);

        res.status(200).json({
            message: "Bookings for doctor retrieved successfully",
            bookings
        });
    } catch (error) {
        console.error("Get Doctor Bookings Error:", error);
        res.status(500).json({ message: "Failed to retrieve doctor bookings" });
    }
};

// Reschedule the booking
export const reschedulebooking = async (req, res) => {
    const { bookingId } = req.params;
    const { newDate, newTime } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "booking not found" });

        booking.bookingDate = newDate;
        booking.time = newTime;
        await booking.save();

        res.status(200).json({ message: "booking rescheduled successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to reschedule booking" });
    }
};

// Update booking status (could be confirmed, cancelled, etc.)
export const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body; // Example: status can be 'confirmed', 'cancelled', etc.

    console.log(`Received request to update status for booking ID: ${bookingId}`);
    console.log(`New status: ${status}`);

    try {
        // Validate the booking ID format
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        // Validate the status value
        if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Find the booking by ID
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Log current booking data before update
        console.log("Booking found:", booking);

        // Update the booking status
        booking.status = status;
        const updatedBooking = await booking.save();

        // Log updated booking
        console.log("Updated booking:", updatedBooking);

        res.status(200).json({ message: "Booking status updated successfully", booking: updatedBooking });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ message: "Failed to update booking status", error: error.message });
    }
};

// Clear booking history for a specific doctor
export const clearbookingHistory = async (req, res) => {
    console.log("Clear booking History controller reached");

    const { doctorId } = req.params;
    console.log("Doctor ID:", doctorId);

    try {
        // Validate ObjectId format for doctorId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctor ID format" });
        }

        // Clear the booking history for the specific doctor
        const result = await Booking.deleteMany({ doctor: doctorId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No bookings found for this doctor" });
        }

        res.status(200).json({ message: "booking history cleared successfully" });
    } catch (error) {
        console.error("Error clearing booking history:", error);
        res.status(500).json({ message: "Failed to clear booking history" });
    }
};

// Get all bookings in the system
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("doctor", "name") // Replace "name" with actual fields in the Doctor schema
            .populate("user", "name"); // Replace "name" with actual fields in the User schema

        console.log("Raw bookings fetched:", bookings); // Debug log

        if (!bookings || bookings.length === 0) {
            console.log("No bookings found in the database."); // Debug log
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json({
            message: "All bookings retrieved successfully",
            bookings,
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to retrieve bookings" });
    }
};
