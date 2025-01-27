import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    approveDoctor,
    rejectDoctor,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
    getTimeSlots
} from "../controllers/doctorController.js";

const router = express.Router();

// Route to approve a doctor
router.patch("/approve/:doctorId", approveDoctor);

// Route to reject a doctor
router.delete("/reject/:doctorId", rejectDoctor);

// Route to update a doctor
router.patch("/update/:doctorId", updateDoctor);

// Route to delete a doctor
router.delete("/:doctorId", deleteDoctor);

// Route to get a single doctor
router.get("/:doctorId", getSingleDoctor);

// Route to get all doctors
router.get("/", getAllDoctor);

// Add a time slot to a doctor (POST method)
router.post('/timeSlots/add/:doctorId', addTimeSlot);

// Get time slots for a doctor
router.get('/timeSlots/:doctorId', getTimeSlots);

// Update a doctor's time slot (PATCH method)
router.patch('/timeSlots/:slotId', updateTimeSlot);

// Delete a doctor's time slot (DELETE method)
router.delete('/timeSlots/:slotId', deleteTimeSlot);

export default router;