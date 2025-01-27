import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    phone: {
      type: String, 
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"], 
    },
    photo: {
      type: String, 
      default: "default-image.jpg", // Only store the filename
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      enum: ["doctor", "admin", "user"], 
      required: true,
      default: 'doctor',
    },
    specialization: {
      type: String,
      required: false, // Make specialization optional
    },
    hospital: {
      type: String,
      required: false, // Make hospital optional
    },
    qualifications: {
      type: [String], 
    },
    experiences: {
      type: [String], 
    },
    bio: {
      type: String,
      maxLength: 200, 
    },
    about: {
      type: String,
      maxLength: 500, 
    },
    timeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0, 
      max: 5, 
    },
    totalRating: {
      type: Number,
      default: 0,
      min: 0, 
    },
    isApproved: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    appointments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }  
  }
);

// Virtual Field for Image URI
DoctorSchema.virtual("imageUri").get(function () {
  return `http://localhost:5000/uploads/${this.photo}`;
});

export default mongoose.model("Doctor", DoctorSchema);
