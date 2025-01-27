import mongoose from 'mongoose';
import moment from 'moment';
import Doctor from "../models/DoctorSchema.js"; // Import the Doctor model
import TimeSlot from "../models/TimeSlotSchema.js"; // Import the TimeSlot model

export const updateDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;

    console.log(`Received request to update doctor with ID: ${doctorId}`);
    console.log('Request body:', req.body);

    try {
        // Validate doctorId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctor ID format" });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            data: updatedDoctor,
        });
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({
            success: false,
            message: "Error updating doctor",
            error: error.message,
        });
    }
};

export const deleteDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deletedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted doctor",
        });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete doctor!",
            data: error.message,
        });
    }
};

export const getSingleDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const doctor = await Doctor.findById(doctorId)
            .populate("reviews")
            .populate("timeSlots")
            .select("-password");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "No Doctor Found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor Found",
            data: doctor,
        });
    } catch (error) {
        console.error("Error retrieving doctor:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve doctor!",
            data: error.message,
        });
    }
};

export const getAllDoctor = async (req, res) => {
    console.log("getAllDoctor controller reached");
    try {
        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: { $in: ["confirmed", "pending"] }, // Fetch both confirmed and pending doctors
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { qualifications: { $regex: query, $options: "i" } },
                ],
            }).select("name email photo qualifications specialization hospital averageRating isApproved");
        } else {
            doctors = await Doctor.find({ isApproved: { $in: ["confirmed", "pending"] } }) // Fetch both confirmed and pending doctors
                .select("name email photo qualifications specialization hospital averageRating isApproved");
        }

        res.status(200).json({
            success: true,
            message: "Doctors Found",
            data: doctors,
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve doctors!",
            data: error.message,
        });
    }
};

// Approve a doctor
export const approveDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { isApproved: 'confirmed' }, // Set the doctor status to confirmed
            { new: true }
        ).select("name email photo qualifications specialization hospital averageRating isApproved");

        if (!updatedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor approved successfully",
            data: updatedDoctor,
        });
    } catch (error) {
        console.error("Error approving doctor:", error);
        res.status(500).json({
            success: false,
            message: "Failed to approve doctor",
            error: error.message,
        });
    }
};

// Reject a doctor (Update the approval status to 'not confirmed')
export const rejectDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { isApproved: 'not confirmed' }, // Set the doctor status to not confirmed
            { new: true }
        ).select("name email photo qualifications specialization hospital averageRating isApproved");

        if (!updatedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor status updated to not confirmed",
            data: updatedDoctor,
        });
    } catch (error) {
        console.error("Error rejecting doctor:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update doctor status to not confirmed",
            error: error.message,
        });
    }
};

