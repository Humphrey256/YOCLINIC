import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer"; // Import multer for handling file uploads
import path from "path";
import fs from "fs";

// Import route modules
import authRoute from "./Routes/authRoute.js"; // Ensure this path is correct
import userRoute from "./Routes/userRoute.js";
import doctorRoute from "./Routes/doctorRoute.js";
import reviewRoute from "./Routes/reviewRoute.js";
import bookingRoutes from './Routes/bookingRoute.js'; // Adjust the path as necessary

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: true,
};

// Use process.cwd() to get the current working directory
const uploadDir = path.join(process.cwd(), 'uploads'); // Use process.cwd() to avoid errors

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log("Request body:", req.body); // Log the request body
    next();
});

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(cors(corsOptions));
app.use(cors({
    origin: 'http://localhost:3000',  // Allowing front-end origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],  // Allowing required HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowing necessary headers
}));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save uploaded files to the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
    }
});
const upload = multer({ storage }); // Initialize multer with storage configuration

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log('Request body:', req.body);  // Logs form data
    console.log('Uploaded file:', req.file);  // Logs file data
    res.status(200).json({ message: 'File uploaded successfully!' });
});

app.get('/uploads/:filename', (req, res) => {
    console.log('File requested:', req.params.filename);  // Log the filename being requested
    const filePath = path.join(uploadDir, req.params.filename);

    if (fs.existsSync(filePath)) {
        console.log(`Serving file: ${filePath}`);  // Log the file being served
        res.sendFile(filePath); // Serve the file
    } else {
        console.log(`File not found: ${filePath}`);  // Log if file is not found
        res.status(404).json({ message: "File not found" });
    }
});

// Attach multer to the specific auth route that handles registration
app.use("/api/v1/auth", authRoute);

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use('/api/v1/bookings', bookingRoutes); // Adjust the path as necessary

// Example route to test the body
app.post('/api/v1/bookings', (req, res) => {
    console.log("Request body:", req.body);  // Log the body to verify
    res.status(200).json({
        message: 'Test received',
        data: req.body
    });
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Root route
app.get("/", (req, res) => {
    res.send("HELLO MEDICARE");
});

// Updated doctor fetching route with correct image path
app.get('/api/v1/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        const doctorsWithImages = doctors.map(doctor => ({
            ...doctor.toObject(),
            // Ensure the correct path is used for images (replacing backslashes)
            photo: `http://localhost:${port}/${doctor.photo.replace(/\\/g, '/')}`
        }));
        console.log("Doctors with images:", doctorsWithImages);  // Log the doctors with image paths
        res.json({ data: doctorsWithImages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
};

// App listening
app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
});

export { upload }; // Export multer instance if needed in authRoute for handling 'photo'
