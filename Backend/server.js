const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./Routes/userRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');
const doctorRoutes = require('./Routes/DoctorRoutes');

dotenv.config();
const app = express();
// Middleware for parsing JSON requests
app.use(express.json());

// Use the routes
app.use('/api', UserRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
