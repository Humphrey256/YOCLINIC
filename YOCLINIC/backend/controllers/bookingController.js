import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

// Create a new booking
export const createBooking = async (req, res) => {
    const { doctorId, userId, appointmentDate } = req.body;

    try {
        // Verify doctor and user exist
        const doctor = await Doctor.findById(doctorId);
        const user = await User.findById(userId);

        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Create booking
        const booking = new Booking({
            doctor: doctorId,
            user: userId,
            appointmentDate,
            status: "pending"
        });

        await booking.save();

        // Populate the doctor's name for the response
        const populatedBooking = await Booking.findById(booking._id).populate('doctor', 'name');

        res.status(201).json({
            message: `Appointment booked successfully with Dr. ${populatedBooking.doctor.name}`,
            booking: populatedBooking
        });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: "Failed to book appointment", error });
    }
};

// Get bookings for a user
export const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ user: userId }).populate("doctor", "name");
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Get Bookings Error:", error);
        res.status(500).json({ message: "Failed to retrieve bookings" });
    }
};

// Get all bookings for a doctor
export const getDoctorBookings = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const bookings = await Booking.find({ doctor: doctorId }).populate("user", "name");
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Get Doctor Bookings Error:", error);
        res.status(500).json({ message: "Failed to retrieve doctor bookings" });
    }
};

// Update booking status (approve or cancel)
export const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true }
        );

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: "Booking status updated", booking });
    } catch (error) {
        console.error("Update Booking Status Error:", error);
        res.status(500).json({ message: "Failed to update booking status" });
    }
};
