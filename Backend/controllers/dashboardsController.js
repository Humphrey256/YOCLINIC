const Appointment = require('../models/Appointment');
const AvailableSlot = require('../models/AvailableSlot');
const User = require('../models/User');
const Notification = require('../models/Notification');
const notifications = require('../utils/notifications'); // Import notification utility

// Patient dashboard

// View available slots
exports.viewAvailableSlots = async (req, res) => {
    try {
        const slots = await AvailableSlot.find({ booked: false });
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching available slots', error });
    }
};

// Book an appointment
exports.bookAppointment = async (req, res) => {
    const { doctorEmail, date, time } = req.body;
    try {
        const slot = await AvailableSlot.findOne({ doctorEmail, date, time, booked: false });
        if (!slot) {
            return res.status(400).json({ message: 'Slot not available' });
        }

        const appointment = new Appointment({
            patientEmail: req.user.email,
            doctorEmail,
            date,
            time,
            status: 'requested'
        });
        await appointment.save();

        slot.booked = true;
        await slot.save();

        res.status(201).json({ message: 'Appointment requested', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error });
    }
};

// View appointments for patient
exports.viewAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientEmail: req.user.email });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

// View notifications for patient
exports.viewNotifications = async (req, res) => {
    try {
        const notificationsList = await Notification.find({ recipient: req.user.email });
        res.status(200).json(notificationsList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Doctor dashboard

// Add available slots
exports.addAvailableSlots = async (req, res) => {
    const { date, time } = req.body;
    try {
        const slot = new AvailableSlot({
            doctorEmail: req.user.email,
            date,
            time,
            booked: false
        });
        await slot.save();
        res.status(201).json({ message: 'Slot added', slot });
    } catch (error) {
        res.status(500).json({ message: 'Error adding slot', error });
    }
};

// View requested appointments for doctor
exports.viewRequestedAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorEmail: req.user.email, status: 'requested' });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requested appointments', error });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    const { appointmentId, status } = req.body;
    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        // Send notification
        await notifications.sendNotification(
            appointment.patientEmail,
            `Your appointment with ${appointment.doctorEmail} was ${status}`
        );

        res.status(200).json({ message: 'Appointment status updated', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status', error });
    }
};

// Admin dashboard

// View all users
exports.viewUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Add a new user (admin function)
exports.addUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            email,
            password,
            role
        });
        await newUser.save();
        res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// View all appointments (admin function)
exports.viewAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all appointments', error });
    }
};
