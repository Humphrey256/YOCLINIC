import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
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
        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

// Automatically populate 'user' details in each review
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo",
    });
    next();
});

// Static method to calculate average ratings for a doctor
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
    const stats = await this.aggregate([
        { $match: { doctor: doctorId } },
        {
            $group: {
                _id: "$doctor",
                numOfRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
    ]);

    if (stats.length > 0) {
        await Doctor.findByIdAndUpdate(doctorId, {
            totalRating: stats[0].numOfRating,
            averageRating: stats[0].avgRating,
        });
    } else {
        // Reset ratings if no reviews are left
        await Doctor.findByIdAndUpdate(doctorId, {
            totalRating: 0,
            averageRating: 0,
        });
    }
};

// Calculate average rating after each new review is saved
reviewSchema.post("save", function () {
    this.constructor.calcAverageRatings(this.doctor);
});

// Calculate average rating after a review is deleted
reviewSchema.post("remove", function () {
    this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
