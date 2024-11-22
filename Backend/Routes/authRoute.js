import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' });  // Files will be saved in 'uploads' folder

// Register route with file upload
router.post('/register', upload.single('photo'), (req, res) => {
    // Log the received file details
    console.log("Received file:", req.file);  // This will log the uploaded photo file details

    // Pass the request to the register function (controller)
    register(req, res);
});

// Login route
router.post('/login', login);

export default router;
