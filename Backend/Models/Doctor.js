// models/Doctor.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true }
});

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  availableSlots: [slotSchema]
});

module.exports = mongoose.model('Doctor', doctorSchema);
