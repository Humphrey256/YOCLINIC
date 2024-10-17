const express = require('express');
const router = express.Router();
const Appointment = require('../Models/Appointment');

// Create a new appointment
router.post('/', async (req, res) => {
    const { userId, doctorId, date, time } = req.body;
    try {
        const appointment = new Appointment({ userId, doctorId, date, time });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('userId doctorId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve appointments' });
    }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update appointment' });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

module.exports = router;
