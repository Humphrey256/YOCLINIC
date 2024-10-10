const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const toastr = require('toastr');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });
    toastr.success('Logged in successfully');
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    toastr.error('Internal server error');
  }
});

module.exports = router;