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
const port = process.env.PORT || 5001;

// Use process.cwd() to get the current working directory
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log("Request body:", req.body);
    next();
});

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Allowing front-end origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowing required HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowing necessary headers
}));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));

// Handle file uploads
app.post('/upload', upload.single('photo'), (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    res.status(200).json({ message: 'File uploaded successfully!' });
});

app.get('/uploads/:filename', (req, res) => {
    console.log('File requested:', req.params.filename);
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

// Static file serving for React app
const buildPath = path.join(process.cwd(), 'Frontend/build');
app.use(express.static(buildPath));

// Serve React's index.html for undefined routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend/build', 'index.html'));
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

// App listening
app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
});

export { upload }; // Export multer instance if needed in authRoute for handling 'photo'
