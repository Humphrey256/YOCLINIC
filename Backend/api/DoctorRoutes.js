const express = require('express');
const router = express.Router();
const Doctor = require('../Models/Doctor');

// Create a new doctor
router.post('/', async (req, res) => {
    const { name, specialty, availability } = req.body;
    try {
        const doctor = new Doctor({ name, specialty, availability });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create doctor' });
    }
});

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve doctors' });
    }
});

// Update a doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update doctor' });
    }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete doctor' });
    }
});

module.exports = router;
