import mongoose from "mongoose";
import Booking from "../models/BookingSchema.js";  // Ensure the collection name matches your MongoDB schema
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import TimeSlot from "../models/TimeSlotSchema.js"; // Import the TimeSlot model
import { sendNotification } from "../utils/notificationService.js"; // Assuming a notification service

export const createBooking = async (req, res) => {
    console.log("Booking controller reached");

    try {
        console.log("Incoming request:", req.body);

        const { doctorId, userId, time, reason, patientName, phoneNumber, status } = req.body;

        console.log("Booking request received:", req.body);

        if (!doctorId || !userId || !time || !reason || !patientName || !phoneNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate ObjectIds
        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(doctorId) ||
            !mongoose.Types.ObjectId.isValid(time) // Validate time slot ID
        ) {
            return res.status(400).json({ message: "Invalid user ID, doctor ID, or time slot ID" });
        }

        console.log("Finding doctor by ID:", doctorId);
        const doctor = await Doctor.findById(doctorId);
        console.log("Doctor found:", doctor);

        console.log("Finding user by ID:", userId);
        const user = await User.findById(userId);
        console.log("User found:", user);

        console.log("Finding time slot by ID:", time);
        const timeSlot = await TimeSlot.findById(time);
        console.log("Time slot found:", timeSlot);

        if (!doctor || !user || !timeSlot) {
            return res.status(404).json({ message: "Doctor, User, or TimeSlot not found" });
        }

        console.log("Creating booking with time slot ID:", timeSlot._id);

        const newBooking = new Booking({
            doctor: doctorId,
            user: userId,
            time: timeSlot._id, // Ensure this is assigned correctly
            reason,
            patientName,
            phoneNumber,
            status: status || "Pending" // Use provided status or default to 'Pending'
        });

        try {
            const savedBooking = await newBooking.save();

            if (!savedBooking) {
                return res.status(500).json({ message: "Failed to save booking" });
            }

            console.log("Booking saved:", savedBooking);

            // Send notification to the doctor
            sendNotification(
                doctor.email,
                `New booking request from ${patientName}. Scheduled for ${timeSlot.day} from ${timeSlot.startTime} to ${timeSlot.endTime}.`
            );

            // Send notification to the user (patient)
            sendNotification(
                user.email,
                `Your booking request with Dr. ${doctor.name} is pending confirmation. Scheduled for ${timeSlot.day} from ${timeSlot.startTime} to ${timeSlot.endTime}.`
            );

            res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
        } catch (saveError) {
            console.error("Error saving booking:", saveError);
            res.status(500).json({ message: "Failed to save booking", error: saveError.message });
        }
    } catch (error) {
        console.error("Error during booking creation:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
// Confirm the booking
export const confirmBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId).populate("doctor").populate("time");
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Confirm the booking by changing the status
        booking.status = 'Confirmed';
        await booking.save();

        // Send notification to patient about confirmation
        const patient = await User.findById(booking.user);
        if (patient) {
            sendNotification(
                patient.email,
                `Your booking with Dr. ${booking.doctor.name} has been confirmed. Scheduled on ${booking.time.day} from ${booking.time.startTime} to ${booking.time.endTime}.`
            );
        }

        // Optionally, send a confirmation to the doctor as well
        if (booking.doctor) {
            sendNotification(
                booking.doctor.email,
                `Booking with ${booking.patientName} has been confirmed. Scheduled on ${booking.time.day} from ${booking.time.startTime} to ${booking.time.endTime}.`
            );
        }

        res.status(200).json({ message: "Booking confirmed successfully", booking });
    } catch (error) {
        console.error("Error confirming booking:", error);
        res.status(500).json({ message: "Failed to confirm booking" });
    }
};

// Cancel the booking
export const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Cancel the booking by changing the status
        booking.status = 'Canceled';
        await booking.save();

        res.status(200).json({ message: "Booking canceled successfully", booking });
    } catch (error) {
        console.error("Error canceling booking:", error);
        res.status(500).json({ message: "Failed to cancel booking" });
    }
};

// Get all bookings for a specific user
export const getUserBookings = async (req, res) => {
    const { userId } = req.params;
    console.log('getUserBookings function reached for userId:', userId); // Log to show the function is reached
    try {
        const bookings = await Booking.find({ user: userId })
            .populate("doctor", "name")
            .populate("time", "day startTime endTime"); // Populate time slot details

        console.log('Fetched bookings for user:', userId, bookings); // Log the fetched bookings

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

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
    console.log("Get bookings controller reached");
    console.log("Fetching bookings for Doctor ID:", doctorId);

    // Validate doctorId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: "Invalid doctor ID format" });
    }

    try {
        // Find bookings associated with this doctor
        const bookings = await Booking.find({ doctor: doctorId })
            .populate("user", "name")
            .populate("time", "day startTime endTime");

        if (!bookings || bookings.length === 0) {
            console.log("No bookings found for this doctor.");
            return res.status(404).json({ message: "No bookings found for this doctor" });
        }

        console.log("Bookings retrieved successfully:", bookings);

        // Log time slot details for each booking
        bookings.forEach(booking => {
            console.log("Booking ID:", booking._id);
            console.log("Time Slot:", booking.time); // Log full time slot object
            console.log("Time Slot ID:", booking.time?._id); // Log time slot ID specifically
        });

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
export const rescheduleBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { newTime } = req.body;

    try {
        const booking = await Booking.findById(bookingId).populate("time");
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const timeSlot = await TimeSlot.findById(newTime);
        if (!timeSlot) return res.status(404).json({ message: "TimeSlot not found" });

        booking.time = timeSlot._id;
        await booking.save();

        res.status(200).json({ message: "Booking rescheduled successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to reschedule booking" });
    }
};

// Update booking details
export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { patientName, phoneNumber, time, reason, doctorId, userId } = req.body;  // Data to update

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId).populate("time");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update the booking with the new data
        booking.patientName = patientName || booking.patientName;
        booking.phoneNumber = phoneNumber || booking.phoneNumber;
        booking.time = time || booking.time;
        booking.reason = reason || booking.reason;
        booking.doctor = doctorId || booking.doctor;
        booking.user = userId || booking.user;

        // Save the updated booking
        const updatedBooking = await booking.save();

        res.status(200).json({ message: "Booking updated successfully", data: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error });
    }
};

// Clear booking history for a specific doctor
export const clearBookingHistory = async (req, res) => {
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

        res.status(200).json({ message: "Booking history cleared successfully" });
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
        console.error("Error fetching all bookings:", error);
        res.status(500).json({ message: "Failed to fetch all bookings" });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body; // Example: status can be 'Confirmed', 'Canceled', etc.

    console.log(`Received request to update status for booking ID: ${bookingId}`);
    console.log(`New status: ${status}`);

    try {
        // Validate the booking ID format
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        // Validate the status value
        if (!['Confirmed', 'Canceled', 'Pending'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Find the booking by ID
        const booking = await Booking.findById(bookingId).populate("time");
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
