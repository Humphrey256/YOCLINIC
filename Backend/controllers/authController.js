import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Fixed admin credentials (hashed password)
const fixedAdminCredentials = {
    email: "admin@yoclinic.com",
    password: await bcrypt.hash("admin@123", 10), // Pre-hashed password
};

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id || "admin", role: user.role || "admin" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" } // Token expires in 1 hour
    );
};

// Register Controller
export const register = async (req, res) => {
    console.log("Register controller reached");
    const { email, password, name, phone, role = "patient", gender, qualifications, experiences, timeSlots } = req.body;

    try {
        if (!email || !password || !name || !phone) {
            return res.status(400).json({ message: "Email, password, name, and phone are required" });
        }

        // Check if user already exists
        const userExists =
            (role === "patient" && await User.findOne({ email })) ||
            (role === "doctor" && await Doctor.findOne({ email }));

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Handle photo upload
        const photoPath = req.file ? req.file.path.replace(/\\/g, '/') : null; // Normalize path for cross-platform compatibility

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        let user;
        if (role === "patient") {
            user = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                photo: photoPath,
                gender,
                role,
            });
        } else if (role === "doctor") {
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                phone,
                photo: photoPath,
                gender,
                role,
                qualifications: qualifications || [],
                experiences: experiences || [],
                timeSlots: timeSlots || [],
                averageRating: 0,
                totalRating: 0,
                isApproved: "Pending",
                reviews: [],
            });
        }

        // Save user in the database
        await user.save();

        res.status(201).json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Registration failed, please try again." });
    }
};

// Login Controller
export const login = async (req, res) => {
    const { email, password: inputPassword } = req.body;

    try {
        if (!email || !inputPassword) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if login is for admin
        if (email === fixedAdminCredentials.email) {
            const isAdminPasswordMatch = await bcrypt.compare(
                inputPassword,
                fixedAdminCredentials.password
            );

            if (!isAdminPasswordMatch) {
                return res.status(400).json({ message: "Invalid admin credentials" });
            }

            const token = jwt.sign(
                { id: "admin", role: "admin" },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                success: true,
                message: "Admin login successful",
                token,
                role: "admin",
            });
        }

        // Check for user in both User and Doctor models
        const user = await User.findOne({ email }) || await Doctor.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordMatch = await bcrypt.compare(inputPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user);

        // Destructure sensitive info
        const { password, ...userWithoutPassword } = user._doc;

        // Include doctorId if the user is a doctor
        const response = {
            success: true,
            message: "Login successful",
            token,
            userId: user._id,
            role: user.role,
            data: userWithoutPassword,
        };

        if (user.role === 'doctor') {
            response.doctorId = user._id;
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Login failed, please try again." });
    }
};
