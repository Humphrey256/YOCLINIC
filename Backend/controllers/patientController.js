import Notification from '../models/Notification.js';
import MedicalHistory from '../models/MedicalHistory.js';
import MedicalDocument from '../models/MedicalDocument.js';
import Appointment from '../models/Appointment.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

export const getMedicalHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.find({ userId: req.params.userId });
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medical history' });
    }
};

export const getMedicalDocuments = async (req, res) => {
    try {
        const documents = await MedicalDocument.find({ userId: req.params.userId });
        res.status(200).json({ documents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medical documents' });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId });
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};