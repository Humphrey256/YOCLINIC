const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    availability: [{ day: String, time: String }]  // Example: [{ day: 'Monday', time: '9:00 AM' }]
});

module.exports = mongoose.model('Doctor', DoctorSchema);
