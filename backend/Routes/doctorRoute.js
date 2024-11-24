import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    approveDoctor, // Import the approveDoctor function
    rejectDoctor,
    addTimeSlot, // Import the addTimeSlot function
    getTimeSlots,
    updateTimeSlot, // Import the updateTimeSlot function
    deleteTimeSlot // Import the deleteTimeSlot function
} from "../controllers/doctorController.js";

import reviewRouter from "./reviewRoute.js";

const router = express.Router();

// Middleware for handling reviews
router.use("/:doctorId/reviews", reviewRouter);

// Routes for fetching doctor data
router.get("/", getAllDoctor);

// Fetch a single doctor (GET method)
router.get('/:doctorId', getSingleDoctor);

// Update a doctor's information (PUT method)
router.put('/:doctorId', updateDoctor);

// Delete a doctor (DELETE method)
router.delete('/:doctorId', deleteDoctor);

// Route to approve a doctor
router.patch("/approve/:doctorId", (req, res, next) => {
    console.log("Route reached for approving doctor:", req.params.doctorId); // Log the doctor ID
    next(); // Pass control to the controller
}, approveDoctor);

// Route to reject a doctor
router.delete("/reject/:doctorId", rejectDoctor);

// Add a time slot to a doctor (POST method)
router.post("/:doctorId/timeSlots", addTimeSlot);
router.get("/timeSlots/:doctorId", getTimeSlots);

// Update a doctor's time slot (PUT method)
router.put("/:doctorId/timeSlots", updateTimeSlot);

// Delete a doctor's time slot (DELETE method)
router.delete("/:doctorId/timeSlots", deleteTimeSlot);

export default router;