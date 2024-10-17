const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON request body

// Registration route
app.post('/api/register', (req, res) => {
  const { name, email, contact, address, password, confirmPassword } = req.body;

  // Simple validation
  if (!name || !email || !contact || !address || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Simulate saving to database
  console.log('User data:', { name, email, contact, address });

  // Respond with success
  res.status(201).json({ message: 'User registered successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
