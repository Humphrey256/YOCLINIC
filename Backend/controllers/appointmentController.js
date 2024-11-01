const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');

// Create new appointment
exports.createAppointment = async (req, res) => {
  const { doctorId, patientId, date, reason } = req.body;
  const appointment = new Appointment({ doctorId, patientId, date, reason });

  try {
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update an appointment's status (Doctor or Admin only)
exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(appointment);

    // Notify patient of status change
    const notification = new Notification({
      userId: appointment.patientId,
      message: `Your appointment has been ${status.toLowerCase()}.`
    });
    await notification.save();

  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
