const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, contact, address, password } = req.body;

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      contact,
      address,
      password: hashedPassword
    });

    // Save the user in the database
    await newUser.save();

    // Respond with success message
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    // Respond with error message
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
