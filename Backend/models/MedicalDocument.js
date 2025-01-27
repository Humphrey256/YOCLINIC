import mongoose from 'mongoose';

const MedicalDocumentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model('MedicalDocument', MedicalDocumentSchema);