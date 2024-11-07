import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema, "bookings");

