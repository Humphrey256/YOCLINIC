const express = require('express');
const app = express();
const port = 5000; // Change this to your desired port
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes');

// Connect to MongoDB
mongoose.connect('<your-db-url>', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up session management
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// Set up routes
app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});