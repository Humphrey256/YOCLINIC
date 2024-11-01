const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // Add this line for appointments
const slotRoutes = require('./routes/slotRoutes'); // Add this line for slots
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes); // Add this line for appointment routes
app.use('/api/slots', slotRoutes); // Add this line for slot routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
