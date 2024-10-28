const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default : 'Pending' },

});

module.exports = mongoose.model('Appointment', appointmentSchema);

  


