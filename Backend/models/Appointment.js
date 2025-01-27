import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true },
    reason: { type: String, required: true },
    time: { type: Date, required: true },
});

export default mongoose.model('Appointment', AppointmentSchema);