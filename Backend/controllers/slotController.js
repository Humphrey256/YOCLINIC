const Slot = require('../models/Slot');

// Create a slot
exports.createSlot = async (req, res) => {
    try {
        const slot = new Slot(req.body);
        await slot.save();
        res.status(201).json(slot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all slots
exports.getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.find().populate('doctor');
        res.status(200).json(slots);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a slot by ID
exports.getSlotById = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id).populate('doctor');
        if (!slot) return res.status(404).json({ message: 'Slot not found' });
        res.status(200).json(slot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a slot
exports.updateSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slot) return res.status(404).json({ message: 'Slot not found' });
        res.status(200).json(slot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a slot
exports.deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);
        if (!slot) return res.status(404).json({ message: 'Slot not found' });
        res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
