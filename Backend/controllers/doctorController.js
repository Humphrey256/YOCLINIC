const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Register Doctor
exports.registerDoctor = async (req, res) => {
  const { name, email, password, specialization } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ name, email, password: hashedPassword, specialization });
    await doctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doctor Login
exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Doctor
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndDelete(id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
