const AvailableSlot = require('../models/AvailableSlot');

// Create a new slot (Doctor only)
exports.createAvailableSlot = async (req, res) => {
  const { date, time } = req.body;
  const slot = new AvailableSlot({ doctorId: req.user.id, date, time });

  try {
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get available slots for a doctor
exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await AvailableSlot.find({ doctorId: req.params.doctorId, isBooked: false });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a slot (Doctor only)
exports.updateAvailableSlot = async (req, res) => {
  const { date, time } = req.body;

  try {
    const slot = await AvailableSlot.findByIdAndUpdate(req.params.id, { date, time }, { new: true });
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a slot (Doctor only)
exports.deleteAvailableSlot = async (req, res) => {
  try {
    await AvailableSlot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
