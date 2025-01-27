import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    time: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', required: true },
    reason: { type: String, required: true },
    patientName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Canceled", "Completed", "Rescheduled", "No Show"],  // Optional status values
        default: "Pending",
    },
});

export default mongoose.model('Booking', bookingSchema);
