import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appointmentDate: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    patientName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed", "Rescheduled", "No Show"],  // Optional status values
        default: "Pending",
    },
});

// Method to validate status before updating
bookingSchema.methods.updateStatus = function (newStatus) {
    const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed", "Rescheduled", "No Show"];
    if (validStatuses.includes(newStatus)) {
        this.status = newStatus;
        return true; // Valid status update
    } else {
        return false; // Invalid status
    }
};

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
