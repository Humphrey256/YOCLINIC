const mongoose = require('mongoose');

const availableSlotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  time: String,
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model('AvailableSlot', availableSlotSchema);
