const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  reason: String,
  status: { type: String, enum: ['Requested', 'Approved', 'Rejected'], default: 'Requested' },
});
module.exports = mongoose.model('Appointment', appointmentSchema);