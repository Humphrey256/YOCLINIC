import express from 'express';
import { getNotifications, getMedicalHistory, getMedicalDocuments, getAppointments } from '../controllers/patientController.js';

const router = express.Router();

router.get('/notifications/:userId', getNotifications);
router.get('/history/:userId', getMedicalHistory);
router.get('/documents/:userId', getMedicalDocuments);
router.get('/appointments/:userId', getAppointments);

export default router;