const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },  // You can use string or Date for time
    status: { type: String, default: 'Pending' }  // e.g., Pending, Confirmed, Cancelled
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
