const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Slot', slotSchema);