// Function to add a new time slot for a doctor
export const addTimeSlot = async (req, res) => {
    console.log("add slot controller reached");
    console.log("Incoming request to add slot");
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.params);

    try {
        const doctorId = req.params.doctorId;
        const { day, startTime, endTime } = req.body;

        // Basic validation for required fields
        if (!doctorId || !day || !startTime || !endTime) {
            console.log("Validation failed: Missing required fields");
            return res.status(400).json({ message: 'Doctor ID, day, start time, and end time are required.' });
        }

        // Validate that the start time and end time are in the correct format and the slot is exactly 1 hour
        const start = moment(startTime, "HH:mm A"); // strict parsing to ensure exact format
        const end = moment(endTime, "HH:mm A"); // strict parsing to ensure exact format

        if (!start.isValid() || !end.isValid()) {
            console.log("Validation failed: Invalid time format");
            return res.status(400).json({ message: 'Start time and end time must be valid and in the format HH:mm A.' });
        }

        // Check if the time slot is exactly 1 hour long
        if (end.diff(start, 'minutes') !== 60) {
            console.log("Validation failed: Time slot is not exactly one hour");
            return res.status(400).json({ message: 'Time slots must be exactly one hour long.' });
        }

        // Retrieve the doctor from the database
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            console.log("Doctor not found with ID:", doctorId);
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        // Initialize timeSlots array if it doesn't exist
        if (!doctor.timeSlots) {
            doctor.timeSlots = [];
        }

        // Check if the doctor already has a time slot at the requested time
        const existingSlot = doctor.timeSlots.find(slot => slot.day === day && slot.startTime === startTime);
        if (existingSlot) {
            console.log(`Time slot conflict: Doctor already has a slot on ${day} at ${startTime}`);
            return res.status(409).json({ message: `Time slot on ${day} at ${startTime} already exists.` });
        }

        // Create the new time slot object
        const newTimeSlot = new TimeSlot({
            doctor: doctorId,
            day,
            startTime,
            endTime,
            available: true
        });

        const savedTimeSlot = await newTimeSlot.save();
        doctor.timeSlots.push(savedTimeSlot._id);
        await doctor.save();

        console.log('Time slot added successfully:', savedTimeSlot);
        console.log("Updated time slots:", doctor.timeSlots);

        // Return a success response
        return res.status(200).json({ message: 'Time slot added successfully.', timeSlots: doctor.timeSlots });

    } catch (error) {
        console.error('Error adding time slot:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
// Get Time Slots for a specific doctor
export const getTimeSlots = async (req, res) => {
    try {
        console.log("📥 Incoming request to fetch time slots:", req.method, req.url);

        const { doctorId } = req.params; // Extract doctor ID from request parameters

        if (!doctorId) {
            console.warn("⚠️ Doctor ID is missing in the request.");
            return res.status(400).json({ message: 'Doctor ID is required.' });
        }

        console.log(`🔍 Searching for Doctor ID: ${doctorId}...`);

        // Find the doctor and ensure timeSlots are populated
        const doctor = await Doctor.findById(doctorId).populate("timeSlots");

        if (!doctor) {
            console.warn(`🚫 No doctor found with ID: ${doctorId}`);
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        console.log(`🩺 Found Doctor: ${doctor.name} (ID: ${doctorId})`);

        if (!doctor.timeSlots || doctor.timeSlots.length === 0) {
            console.log(`ℹ️ Doctor ID: ${doctorId} has NO available time slots.`);

            // Debug: Log the doctor's full data to check if `timeSlots` exists
            console.log("📊 Doctor's Data:", JSON.stringify(doctor, null, 2));

            return res.status(200).json({ message: 'No available time slots.', timeSlots: [] });
        }

        console.log(`✅ Time Slots fetched for Doctor ID: ${doctorId}`, doctor.timeSlots);

        res.status(200).json({ success: true, timeSlots: doctor.timeSlots });
    } catch (error) {
        console.error('❌ Error fetching time slots:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};


// Delete Time Slot
export const deleteTimeSlot = async (req, res) => {
    try {
        const { slotId } = req.params;

        const timeSlot = await TimeSlot.findById(slotId);
        if (!timeSlot) {
            return res.status(404).json({ message: 'Time slot not found.' });
        }

        const doctor = await Doctor.findById(timeSlot.doctor);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        doctor.timeSlots = doctor.timeSlots.filter(slot => slot.toString() !== slotId);
        await doctor.save();

        await TimeSlot.findByIdAndDelete(slotId);

        console.log('Delete Time Slot Controller Reached:', slotId);
        res.status(200).json({ message: 'Time slot deleted successfully.', timeSlots: doctor.timeSlots });
    } catch (error) {
        console.error('Error deleting time slot:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update Time Slot
export const updateTimeSlot = async (req, res) => {
    console.log("Update Time Slot controller reached");
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    try {
        const { day, startTime, endTime, available } = req.body; // Extract from the request body
        const { slotId } = req.params;

        if (!day || !startTime || !endTime || available === undefined) {
            console.log("Validation failed: Missing required fields");
            return res.status(400).json({ message: 'Day, start time, end time, and availability status are required.' });
        }

        // Validate 1-hour duration
        const start = moment(startTime, "HH:mm");
        const end = moment(endTime, "HH:mm");
        if (!start.isValid() || !end.isValid() || end.diff(start, 'minutes') !== 60) {
            console.log("Validation failed: Invalid time format or duration");
            return res.status(400).json({ message: 'Time slots must be exactly one hour long.' });
        }

        // Update the slot details
        const updatedSlot = await TimeSlot.findByIdAndUpdate(
            slotId,
            { day, startTime, endTime, available },
            { new: true }
        );

        if (!updatedSlot) {
            console.log("Time slot not found with ID:", slotId);
            return res.status(404).json({ message: 'Time slot not found.' });
        }

        console.log("Time slot updated successfully:", updatedSlot);
        res.status(200).json({ message: 'Time slot updated successfully.', timeSlot: updatedSlot });
    } catch (error) {
        console.error('Error updating time slot:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
