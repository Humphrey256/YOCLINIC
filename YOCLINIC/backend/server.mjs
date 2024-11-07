import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer"; // Import multer for handling file uploads

import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import doctorRoute from "./Routes/doctorRoute.js";
import reviewRoute from "./Routes/reviewRoute.js";
import bookingRoutes from './Routes/bookingRoute.js'; // Adjust the path as necessary

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: true,
};

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log('Raw Body:', req.rawBody);
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log("Request body:", req.body); // Log the request body
    next(); // Call the next middleware or route handler
});

app.get("/", (req, res) => {
    res.send("HELLO MEDICARE");
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
    }
});
const upload = multer({ storage }); // Initialize multer with storage configuration

// middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", upload.single('photo'), authRoute); // Attach multer middleware to authRoute
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use('/api/v1/bookings', bookingRoutes); // Adjust the path as necessary

// database connection
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
