import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer"; // Import multer for handling file uploads
import path from "path";
import fs from "fs";
import Doctor from "./models/DoctorSchema.js"; // Ensure this import is correct

// Import route modules
import authRoute from "./Routes/authRoute.js"; 
import userRoute from "./Routes/userRoute.js";
import doctorRoute from "./Routes/doctorRoute.js";
import reviewRoute from "./Routes/reviewRoute.js";
import bookingRoutes from "./Routes/bookingRoute.js";
import patientRoutes from "./Routes/patientRoutes.js"; // Import patient routes

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: ['https://yoclinic-1.onrender.com', 'http://localhost:3000'], // Allow frontend access
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
};

// Define the uploads directory using `process.cwd()`
const uploadDir = path.join(process.cwd(), 'uploads'); 

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
    }
});
const upload = multer({ storage });

// Serve static files correctly
app.use('/uploads', express.static(uploadDir));

// Upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    console.log('Uploaded file:', req.file);
    
    res.status(200).json({ 
        message: "File uploaded successfully!", 
        imageUrl: `http://localhost:${port}/uploads/${req.file.filename}` 
    });
});

// Corrected endpoint for serving uploaded images
app.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);

    if (fs.existsSync(filePath)) {
        console.log(`Serving file: ${filePath}`);
        res.sendFile(filePath);
    } else {
        console.log(`File not found: ${filePath}`);
        res.status(404).json({ message: "File not found" });
    }
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/patients', patientRoutes); // Use patient routes

// Fetch doctors with corrected image URLs
app.get('/api/v1/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();

        // Fix image URL for each doctor
        const doctorsWithImages = doctors.map(doctor => ({
            ...doctor.toObject(),
            photo: doctor.photo ? `http://localhost:${port}/${doctor.photo}` : `http://localhost:${port}/uploads/default-image.jpg`
        }));

        console.log("Doctors with images:", doctorsWithImages);
        res.json({ data: doctorsWithImages });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Error fetching doctors" });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Root route
app.get("/", (req, res) => {
    res.send("HELLO MEDICARE");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
};

// Start the server
app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});

export { upload };
