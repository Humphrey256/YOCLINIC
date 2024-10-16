const express = require('express');
const user = require('../Models/User');
const router = express.Router();

// POST /register - User Registration
router.post('/register', async (req, res) => {
    const { name, email, contact, address, password, confirmPassword } = req.body;

    // Simple validation
    if (!name || !email || !contact || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({ name, email, contact, address, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
