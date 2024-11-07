import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

const generateToken = (user) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
    );
    console.log("Generated Token:", token);
    return token;
};


// register controller
export const register = async (req, res) => {
    console.log("Register function called");
    console.log("Request body in register:", req.body); // Log the request body

    const { email, password, name, role = 'patient', photo, gender } = req.body;

    try {
        let user = null;

        // Check the user role
        if (role === "patient") {
            user = await User.findOne({ email });
            console.log("User found in User collection:", user);
        } else if (role === "doctor") {
            user = await Doctor.findOne({ email });
            console.log("User found in Doctor collection:", user);
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user based on role
        if (role === "patient") {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        } else if (role === "doctor") {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
                qualifications: req.body.qualifications || [],
                experiences: req.body.experiences || [],
                timeSlots: req.body.timeSlots || [],
                averageRating: req.body.averageRating || 0,
                totalRating: req.body.totalRating || 0,
                isApproved: req.body.isApproved || "pending",
                reviews: req.body.reviews || []
            });
        }

        console.log("User instance before saving:", user); // Log user instance before saving

        // Save user
        await user.save();
        console.log("User registration successful");
        res.status(200).json({ success: true, message: "User successfully created" });
    } catch (error) {
        console.error("Registration Error:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "You Got Error, Try Again" });
    }
};

export const login = async (req, res) => {
    console.log("Incoming request:", req); // Log the entire request object
    console.log("Request body in login:", req.body); // Log the request body
    const { email, password: inputPassword } = req.body;  // rename req.body.password to inputPassword

    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(inputPassword, user.password);  // use inputPassword
        // Log user object to check before generating the token
        console.log("User object for token generation:", user);
        console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Invalid Credentials' });
        }

        // Get token
        const token = generateToken(user);
        const { password, role, appointments, ...rest } = user._doc;

        // Send response with token and user data
        console.log("Login successful, sending response...");
        res.status(200).json({
            status: true,
            message: 'Successfully Login',
            token,
            data: { ...rest },
            role
        });
    } catch (error) {
        console.error("Login Error:", error);  // Log the error for debugging
        res.status(500).json({ status: false, message: 'Failed To Login' });
    }
};
