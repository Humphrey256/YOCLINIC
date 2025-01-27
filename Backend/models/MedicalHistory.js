import mongoose from 'mongoose';

const MedicalHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    doctorName: { type: String, required: true },
    diagnosis: { type: String, required: true },
});

export default mongoose.model('MedicalHistory', MedicalHistorySchema);