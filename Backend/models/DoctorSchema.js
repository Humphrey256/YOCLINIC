import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  photo: {
    type: String
  },
  ticketPrice: {
    type: Number
  },
  role: {
    type: String,
  },

  // Unique fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },

  // Updated timeSlots field with startTime, endTime, and availability
  timeSlots: [
    {
      day: { type: String, required: true },  // Day of the week (e.g., 'Monday')
      startTime: { type: Date, required: true }, // Start time of the slot (e.g., '10:00 AM')
      endTime: { type: Date, required: true }, // End time (1 hour later)
      available: { type: Boolean, default: true }, // Availability status (true or false)
    },
  ],

  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);
